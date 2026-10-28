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
];
