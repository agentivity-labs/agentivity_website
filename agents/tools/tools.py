"""
Web agency AI pipeline — tool implementations.
All tools use free APIs or stdlib; see .env.example for optional keys.
"""

from __future__ import annotations

import os
import re
import json
import time
import xml.etree.ElementTree as ET
from typing import Any
from urllib.parse import urlparse, urljoin

import requests
import textstat
from duckduckgo_search import DDGS
from dotenv import load_dotenv

load_dotenv()

# ---------------------------------------------------------------------------
# Optional credentials (graceful degradation when absent)
# ---------------------------------------------------------------------------
REDDIT_CLIENT_ID = os.getenv("REDDIT_CLIENT_ID")
REDDIT_CLIENT_SECRET = os.getenv("REDDIT_CLIENT_SECRET")
REDDIT_USER_AGENT = os.getenv("REDDIT_USER_AGENT", "agentivity-pipeline/1.0")
PAGESPEED_API_KEY = os.getenv("PAGESPEED_API_KEY", "")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _headers(extra: dict | None = None) -> dict:
    h = {"User-Agent": "Mozilla/5.0 (compatible; agentivity-bot/1.0)"}
    if extra:
        h.update(extra)
    return h


def _get(url: str, params: dict | None = None, timeout: int = 15) -> requests.Response:
    return requests.get(url, params=params, headers=_headers(), timeout=timeout)


# ===========================================================================
# WEB & SCRAPING TOOLS
# ===========================================================================

def web_search(query: str, num_results: int = 10) -> list[dict]:
    """Search the web via DuckDuckGo. Returns [{title, url, snippet}]."""
    results = []
    with DDGS() as ddgs:
        for r in ddgs.text(query, max_results=num_results):
            results.append({
                "title": r.get("title", ""),
                "url": r.get("href", ""),
                "snippet": r.get("body", ""),
            })
    return results


def scrape_page(url: str, extract: str = "text") -> dict:
    """
    Fetch a page via Jina.ai reader (free, no key).
    extract: "text" | "headings" | "links" | "meta" | "all"
    Returns structured dict depending on extract mode.
    """
    jina_url = f"https://r.jina.ai/{url}"
    try:
        resp = requests.get(jina_url, headers=_headers({"Accept": "text/plain"}), timeout=30)
        resp.raise_for_status()
        raw_text = resp.text
    except Exception as e:
        return {"error": str(e), "url": url}

    # Jina returns markdown-like text; parse it lightly
    lines = raw_text.splitlines()

    headings = [l.lstrip("#").strip() for l in lines if re.match(r"^#{1,6} ", l)]
    links = re.findall(r"\[([^\]]+)\]\((https?://[^\)]+)\)", raw_text)
    links_list = [{"text": t, "url": u} for t, u in links]

    # Meta is embedded in Jina output as "Title:" / "Description:" lines
    meta: dict = {}
    for l in lines[:30]:
        if l.lower().startswith("title:"):
            meta["title"] = l.split(":", 1)[1].strip()
        elif l.lower().startswith("description:"):
            meta["description"] = l.split(":", 1)[1].strip()
        elif l.lower().startswith("url:"):
            meta["canonical_url"] = l.split(":", 1)[1].strip()

    plain_text = "\n".join(
        l for l in lines
        if not re.match(r"^#{1,6} ", l) and not re.match(r"^(Title|Description|URL):", l, re.I)
    ).strip()

    if extract == "headings":
        return {"url": url, "headings": headings}
    if extract == "links":
        return {"url": url, "links": links_list}
    if extract == "meta":
        return {"url": url, "meta": meta}
    if extract == "text":
        return {"url": url, "text": plain_text, "meta": meta}
    # "all"
    return {"url": url, "text": plain_text, "headings": headings, "links": links_list, "meta": meta}


def scrape_sitemap(url: str) -> list[dict]:
    """
    Fetch and parse sitemap.xml from a base URL or direct sitemap URL.
    Returns [{url, lastmod}].
    """
    # Normalise: if they passed a base domain, try common sitemap paths
    parsed = urlparse(url)
    candidates = (
        [url] if url.endswith(".xml")
        else [
            urljoin(url, "/sitemap.xml"),
            urljoin(url, "/sitemap_index.xml"),
            urljoin(url, "/sitemap/sitemap.xml"),
        ]
    )

    def _parse_xml(text: str) -> list[dict]:
        root = ET.fromstring(text)
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        pages = []
        # Handle sitemap index (nested sitemaps)
        for sitemap in root.findall("sm:sitemap", ns):
            loc = sitemap.findtext("sm:loc", namespaces=ns)
            if loc:
                try:
                    r2 = _get(loc, timeout=15)
                    pages.extend(_parse_xml(r2.text))
                except Exception:
                    pass
        # Handle regular urlset
        for url_el in root.findall("sm:url", ns):
            loc = url_el.findtext("sm:loc", namespaces=ns) or ""
            lastmod = url_el.findtext("sm:lastmod", namespaces=ns) or ""
            if loc:
                pages.append({"url": loc, "lastmod": lastmod})
        return pages

    for candidate in candidates:
        try:
            resp = _get(candidate, timeout=15)
            if resp.status_code == 200 and "<" in resp.text:
                return _parse_xml(resp.text)
        except Exception:
            continue

    return []


