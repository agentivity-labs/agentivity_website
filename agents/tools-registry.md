# Tools Registry

Liste des outils disponibles dans le pipeline. Tous sont implémentés dans `tools/tools.py`.

---

## Outils web & scraping

| Outil | Description | Agents |
|---|---|---|
| `web_search(query, num_results)` | Recherche DuckDuckGo. Retourne [{title, url, snippet}] | 01, 02, 03, 04, 06, 07 |
| `scrape_page(url, extract)` | Scrape via Jina.ai (gratuit, sans clé). extract : "text" / "headings" / "links" / "meta" / "all" | 01, 02, 03, 04, 06, 07, 08 |
| `scrape_sitemap(url)` | Parse le sitemap.xml d'un domaine. Retourne [{url, lastmod}] | 02 |

## Outils concurrents & marché

| Outil | Description | Agents |
|---|---|---|
| `find_competitors(product_description, num)` | Trouve concurrents directs/indirects via recherche web | 01 |
| `analyze_competitor(url)` | Analyse complète : H1, subhead, CTA, nav, social proof, pricing model | 01, 02, 06 |
| `reddit_search(query, subreddits)` | Recherche Reddit (PRAW si clé dispo, sinon DuckDuckGo fallback) | 01, 04 |
| `github_repo_stats(repo_url)` | Métriques GitHub : stars, forks, contributeurs, dernier commit | 01 |

## Outils SEO & tendances

| Outil | Description | Agents |
|---|---|---|
| `google_trends(keyword, timeframe, geo)` | Tendances via pytrends. Retourne trend_data, peak_month, related_queries | 01, 05 |
| `keyword_research(seed_keyword, country, language)` | Suggestions via pytrends + DuckDuckGo. Volume = indice relatif (pas absolu) | 05 |
| `serp_analysis(keyword, country)` | Top 10 résultats Google pour un mot-clé | 05 |
| `people_also_ask(keyword)` | Questions associées via Google / DuckDuckGo fallback | 05 |

## Outils qualité & performance

| Outil | Description | Agents |
|---|---|---|
| `pagespeed_analysis(url)` | PageSpeed Insights mobile + desktop. Nécessite `PAGESPEED_API_KEY` dans .env | 08 |
| `readability_score(text)` | Score Flesch, niveau scolaire, longueur moyenne des phrases | 04 |

## Outils fichiers

| Outil | Description | Agents |
|---|---|---|
| `write_file(path, content)` | Écrit un fichier, crée les répertoires si nécessaire | Tous |
| `read_file(path)` | Lit le contenu d'un fichier | Tous |

---

## Outils supprimés (non implémentés, références nettoyées)

- ~~`cro_heuristic_check(url)`~~ → remplacé par `scrape_page` + analyse dans le chat
- ~~`keyword_gap(domain, competitors)`~~ → remplacé par `serp_analysis` + `web_search`
- ~~`backlink_analysis(domain)`~~ → pas d'équivalent gratuit ; adressé via `web_search`
- ~~`product_hunt_search(query)`~~ → remplacé par `web_search` ciblé
- ~~`social_listening(topic)`~~ → remplacé par `reddit_search`
- ~~`content_gap_analysis()`~~ → remplacé par `scrape_sitemap` + analyse manuelle

---

## Variables d'environnement (fichier `.env`)

```
ANTHROPIC_API_KEY=          # Obligatoire
REDDIT_CLIENT_ID=           # Optionnel — fallback DuckDuckGo si absent
REDDIT_CLIENT_SECRET=       # Optionnel
REDDIT_USER_AGENT=          # Optionnel
PAGESPEED_API_KEY=          # Optionnel — agent 08 uniquement
GITHUB_TOKEN=               # Optionnel — augmente la rate limit GitHub de 60 à 5000 req/h
```
