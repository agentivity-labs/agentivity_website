// Badges of the directories and lists that feature Agentivity, shown on /featured and /fr/featured.
// One entry = the snippet the directory gives, kept exactly as given: some directories check for their link, its target
// and their image URL before they list us.
export const featuredBadges: { name: string; html: string }[] = [
  {
    name: 'AI Agents Directory',
    html: `<a href="https://aiagentsdirectory.com/agent/agentivity" target="_blank" rel="noopener" title="Discover Agentivity on AI Agents Directory">
  <img src="https://aiagentsdirectory.com/featured-badge.svg?v=2024" alt="Agentivity - Featured on AI Agents Directory" width="200" height="50" />
</a>`,
  },
  {
    name: 'LaunchNest',
    html: `<a href="https://launchnest.io/p/agentivity" target="_blank">
  <img src="https://launchnest.io/badge/agentivity.svg?variant=featured" alt="Agentivity on LaunchNest" width="220" height="56" />
</a>`,
  },
  {
    name: 'Dang.ai',
    html: `<a href="https://dang.ai" target="_blank" rel="dofollow noopener" style="display:inline-block;text-decoration:none;"><img src="https://assets.dang.ai/badges/dang-verified-dark.png" alt="Verified on DANG!" width="260" height="94" style="display:block;width:260px;max-width:100%;height:auto;border:0;outline:none;text-decoration:none;" /></a>`,
  },
];