# ===========================================================================
# SEO & KEYWORD TOOLS
# ===========================================================================

def keyword_research(seed_keyword: str, country: str = "US", language: str = "en") -> list[dict]:
    """
    Returns keyword suggestions using pytrends related queries + DuckDuckGo
    as a free alternative to paid SEO APIs.
    Output: [{keyword, monthly_volume, difficulty, cpc, intent}]
    Note: volume/difficulty/cpc are estimated proxies, not exact data.
    """
    from pytrends.request import TrendReq

    pytrends = TrendReq(hl=language, tz=360)
    pytrends.build_payload([seed_keyword], geo=country, timeframe="today 12-m")

    try:
        related = pytrends.related_queries()
        top_df = related.get(seed_keyword, {}).get("top")
        rising_df = related.get(seed_keyword, {}).get("rising")
    except Exception:
        top_df = None
        rising_df = None

    results: list[dict] = []

    def _intent(kw: str) -> str:
        kw_l = kw.lower()
        if any(w in kw_l for w in ["buy", "price", "cost", "cheap", "deal", "hire", "agency"]):
            return "commercial"
        if any(w in kw_l for w in ["how", "what", "why", "when", "guide", "tutorial"]):
            return "informational"
        if any(w in kw_l for w in ["vs", "review", "best", "top", "compare"]):
            return "investigational"
        return "navigational"

    seen: set[str] = set()

    for df, source in [(top_df, "top"), (rising_df, "rising")]:
        if df is None or df.empty:
            continue
        for _, row in df.iterrows():
            kw = str(row.get("query", "")).strip()
            val = int(row.get("value", 0))
            if not kw or kw in seen:
                continue
            seen.add(kw)
            # value from pytrends is a 0-100 relative index, not absolute volume
            results.append({
                "keyword": kw,
                "monthly_volume": f"~{val * 100} (relative index: {val})",
                "difficulty": "unknown — use paid API for exact data",
                "cpc": "unknown — use paid API for exact data",
                "intent": _intent(kw),
                "source": source,
            })

    # Supplement with DuckDuckGo autocomplete suggestions
    try:
        ddg_results = web_search(f"{seed_keyword} site:*", num_results=5)
        for r in ddg_results:
            kw = r["title"].split("|")[0].split("-")[0].strip()
            if kw and kw not in seen:
                seen.add(kw)
                results.append({
                    "keyword": kw,
                    "monthly_volume": "unknown",
                    "difficulty": "unknown",
                    "cpc": "unknown",
                    "intent": _intent(kw),
                    "source": "ddg",
                })
    except Exception:
        pass

    return results


def serp_analysis(keyword: str, country: str = "US") -> list[dict]:
    """
    Returns top ranking pages for a keyword via DuckDuckGo.
    Output: [{rank, domain, url, title, meta_description, estimated_word_count}]
    """
    results = web_search(keyword, num_results=10)
    output = []
    for i, r in enumerate(results, 1):
        parsed = urlparse(r["url"])
        output.append({
            "rank": i,
            "domain": parsed.netloc,
            "url": r["url"],
            "title": r["title"],
            "meta_description": r["snippet"],
            "estimated_word_count": len(r["snippet"].split()) * 20,  # rough proxy
        })
    return output


def people_also_ask(keyword: str) -> list[str]:
    """
    Returns related questions for a keyword by scraping Google via requests.
    Falls back to DuckDuckGo related searches if Google blocks.
    """
    questions: list[str] = []

    # Try Google (may be rate-limited / blocked in production)
    try:
        resp = _get(
            "https://www.google.com/search",
            params={"q": keyword},
            timeout=10,
        )
        # PAA questions appear in data-q attribute
        paa = re.findall(r'data-q="([^"]+)"', resp.text)
        questions.extend(paa[:10])
    except Exception:
        pass

    # Supplement / fallback: DuckDuckGo related searches
    if not questions:
        try:
            with DDGS() as ddgs:
                for r in ddgs.text(f"{keyword} questions answers", max_results=10):
                    title = r.get("title", "")
                    if "?" in title:
                        questions.append(title)
        except Exception:
            pass

    return list(dict.fromkeys(questions))  # dedupe, preserve order


def google_trends(keyword: str, timeframe: str = "12m", geo: str = "US") -> dict:
    """
    Returns trend data via pytrends.
    Output: {trend_data[], peak_month, related_queries[], related_topics[]}
    """
    from pytrends.request import TrendReq

    # Map friendly timeframe to pytrends format
    tf_map = {
        "1m": "today 1-m", "3m": "today 3-m", "12m": "today 12-m",
        "5y": "today 5-y", "all": "all",
    }
    tf = tf_map.get(timeframe, "today 12-m")

    pytrends = TrendReq(hl="en-US", tz=360)
    pytrends.build_payload([keyword], geo=geo, timeframe=tf)

    try:
        interest_df = pytrends.interest_over_time()
    except Exception as e:
        return {"error": str(e)}

    if interest_df.empty:
        return {"keyword": keyword, "trend_data": [], "peak_month": None,
                "related_queries": [], "related_topics": []}

    trend_data = [
        {"date": str(idx.date()), "value": int(row[keyword])}
        for idx, row in interest_df.iterrows()
        if not row.get("isPartial", False)
    ]

    peak_month = None
    if trend_data:
        peak = max(trend_data, key=lambda x: x["value"])
        peak_month = peak["date"]

    # Related queries
    related_q: list[str] = []
    related_t: list[str] = []
    try:
        rq = pytrends.related_queries()
        top = rq.get(keyword, {}).get("top")
        if top is not None and not top.empty:
            related_q = top["query"].tolist()[:10]
    except Exception:
        pass

    try:
        rt = pytrends.related_topics()
        top_t = rt.get(keyword, {}).get("top")
        if top_t is not None and not top_t.empty:
            related_t = top_t["topic_title"].tolist()[:10]
    except Exception:
        pass

    return {
        "keyword": keyword,
        "geo": geo,
        "timeframe": tf,
        "trend_data": trend_data,
        "peak_month": peak_month,
        "related_queries": related_q,
        "related_topics": related_t,
    }


# ===========================================================================
# COMPETITOR INTELLIGENCE TOOLS
# ===========================================================================

def analyze_competitor(url: str) -> dict:
    """
    Full competitor page analysis.
    Output: {positioning, hero_h1, hero_subhead, primary_cta, nav_items[],
             social_proof[], pricing_model}
    """
    page = scrape_page(url, extract="all")
    if "error" in page:
        return page

    text = page.get("text", "")
    headings = page.get("headings", [])
    links = page.get("links", [])
    meta = page.get("meta", {})

    # Hero H1 — first heading
    hero_h1 = headings[0] if headings else ""
    hero_subhead = headings[1] if len(headings) > 1 else ""

    # Nav items — links in top portion of page (heuristic: short text, no external)
    base_domain = urlparse(url).netloc
    nav_items = [
        l["text"] for l in links
        if len(l["text"].split()) <= 4
        and (urlparse(l["url"]).netloc in ("", base_domain))
    ][:12]

    # CTAs — button-like text patterns
    cta_pattern = re.compile(
        r"\b(get started|try free|book a demo|contact us|request a quote|"
        r"sign up|start free|learn more|get a quote|schedule a call)\b",
        re.I,
    )
    ctas_found = cta_pattern.findall(text)
    primary_cta = ctas_found[0].title() if ctas_found else ""

    # Social proof signals
    sp_pattern = re.compile(
        r"\b(\d[\d,]*\+?\s*(?:customers?|clients?|users?|companies|brands|reviews?|stars?))\b"
        r"|(trusted by|as seen in|featured in|award[- ]winning|certified)",
        re.I,
    )
    social_proof = list({m.group(0) for m in sp_pattern.finditer(text) if m.group(0)})[:8]

    # Pricing model heuristic
    pricing_model = "unknown"
    text_l = text.lower()
    if "per month" in text_l or "/mo" in text_l or "monthly plan" in text_l:
        pricing_model = "subscription"
    elif "one-time" in text_l or "one time" in text_l:
        pricing_model = "one-time"
    elif "contact for pricing" in text_l or "custom pricing" in text_l or "get a quote" in text_l:
        pricing_model = "custom/contact"
    elif "free" in text_l and "trial" in text_l:
        pricing_model = "freemium/trial"

    return {
        "url": url,
        "meta_title": meta.get("title", ""),
        "meta_description": meta.get("description", ""),
        "positioning": meta.get("description", hero_subhead),
        "hero_h1": hero_h1,
        "hero_subhead": hero_subhead,
        "primary_cta": primary_cta,
        "nav_items": nav_items,
        "social_proof": social_proof,
        "pricing_model": pricing_model,
    }


def find_competitors(product_description: str, num: int = 10) -> list[dict]:
    """
    Finds competitors via web search.
    Output: [{name, url, type: "direct|indirect", reason}]
    """
    queries = [
        f'{product_description} alternatives',
        f'best {product_description} companies',
        f'{product_description} competitors',
    ]
    seen_domains: set[str] = set()
    competitors: list[dict] = []

    for query in queries:
        results = web_search(query, num_results=num)
        for r in results:
            domain = urlparse(r["url"]).netloc
            if not domain or domain in seen_domains:
                continue
            seen_domains.add(domain)

            snippet_l = r["snippet"].lower()
            pd_l = product_description.lower()
            # Heuristic: "direct" if snippet mentions the product category closely
            keywords_in_snippet = sum(w in snippet_l for w in pd_l.split())
            comp_type = "direct" if keywords_in_snippet >= 2 else "indirect"

            competitors.append({
                "name": r["title"].split("|")[0].split("–")[0].split("-")[0].strip(),
                "url": r["url"],
                "type": comp_type,
                "reason": r["snippet"][:200],
            })

            if len(competitors) >= num:
                break
        if len(competitors) >= num:
            break

    return competitors[:num]


def reddit_search(query: str, subreddits: list[str] | None = None) -> list[dict]:
    """
    Searches Reddit via PRAW (requires free Reddit API credentials in .env).
    Falls back to DuckDuckGo site:reddit.com search if credentials absent.
    Output: [{subreddit, title, url, upvotes, top_comments[], sentiment}]
    """
    results: list[dict] = []

    if REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET:
        try:
            import praw
            reddit = praw.Reddit(
                client_id=REDDIT_CLIENT_ID,
                client_secret=REDDIT_CLIENT_SECRET,
                user_agent=REDDIT_USER_AGENT,
            )
            search_targets = (
                [reddit.subreddit(s) for s in subreddits]
                if subreddits
                else [reddit.subreddit("all")]
            )
            for target in search_targets:
                for submission in target.search(query, limit=10, sort="relevance"):
                    submission.comments.replace_more(limit=0)
                    top_comments = [
                        c.body[:200] for c in submission.comments.list()[:3]
                    ]
                    score = submission.score
                    sentiment = "positive" if score > 100 else "neutral" if score > 0 else "negative"
                    results.append({
                        "subreddit": submission.subreddit.display_name,
                        "title": submission.title,
                        "url": f"https://reddit.com{submission.permalink}",
                        "upvotes": score,
                        "top_comments": top_comments,
                        "sentiment": sentiment,
                    })
        except Exception as e:
            results.append({"error": f"PRAW error: {e}"})
    else:
        # Fallback: DuckDuckGo site:reddit.com
        sub_filter = " OR ".join(f"site:reddit.com/r/{s}" for s in subreddits) if subreddits else "site:reddit.com"
        ddg_results = web_search(f"{query} {sub_filter}", num_results=10)
        for r in ddg_results:
            results.append({
                "subreddit": re.search(r"reddit\.com/r/(\w+)", r["url"]) and
                             re.search(r"reddit\.com/r/(\w+)", r["url"]).group(1) or "unknown",
                "title": r["title"],
                "url": r["url"],
                "upvotes": None,
                "top_comments": [r["snippet"]],
                "sentiment": "unknown",
            })

    return results


def github_repo_stats(repo_url: str) -> dict:
    """
    Returns GitHub repo metrics via the free GitHub REST API.
    Output: {stars, forks, contributors, last_commit, open_issues, description}
    """
    # Extract owner/repo from URL
    match = re.search(r"github\.com/([^/]+)/([^/?\s]+)", repo_url)
    if not match:
        return {"error": "Invalid GitHub URL"}

    owner, repo = match.group(1), match.group(2).rstrip(".git")
    api_base = f"https://api.github.com/repos/{owner}/{repo}"
    auth_headers = _headers({"Authorization": f"token {GITHUB_TOKEN}"} if GITHUB_TOKEN else None)

    try:
        resp = requests.get(api_base, headers=auth_headers, timeout=15)
        resp.raise_for_status()
        data = resp.json()
    except Exception as e:
        return {"error": str(e)}

    # Contributors count (separate endpoint)
    contributors = 0
    try:
        c_resp = requests.get(
            f"{api_base}/contributors",
            headers=auth_headers,
            params={"per_page": 1, "anon": "true"},
            timeout=10,
        )
        # GitHub returns count via Link header pagination
        link = c_resp.headers.get("Link", "")
        last_match = re.search(r'page=(\d+)>; rel="last"', link)
        contributors = int(last_match.group(1)) if last_match else len(c_resp.json())
    except Exception:
        pass

    # Last commit date
    last_commit = ""
    try:
        commits_resp = requests.get(
            f"{api_base}/commits",
            headers=auth_headers,
            params={"per_page": 1},
            timeout=10,
        )
        commits_data = commits_resp.json()
        if commits_data:
            last_commit = commits_data[0]["commit"]["committer"]["date"]
    except Exception:
        pass

    return {
        "repo": f"{owner}/{repo}",
        "description": data.get("description", ""),
        "stars": data.get("stargazers_count", 0),
        "forks": data.get("forks_count", 0),
        "open_issues": data.get("open_issues_count", 0),
        "contributors": contributors,
        "last_commit": last_commit,
        "language": data.get("language", ""),
        "license": (data.get("license") or {}).get("spdx_id", ""),
        "url": data.get("html_url", repo_url),
    }


# ===========================================================================
# ANALYTICS & UX RESEARCH TOOLS
# ===========================================================================

def pagespeed_analysis(url: str) -> dict:
    """
    Runs Google PageSpeed Insights for both mobile and desktop.
    Requires PAGESPEED_API_KEY in .env (free from console.cloud.google.com).
    Output: {performance, lcp, fid, cls, mobile_score, desktop_score}
    """
    if not PAGESPEED_API_KEY:
        return {"error": "PAGESPEED_API_KEY not set. Get a free key at console.cloud.google.com"}

    endpoint = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"

    def _fetch(strategy: str) -> dict:
        try:
            resp = _get(endpoint, params={
                "url": url,
                "key": PAGESPEED_API_KEY,
                "strategy": strategy,
                "category": "performance",
            }, timeout=60)
            resp.raise_for_status()
            return resp.json()
        except Exception as e:
            return {"error": str(e)}

    mobile_data = _fetch("mobile")
    desktop_data = _fetch("desktop")

    def _score(data: dict) -> int | None:
        try:
            return round(data["lighthouseResult"]["categories"]["performance"]["score"] * 100)
        except (KeyError, TypeError):
            return None

    def _metric(data: dict, metric_id: str) -> str:
        try:
            audits = data["lighthouseResult"]["audits"]
            return audits[metric_id]["displayValue"]
        except (KeyError, TypeError):
            return "n/a"

    return {
        "url": url,
        "mobile_score": _score(mobile_data),
        "desktop_score": _score(desktop_data),
        "lcp": _metric(desktop_data, "largest-contentful-paint"),
        "fid": _metric(desktop_data, "max-potential-fid"),
        "cls": _metric(desktop_data, "cumulative-layout-shift"),
        "fcp": _metric(desktop_data, "first-contentful-paint"),
        "tti": _metric(desktop_data, "interactive"),
    }


def readability_score(text: str) -> dict:
    """
    Returns readability metrics via textstat.
    Output: {flesch_score, grade_level, avg_sentence_length}
    """
    flesch = textstat.flesch_reading_ease(text)
    grade = textstat.flesch_kincaid_grade(text)
    sentences = textstat.sentence_count(text)
    words = textstat.lexicon_count(text, removepunct=True)
    avg_sentence_length = round(words / sentences, 1) if sentences else 0

    def _label(score: float) -> str:
        if score >= 90: return "Very Easy"
        if score >= 80: return "Easy"
        if score >= 70: return "Fairly Easy"
        if score >= 60: return "Standard"
        if score >= 50: return "Fairly Difficult"
        if score >= 30: return "Difficult"
        return "Very Confusing"

    return {
        "flesch_score": round(flesch, 1),
        "readability_label": _label(flesch),
        "grade_level": round(grade, 1),
        "avg_sentence_length": avg_sentence_length,
        "word_count": words,
        "sentence_count": sentences,
        "syllable_count": textstat.syllable_count(text),
        "smog_index": textstat.smog_index(text),
        "gunning_fog": round(textstat.gunning_fog(text), 1),
    }


# ===========================================================================
# FILESYSTEM TOOLS
# ===========================================================================

def write_file(path: str, content: str) -> dict:
    """Write content to a file. Creates intermediate directories as needed."""
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    return {"status": "ok", "path": os.path.abspath(path), "bytes_written": len(content.encode())}


def read_file(path: str) -> str:
    """Read and return file content as a string."""
    with open(path, "r", encoding="utf-8") as f:
        return f.read()
