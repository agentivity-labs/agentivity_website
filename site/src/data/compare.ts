// The comparison pages (/compare/agentivity-vs-<tool>/ and /fr/compare/…), drawn by src/components/ComparePage.astro.
// Rewritten 2026-11-25 (ACT-233) from marketing-content's drafts (_agents_tmp/seo/ACT-233-drafts-2026-11-25.md): one
// competitor per page, its facts only from its own pages, read on the date under the table; no figure for anyone's number of
// integrations. Product word "workflow"; the AI builder is Winston.
export type Status = 'yes' | 'partial' | 'no' | 'none';

export type ComparePage = {
  tool: string;
  title: string;
  description: string;
  schemaName: string;
  eyebrow: string;
  h1: string;
  h1Accent: string;
  sub: string;
  pills: string[];
  stay: string[];
  choose: string[];
  rows: { feature: string; ag: Status; them: Status; agLabel?: string; themLabel?: string; note?: string }[];
  checked: string;
  changes: { title: string; body: string }[];
  honest: string;
  faq: { q: string; a: string }[];
  cta: { h2: string; accent: string; sub: string; primary: { label: string; href: string }; secondary: { label: string; href: string } };
};

const ctaEn = {
  h2: 'Build your first',
  accent: 'agent team.',
  sub: 'Try the hosted version for 14 days, no card. Or install the Community edition on your own server.',
  primary: { label: 'Start your trial', href: '/start?plan=pro' },
  secondary: { label: 'Install it yourself', href: '/community/' },
};
const ctaFr = {
  h2: 'Construisez votre première',
  accent: "équipe d'agents.",
  sub: "Essayez la version hébergée pendant 14 jours, sans carte. Ou installez l'édition Community sur votre propre serveur.",
  primary: { label: 'Démarrer votre essai', href: '/fr/start?plan=pro' },
  secondary: { label: "L'installer vous-même", href: '/fr/community/' },
};

export const compare: Record<string, { en: ComparePage; fr: ComparePage }> = {
  n8n: {
    en: {
      tool: 'n8n',
      title: 'n8n Alternative for AI Agent Teams | Agentivity vs n8n',
      description: 'Looking for an n8n alternative for AI work? Agentivity runs workflows and teams of AI agents, with a Desk where your colleagues use them. An honest comparison.',
      schemaName: 'Agentivity vs n8n: an n8n alternative for AI agent teams',
      eyebrow: 'Compare',
      h1: 'An n8n alternative',
      h1Accent: 'built for AI agent teams.',
      sub: 'n8n is a strong workflow tool that added AI agents. Agentivity starts from the other end: teams of AI agents that share the work, workflows around them, and a Desk where the rest of your company uses what you built. Both can run on your own server.',
      pills: ['Both have workflows and AI agents', 'Both can be self-hosted', 'Agentivity: teams and a Desk for your company'],
      stay: [
        'you connect many apps, and most of your steps are app-to-app;',
        'AI is one step in a larger automation;',
        'your team already knows n8n and its library of nodes.',
      ],
      choose: [
        'the work needs several AI agents with different jobs, and you want them to work as a team;',
        'people outside the build team must use the result, ask for work and approve, without seeing the editor;',
        'you want to describe what you need in plain words and get a whole team of agents built for you.',
      ],
      rows: [
        { feature: 'Workflows started by a schedule, a webhook or an app event', ag: 'yes', them: 'yes' },
        { feature: 'AI agents with their own instructions and tools', ag: 'yes', them: 'yes' },
        { feature: 'A team of agents as one thing you build and test', ag: 'yes', them: 'partial', note: 'n8n: agents call other agents inside a workflow. Agentivity: a team with a manager, or agents that hand off, talk together or work at the same time' },
        { feature: 'A person approves before an action', ag: 'yes', them: 'yes' },
        { feature: 'One place where colleagues use what you built', ag: 'yes', them: 'partial', note: 'Agentivity: the Desk, with roles, cockpits by department and a "Waiting for you" list. n8n: shared chats and forms' },
        { feature: 'Built for you from a description in plain words', ag: 'yes', them: 'partial', note: 'Winston, our AI builder, builds the workflow, agent or team as a draft you check. n8n: n8n Assistant builds workflows (in preview)' },
        { feature: 'Ready-made use cases', ag: 'yes', them: 'yes', note: 'n8n: a large library of workflow templates. Agentivity: Templates that bring a whole use case, with its agents, team, workflows and tables' },
        { feature: 'Bring your own AI model key', ag: 'yes', them: 'yes' },
        { feature: 'Install on your own server', ag: 'yes', them: 'yes', note: 'Agentivity: the Community edition, with Docker' },
        { feature: 'Source code available', ag: 'yes', them: 'yes', note: 'Agentivity: Elastic License 2.0. n8n: Sustainable Use License' },
        { feature: 'Library of app integrations', ag: 'partial', them: 'yes', agLabel: 'Growing', themLabel: 'Much larger', note: "n8n's strength" },
      ],
      checked: "Checked on n8n's own pages, 2026-11-25.",
      changes: [
        { title: 'A team, not a chain of nodes.', body: 'You build a team once: a manager that splits the job, or specialists that pass the case to each other, discuss it, or work at the same time. You test the team as a whole, in its chat. So when the work needs judgment from several angles, you change one team instead of rewiring a workflow.' },
        { title: 'Your colleagues use it without seeing the editor.', body: 'What you publish goes to the Desk. Sales, Support or Finance ask in their own words, and what waits for them (an approval, a missing detail) is in one list. They can use it; they cannot break it.' },
        { title: 'You can read what happened.', body: 'Each execution is kept step by step, and the Observation tab shows the tokens each member used. So when an answer is wrong, you see which agent gave it and why.' },
        { title: 'Your apps, and the events that start the work.', body: 'Workflows and agents work in Google Sheets, Drive and Calendar, Pipedrive, Jira, GitHub, Mailchimp, Telegram and more. A schedule, a webhook or an app event, such as a Stripe payment, can start an agent, a team or a workflow.' },
      ],
      honest: "If most of your work is moving data between many apps, n8n's library is larger than ours today, and it is the better choice. If the work is AI agents deciding, and people approving, Agentivity is built for that. Some teams use both: n8n for the app plumbing, Agentivity for the agents.",
      faq: [
        { q: 'Is Agentivity a good n8n alternative?', a: 'For AI work, yes: teams of agents, a Desk for your colleagues, approvals and a readable history are built in. For pure app-to-app automation with many integrations, n8n has more.' },
        { q: 'Can I self-host it, like n8n?', a: 'Yes. The Community edition runs on your own server with Docker. The hosted version needs no installation.' },
        { q: 'Do I need to code?', a: 'No. You build in the visual Studio, or describe what you want and Winston builds a first version. Developers can use the API.' },
        { q: 'Which AI models can I use?', a: 'Your own key, from OpenAI, Anthropic, Gemini, DeepSeek, xAI or AWS Bedrock. What the model costs is billed by your provider.' },
        { q: 'Can I move my n8n workflows?', a: 'There is no import from n8n. You rebuild the workflow, or describe it to Winston.' },
      ],
      cta: ctaEn,
    },
    fr: {
      tool: 'n8n',
      title: "Alternative à n8n pour les équipes d'agents IA | Agentivity",
      description: "Une alternative à n8n pour le travail de l'IA : Agentivity fait tourner des workflows et des équipes d'agents IA, avec un Desk où vos collègues les utilisent.",
      schemaName: "Agentivity vs n8n : une alternative à n8n pour les équipes d'agents IA",
      eyebrow: 'Comparatif',
      h1: 'Une alternative à n8n',
      h1Accent: "pensée pour les équipes d'agents IA.",
      sub: "n8n est un très bon outil de workflows qui a ajouté des agents IA. Agentivity part de l'autre bout : des équipes d'agents IA qui se partagent le travail, des workflows autour d'elles, et un Desk où le reste de votre entreprise utilise ce que vous avez construit. Les deux peuvent tourner sur votre propre serveur.",
      pills: ['Les deux ont des workflows et des agents IA', 'Les deux peuvent être auto-hébergés', 'Agentivity : des équipes et un Desk pour votre entreprise'],
      stay: [
        "vous connectez beaucoup d'applications, et la plupart de vos étapes vont d'une application à l'autre ;",
        "l'IA n'est qu'une étape dans une automatisation plus large ;",
        'votre équipe connaît déjà n8n et sa bibliothèque de nœuds.',
      ],
      choose: [
        "le travail demande plusieurs agents IA aux rôles différents, et vous voulez qu'ils travaillent en équipe ;",
        "des personnes hors de l'équipe qui construit doivent utiliser le résultat, demander du travail et valider, sans voir l'éditeur ;",
        "vous voulez décrire ce dont vous avez besoin avec vos mots et obtenir toute une équipe d'agents construite pour vous.",
      ],
      rows: [
        { feature: "Workflows lancés par une planification, un webhook ou un événement d'application", ag: 'yes', them: 'yes' },
        { feature: 'Agents IA avec leurs propres instructions et outils', ag: 'yes', them: 'yes' },
        { feature: "Une équipe d'agents, construite et testée comme un tout", ag: 'yes', them: 'partial', note: "n8n : des agents en appellent d'autres dans un workflow. Agentivity : une équipe avec un manager, ou des agents qui se passent la main, discutent ensemble ou travaillent en même temps" },
        { feature: 'Une personne valide avant une action', ag: 'yes', them: 'yes' },
        { feature: 'Un seul endroit où les collègues utilisent ce que vous avez construit', ag: 'yes', them: 'partial', note: 'Agentivity : le Desk, avec des rôles, des cockpits par département et une liste « Waiting for you ». n8n : des chats et des formulaires partagés' },
        { feature: "Construit pour vous à partir d'une description en mots simples", ag: 'yes', them: 'partial', note: "Winston, notre constructeur IA, construit le workflow, l'agent ou l'équipe en brouillon, que vous vérifiez. n8n : n8n Assistant construit des workflows (en preview)" },
        { feature: "Cas d'usage prêts à l'emploi", ag: 'yes', them: 'yes', note: "n8n : une grande bibliothèque de modèles de workflows. Agentivity : des Templates qui apportent tout un cas d'usage, avec ses agents, son équipe, ses workflows et ses tables" },
        { feature: 'Votre propre clé de modèle IA', ag: 'yes', them: 'yes' },
        { feature: 'Installation sur votre propre serveur', ag: 'yes', them: 'yes', note: "Agentivity : l'édition Community, avec Docker" },
        { feature: 'Code source disponible', ag: 'yes', them: 'yes', note: 'Agentivity : Elastic License 2.0. n8n : Sustainable Use License' },
        { feature: "Bibliothèque d'intégrations d'applications", ag: 'partial', them: 'yes', agLabel: 'En croissance', themLabel: 'Bien plus grande', note: 'Le point fort de n8n' },
      ],
      checked: 'Vérifié sur les pages de n8n, le 25 novembre 2026.',
      changes: [
        { title: "Une équipe, pas une chaîne de nœuds.", body: "Vous construisez une équipe une fois : un manager qui répartit le travail, ou des spécialistes qui se passent le dossier, en discutent ou travaillent en même temps. Vous testez l'équipe comme un tout, dans son chat. Quand le travail demande du jugement sous plusieurs angles, vous changez une équipe au lieu de recâbler un workflow." },
        { title: "Vos collègues l'utilisent sans voir l'éditeur.", body: "Ce que vous publiez arrive dans le Desk. Les Ventes, le Support ou la Finance demandent avec leurs mots, et ce qui les attend (une validation, une information manquante) est dans une seule liste. Ils peuvent l'utiliser ; ils ne peuvent pas le casser." },
        { title: "Vous pouvez lire ce qui s'est passé.", body: "Chaque exécution est gardée étape par étape, et l'onglet Observation montre les tokens utilisés par chaque membre. Quand une réponse est fausse, vous voyez quel agent l'a donnée et pourquoi." },
        { title: 'Vos applications, et les événements qui lancent le travail.', body: "Les workflows et les agents travaillent dans Google Sheets, Drive et Calendar, Pipedrive, Jira, GitHub, Mailchimp, Telegram et d'autres. Une planification, un webhook ou un événement d'application, comme un paiement Stripe, peut lancer un agent, une équipe ou un workflow." },
      ],
      honest: "Si l'essentiel de votre travail consiste à faire passer des données entre beaucoup d'applications, la bibliothèque de n8n est plus grande que la nôtre aujourd'hui, et c'est le meilleur choix. Si le travail, ce sont des agents IA qui décident et des personnes qui valident, Agentivity est fait pour ça. Certaines équipes utilisent les deux : n8n pour la tuyauterie entre applications, Agentivity pour les agents.",
      faq: [
        { q: 'Agentivity est-il une bonne alternative à n8n ?', a: "Pour le travail de l'IA, oui : les équipes d'agents, un Desk pour vos collègues, les validations et un historique lisible sont intégrés. Pour de l'automatisation pure entre applications, avec beaucoup d'intégrations, n8n en propose davantage." },
        { q: "Peut-on l'auto-héberger, comme n8n ?", a: "Oui. L'édition Community tourne sur votre propre serveur avec Docker. La version hébergée ne demande aucune installation." },
        { q: 'Faut-il savoir coder ?', a: "Non. Vous construisez dans le Studio visuel, ou vous décrivez ce que vous voulez et Winston construit une première version. Les développeurs peuvent utiliser l'API." },
        { q: 'Quels modèles IA peut-on utiliser ?', a: 'Votre propre clé, chez OpenAI, Anthropic, Gemini, DeepSeek, xAI ou AWS Bedrock. Le coût du modèle est facturé par votre fournisseur.' },
        { q: 'Peut-on reprendre ses workflows n8n ?', a: "Il n'y a pas d'import depuis n8n. Vous reconstruisez le workflow, ou vous le décrivez à Winston." },
      ],
      cta: ctaFr,
    },
  },
  make: {
    en: {
      tool: 'Make',
      title: 'Make Alternative for AI Agents, Self-Hosted | Agentivity',
      description: 'A Make alternative for AI work: teams of AI agents, workflows, human approvals and a Desk for your colleagues, in the cloud or on your own server.',
      schemaName: 'Agentivity vs Make: a Make alternative for AI agents',
      eyebrow: 'Compare',
      h1: 'A Make alternative',
      h1Accent: 'where AI agents do the work.',
      sub: 'Make connects your apps in visual scenarios, and now has AI agents. Agentivity is built around the agents: teams that share the work, workflows around them, and a Desk where your company uses them. And you can run it on your own server.',
      pills: ['Both have visual workflows and AI agents', 'Agentivity can be self-hosted', 'Agentivity: teams and a Desk for your company'],
      stay: [
        'you connect many apps and want the widest library ready to use;',
        'you want a cloud service only, with nothing to install;',
        'AI is one step in your scenarios.',
      ],
      choose: [
        'you need your data and your agents on your own server, or the choice to move there later;',
        'the work needs several AI agents working as a team;',
        'colleagues must use the result and approve, without opening the editor.',
      ],
      rows: [
        { feature: 'Visual workflows started by a schedule, a webhook or an app event', ag: 'yes', them: 'yes', note: 'Make calls them scenarios' },
        { feature: 'AI agents with their own instructions and tools', ag: 'yes', them: 'yes' },
        { feature: 'A team of agents as one thing you build and test', ag: 'yes', them: 'partial', note: "Make: an agent can hand jobs to sub-agents (announced at Waves '26). Agentivity: a manager, handoffs, a group discussion or agents at the same time" },
        { feature: 'A person approves before an action', ag: 'yes', them: 'partial', note: 'Make: an approval app on the Enterprise plan, in closed beta' },
        { feature: 'One place where colleagues use what you built', ag: 'yes', them: 'none', note: 'Agentivity: the Desk, with roles, cockpits by department and a "Waiting for you" list' },
        { feature: 'Built for you from a description in plain words', ag: 'yes', them: 'partial', note: 'Winston, our AI builder, builds the workflow, agent or team. Make: Maia builds scenarios and agents (in beta)' },
        { feature: 'Install on your own server', ag: 'yes', them: 'no', note: 'Make is a cloud service. Agentivity: the Community edition, with Docker' },
        { feature: 'Source code available', ag: 'yes', them: 'no', note: 'Agentivity: Elastic License 2.0' },
        { feature: 'Bring your own AI model key', ag: 'yes', them: 'yes' },
        { feature: 'Library of app integrations', ag: 'partial', them: 'yes', agLabel: 'Growing', themLabel: 'Much larger', note: "Make's strength" },
      ],
      checked: "Checked on Make's own pages, 2026-11-25.",
      changes: [
        { title: 'Your server, if you want it.', body: 'The Community edition runs on your own machine with Docker: your agents, workflows and tables stay with you. Start in the hosted version and keep that door open.' },
        { title: 'A team, not one agent per scenario.', body: 'Build a team once: a manager that splits the job, or specialists that hand the case to each other or discuss it. Test it as a whole in its chat. When the work changes, you change the team.' },
        { title: 'Your colleagues use it from the Desk.', body: 'They ask in their own words and answer what waits for them, in one list. They never see the editor, and they cannot break anything.' },
        { title: 'You see every step.', body: 'Each execution is kept step by step, and the Observation tab shows the tokens each member used.' },
        { title: 'Your apps.', body: 'Google Sheets, Drive and Calendar, Pipedrive, Jira, GitHub, Mailchimp, Telegram and more, as steps and as tools for your agents. An app event, such as a Stripe payment, can start the work.' },
      ],
      honest: "Make's library of apps is far larger than ours, and if you want a cloud tool to connect many apps with a little AI, it is the better choice. Agentivity is for work where AI agents decide and people approve, in the cloud or on your own server.",
      faq: [
        { q: 'Is Agentivity a good Make alternative?', a: 'For AI agents and teams, yes, and it can run on your own server, which Make cannot. For connecting many apps without AI, Make has more ready-made.' },
        { q: 'Can I self-host Agentivity?', a: 'Yes: the Community edition, with Docker. The hosted version needs no installation.' },
        { q: 'How is the hosted version counted?', a: 'By executions: each time a workflow, an agent or a team works on a request. Your AI model is billed by your provider.' },
        { q: 'Do I need to code?', a: 'No. Build in the visual Studio, or describe what you want and Winston builds a first version.' },
        { q: 'Can I import my Make scenarios?', a: 'No. Rebuild them in the Studio, or describe them to Winston.' },
      ],
      cta: ctaEn,
    },
    fr: {
      tool: 'Make',
      title: 'Alternative à Make pour les agents IA, auto-hébergée',
      description: "Une alternative à Make pour l'IA : des équipes d'agents IA, des workflows, des validations et un Desk pour vos collègues, dans le cloud ou chez vous.",
      schemaName: 'Agentivity vs Make : une alternative à Make pour les agents IA',
      eyebrow: 'Comparatif',
      h1: 'Une alternative à Make',
      h1Accent: 'où les agents IA font le travail.',
      sub: "Make connecte vos applications dans des scénarios visuels, et a maintenant des agents IA. Agentivity est construit autour des agents : des équipes qui se partagent le travail, des workflows autour d'elles, et un Desk où votre entreprise les utilise. Et vous pouvez le faire tourner sur votre propre serveur.",
      pills: ['Les deux ont des workflows visuels et des agents IA', 'Agentivity peut être auto-hébergé', 'Agentivity : des équipes et un Desk pour votre entreprise'],
      stay: [
        "vous connectez beaucoup d'applications et voulez la plus grande bibliothèque prête à l'emploi ;",
        'vous voulez uniquement un service dans le cloud, sans rien à installer ;',
        "l'IA n'est qu'une étape dans vos scénarios.",
      ],
      choose: [
        'vous avez besoin de vos données et de vos agents sur votre propre serveur, ou de pouvoir y passer plus tard ;',
        'le travail demande plusieurs agents IA qui travaillent en équipe ;',
        "des collègues doivent utiliser le résultat et valider, sans ouvrir l'éditeur.",
      ],
      rows: [
        { feature: "Workflows visuels lancés par une planification, un webhook ou un événement d'application", ag: 'yes', them: 'yes', note: 'Make les appelle des scénarios' },
        { feature: 'Agents IA avec leurs propres instructions et outils', ag: 'yes', them: 'yes' },
        { feature: "Une équipe d'agents, construite et testée comme un tout", ag: 'yes', them: 'partial', note: "Make : un agent peut confier des tâches à des sous-agents (annoncé à Waves '26). Agentivity : un manager, des passages de main, une discussion de groupe ou des agents en même temps" },
        { feature: 'Une personne valide avant une action', ag: 'yes', them: 'partial', note: "Make : une application de validation sur l'offre Enterprise, en bêta fermée" },
        { feature: 'Un seul endroit où les collègues utilisent ce que vous avez construit', ag: 'yes', them: 'none', note: 'Agentivity : le Desk, avec des rôles, des cockpits par département et une liste « Waiting for you »' },
        { feature: "Construit pour vous à partir d'une description en mots simples", ag: 'yes', them: 'partial', note: "Winston, notre constructeur IA, construit le workflow, l'agent ou l'équipe. Make : Maia construit des scénarios et des agents (en bêta)" },
        { feature: 'Installation sur votre propre serveur', ag: 'yes', them: 'no', note: "Make est un service dans le cloud. Agentivity : l'édition Community, avec Docker" },
        { feature: 'Code source disponible', ag: 'yes', them: 'no', note: 'Agentivity : Elastic License 2.0' },
        { feature: 'Votre propre clé de modèle IA', ag: 'yes', them: 'yes' },
        { feature: "Bibliothèque d'intégrations d'applications", ag: 'partial', them: 'yes', agLabel: 'En croissance', themLabel: 'Bien plus grande', note: 'Le point fort de Make' },
      ],
      checked: 'Vérifié sur les pages de Make, le 25 novembre 2026.',
      changes: [
        { title: 'Votre serveur, si vous le voulez.', body: "L'édition Community tourne sur votre propre machine avec Docker : vos agents, vos workflows et vos tables restent chez vous. Commencez avec la version hébergée et gardez cette porte ouverte." },
        { title: 'Une équipe, pas un agent par scénario.', body: "Construisez une équipe une fois : un manager qui répartit le travail, ou des spécialistes qui se passent le dossier ou en discutent. Testez-la comme un tout dans son chat. Quand le travail change, vous changez l'équipe." },
        { title: "Vos collègues l'utilisent depuis le Desk.", body: "Ils demandent avec leurs mots et répondent à ce qui les attend, dans une seule liste. Ils ne voient jamais l'éditeur, et ne peuvent rien casser." },
        { title: 'Vous voyez chaque étape.', body: "Chaque exécution est gardée étape par étape, et l'onglet Observation montre les tokens utilisés par chaque membre." },
        { title: 'Vos applications.', body: "Google Sheets, Drive et Calendar, Pipedrive, Jira, GitHub, Mailchimp, Telegram et d'autres, comme étapes et comme outils pour vos agents. Un événement d'application, comme un paiement Stripe, peut lancer le travail." },
      ],
      honest: "La bibliothèque d'applications de Make est bien plus grande que la nôtre, et si vous voulez un outil dans le cloud pour connecter beaucoup d'applications avec un peu d'IA, c'est le meilleur choix. Agentivity est fait pour le travail où des agents IA décident et des personnes valident, dans le cloud ou sur votre propre serveur.",
      faq: [
        { q: 'Agentivity est-il une bonne alternative à Make ?', a: "Pour les agents et les équipes d'IA, oui, et il peut tourner sur votre propre serveur, ce que Make ne permet pas. Pour connecter beaucoup d'applications sans IA, Make propose davantage de choses prêtes à l'emploi." },
        { q: "Peut-on auto-héberger Agentivity ?", a: "Oui : l'édition Community, avec Docker. La version hébergée ne demande aucune installation." },
        { q: 'Comment la version hébergée est-elle comptée ?', a: "Aux exécutions : chaque fois qu'un workflow, un agent ou une équipe traite une demande. Votre modèle IA est facturé par votre fournisseur." },
        { q: 'Faut-il savoir coder ?', a: 'Non. Construisez dans le Studio visuel, ou décrivez ce que vous voulez et Winston construit une première version.' },
        { q: 'Peut-on importer ses scénarios Make ?', a: 'Non. Reconstruisez-les dans le Studio, ou décrivez-les à Winston.' },
      ],
      cta: ctaFr,
    },
  },
  dify: {
    "en": {
      "tool": "Dify",
      "title": "Dify Alternative for AI Agent Teams | Agentivity vs Dify",
      "description": "Looking for a Dify alternative for AI agent teams? Agentivity runs teams of agents and workflows, with a Desk for your colleagues. An honest comparison.",
      "schemaName": "Agentivity vs Dify: a Dify alternative for AI agent teams",
      "eyebrow": "Compare",
      "h1": "A Dify alternative",
      "h1Accent": "where agents work as a team.",
      "sub": "As a Dify alternative, Agentivity starts from the team: AI agents that share the work, workflows around them, and a Desk where the rest of your company uses what you built. Dify is a strong platform for building AI apps and publishing them. Both can run on your own server.",
      "pills": [
        "Both have agents, workflows and knowledge bases",
        "Both can be self-hosted",
        "Agentivity: teams and a Desk for your company"
      ],
      "stay": [
        "your goal is an AI app you publish in a few clicks: a web app, a chat widget on your site, an API;",
        "your knowledge bases must read many kinds of documents, such as PDFs, slides and online drives;",
        "one agent per app, or a few agents as steps in a workflow, is enough."
      ],
      "choose": [
        "the work needs several AI agents with different jobs, and you want them to work as a team;",
        "people in your company must ask for work and approve in one place, without seeing the editor;",
        "you want to describe a whole workflow or team in plain words and get a first version built for you."
      ],
      "rows": [
        {
          "feature": "Visual workflows started by a schedule, a webhook or an app event",
          "ag": "yes",
          "them": "yes",
          "note": "Dify: triggers on workflow apps"
        },
        {
          "feature": "AI agents with their own instructions, tools and knowledge",
          "ag": "yes",
          "them": "yes"
        },
        {
          "feature": "A team of agents as one thing you build and test",
          "ag": "yes",
          "them": "partial",
          "note": "Dify: agents as steps in a workflow, which can hand off to each other. Agentivity: a team with a manager, or agents that work in turn, hand off, talk together or work at the same time"
        },
        {
          "feature": "A person approves before an action",
          "ag": "yes",
          "them": "yes",
          "note": "Dify: the Human Input step, in the web app or by e-mail"
        },
        {
          "feature": "Knowledge bases your agents search by meaning",
          "ag": "yes",
          "them": "yes",
          "note": "Dify's strength: pipelines for files, websites, online documents and drives, PDFs and slides included. Agentivity: texts, web pages, sitemaps, feeds, APIs and databases, kept up to date"
        },
        {
          "feature": "Write and test prompts on their own",
          "ag": "yes",
          "them": "yes",
          "note": "Dify: the Prompt IDE. Agentivity: prompts tried against saved test cases"
        },
        {
          "feature": "Publish an app for your customers: web app, embed, API",
          "ag": "partial",
          "them": "yes",
          "note": "Dify's strength: each app becomes a web app, an embed and an API. Agentivity: the API, the React and Flutter SDKs and a ready-made portal, set up by a developer"
        },
        {
          "feature": "One place where colleagues use what you built",
          "ag": "yes",
          "them": "partial",
          "note": "Agentivity: the Desk, with roles, cockpits by department and a \"Waiting for you\" list. Dify: published web apps, and a role that only uses them"
        },
        {
          "feature": "Built for you from a description in plain words",
          "ag": "yes",
          "them": "partial",
          "note": "Winston, our AI builder, builds the workflow, agent or team as a draft you check. Dify: an agent can be built by chatting (in beta)"
        },
        {
          "feature": "Ready-made use cases",
          "ag": "yes",
          "them": "yes",
          "note": "Dify: templates. Agentivity: Templates that bring a whole use case, with its agents, team, workflows and tables"
        },
        {
          "feature": "Bring your own AI model key",
          "ag": "yes",
          "them": "yes"
        },
        {
          "feature": "Install on your own server",
          "ag": "yes",
          "them": "yes",
          "note": "Agentivity: the Community edition, with Docker. Dify: the Community Edition with Docker Compose, Enterprise on Kubernetes"
        },
        {
          "feature": "Source code available",
          "ag": "yes",
          "them": "yes",
          "note": "Agentivity: Elastic License 2.0. Dify: its own licence, based on Apache 2.0 with added conditions"
        },
        {
          "feature": "Library of integrations",
          "ag": "partial",
          "them": "yes",
          "agLabel": "Growing",
          "note": "Dify: a Marketplace of models, tools, data sources and MCP integrations"
        }
      ],
      "checked": "Checked on Dify's own pages, 2026-11-25.",
      "changes": [
        {
          "title": "A team, not one agent per step.",
          "body": "You build a team once: a manager that splits the job, or specialists that work in turn, pass the case to each other, discuss it, or work at the same time. You test the team as a whole, in its chat. When the work needs judgment from several angles, you change one team instead of rewiring a workflow."
        },
        {
          "title": "Your colleagues use it without seeing the editor.",
          "body": "What you publish goes to the Desk. Sales, Support or Finance ask in their own words, and what waits for them (an approval, a missing detail) is in one list. They can use it; they cannot break it."
        },
        {
          "title": "Your customers too, in an app.",
          "body": "A VibeApp puts your team behind an application: a ready-made portal under your brand, or an app of your own built with our React or Flutter SDK. The team decides which screen comes next: a choice, a form, a table. You change the team in the Studio, and the app stays the same."
        },
        {
          "title": "Knowledge that stays up to date.",
          "body": "A Knowledge Base reads your texts, web pages, a sitemap, a feed, an API or a database, and reads them again by hand, after a delay or when the source changes. Your agents search it by meaning, and the search runs on your server, with no extra account."
        },
        {
          "title": "You can read what happened.",
          "body": "Each execution is kept step by step, and the Observation tab shows the tokens each member used. So when an answer is wrong, you see which agent gave it and why."
        }
      ],
      "honest": "If you want an AI app you can share by a link or put on your site in a few clicks, or a knowledge base that reads PDFs, slides and online drives, Dify has more today, and it is the better choice. If the work is several AI agents deciding, and people in your company approving, Agentivity is built for that.",
      "faq": [
        {
          "q": "Is Agentivity a good Dify alternative?",
          "a": "For work that needs a team of agents, yes: teams, a Desk for your colleagues, approvals and a readable history are built in. To publish an AI app in a few clicks, or to search many kinds of documents, Dify has more."
        },
        {
          "q": "Can I self-host it, like Dify?",
          "a": "Yes. The Community edition runs on your own server with Docker. The hosted version needs no installation."
        },
        {
          "q": "Does Agentivity have a knowledge base for RAG?",
          "a": "Yes. A Knowledge Base reads texts, web pages, a sitemap, a feed, an API or a database, and stays up to date. Your agents search it by meaning. On a server you install, it can also read text files and SQLite from that server."
        },
        {
          "q": "Can my customers use what I build?",
          "a": "Yes, through an app: the ready-made portal under your brand, or an application of your own built with our React or Flutter SDK. A developer sets either one up. Building and changing the team needs no developer."
        },
        {
          "q": "Can I move my Dify apps?",
          "a": "There is no import from Dify. You rebuild the app, or describe it to Winston."
        }
      ],
      "cta": ctaEn
    },
    "fr": {
      "tool": "Dify",
      "title": "Alternative à Dify pour les équipes d'agents IA | Agentivity",
      "description": "Une alternative à Dify pour les équipes d'agents IA : Agentivity fait tourner des équipes d'agents et des workflows, avec un Desk pour vos collègues.",
      "schemaName": "Agentivity vs Dify : une alternative à Dify pour les équipes d'agents IA",
      "eyebrow": "Comparatif",
      "h1": "Une alternative à Dify",
      "h1Accent": "où les agents travaillent en équipe.",
      "sub": "Comme alternative à Dify, Agentivity part de l'équipe : des agents IA qui se partagent le travail, des workflows autour d'eux, et un Desk où le reste de votre entreprise utilise ce que vous avez construit. Dify est une très bonne plateforme pour construire des applications IA et les publier. Les deux peuvent tourner sur votre propre serveur.",
      "pills": [
        "Les deux ont des agents, des workflows et des bases de connaissances",
        "Les deux peuvent être auto-hébergés",
        "Agentivity : des équipes et un Desk pour votre entreprise"
      ],
      "stay": [
        "votre but est une application IA publiée en quelques clics : une application web, un widget de chat sur votre site, une API ;",
        "vos bases de connaissances doivent lire beaucoup de types de documents, comme des PDF, des présentations et des drives en ligne ;",
        "un agent par application, ou quelques agents comme étapes d'un workflow, vous suffit."
      ],
      "choose": [
        "le travail demande plusieurs agents IA aux rôles différents, et vous voulez qu'ils travaillent en équipe ;",
        "les personnes de votre entreprise doivent demander du travail et valider au même endroit, sans voir l'éditeur ;",
        "vous voulez décrire tout un workflow ou toute une équipe avec vos mots et obtenir une première version construite pour vous."
      ],
      "rows": [
        {
          "feature": "Workflows visuels lancés par une planification, un webhook ou un événement d'application",
          "ag": "yes",
          "them": "yes",
          "note": "Dify : des déclencheurs sur les applications de type workflow"
        },
        {
          "feature": "Agents IA avec leurs propres instructions, outils et connaissances",
          "ag": "yes",
          "them": "yes"
        },
        {
          "feature": "Une équipe d'agents, construite et testée comme un tout",
          "ag": "yes",
          "them": "partial",
          "note": "Dify : des agents comme étapes d'un workflow, qui peuvent se passer la main. Agentivity : une équipe avec un manager, ou des agents qui travaillent à tour de rôle, se passent la main, discutent ensemble ou travaillent en même temps"
        },
        {
          "feature": "Une personne valide avant une action",
          "ag": "yes",
          "them": "yes",
          "note": "Dify : l'étape Human Input, dans l'application web ou par e-mail"
        },
        {
          "feature": "Bases de connaissances que vos agents interrogent par le sens",
          "ag": "yes",
          "them": "yes",
          "note": "Le point fort de Dify : des pipelines pour les fichiers, les sites, les documents et drives en ligne, PDF et présentations compris. Agentivity : textes, pages web, sitemaps, flux, API et bases de données, tenus à jour"
        },
        {
          "feature": "Écrire et tester des prompts à part",
          "ag": "yes",
          "them": "yes",
          "note": "Dify : le Prompt IDE. Agentivity : des prompts essayés sur des cas de test enregistrés"
        },
        {
          "feature": "Publier une application pour vos clients : application web, intégration, API",
          "ag": "partial",
          "them": "yes",
          "note": "Le point fort de Dify : chaque application devient une application web, une intégration et une API. Agentivity : l'API, les SDK React et Flutter et un portail prêt à l'emploi, mis en place par un développeur"
        },
        {
          "feature": "Un seul endroit où les collègues utilisent ce que vous avez construit",
          "ag": "yes",
          "them": "partial",
          "note": "Agentivity : le Desk, avec des rôles, des cockpits par département et une liste « Waiting for you ». Dify : les applications web publiées, et un rôle qui ne fait que les utiliser"
        },
        {
          "feature": "Construit pour vous à partir d'une description en mots simples",
          "ag": "yes",
          "them": "partial",
          "note": "Winston, notre constructeur IA, construit le workflow, l'agent ou l'équipe en brouillon, que vous vérifiez. Dify : un agent peut être construit en discutant (en bêta)"
        },
        {
          "feature": "Cas d'usage prêts à l'emploi",
          "ag": "yes",
          "them": "yes",
          "note": "Dify : des modèles. Agentivity : des Templates qui apportent tout un cas d'usage, avec ses agents, son équipe, ses workflows et ses tables"
        },
        {
          "feature": "Votre propre clé de modèle IA",
          "ag": "yes",
          "them": "yes"
        },
        {
          "feature": "Installation sur votre propre serveur",
          "ag": "yes",
          "them": "yes",
          "note": "Agentivity : l'édition Community, avec Docker. Dify : la Community Edition avec Docker Compose, Enterprise sur Kubernetes"
        },
        {
          "feature": "Code source disponible",
          "ag": "yes",
          "them": "yes",
          "note": "Agentivity : Elastic License 2.0. Dify : sa propre licence, fondée sur Apache 2.0 avec des conditions ajoutées"
        },
        {
          "feature": "Bibliothèque d'intégrations",
          "ag": "partial",
          "them": "yes",
          "agLabel": "En croissance",
          "note": "Dify : une Marketplace de modèles, d'outils, de sources de données et d'intégrations MCP"
        }
      ],
      "checked": "Vérifié sur les pages de Dify, le 25 novembre 2026.",
      "changes": [
        {
          "title": "Une équipe, pas un agent par étape.",
          "body": "Vous construisez une équipe une fois : un manager qui répartit le travail, ou des spécialistes qui travaillent à tour de rôle, se passent le dossier, en discutent ou travaillent en même temps. Vous testez l'équipe comme un tout, dans son chat. Quand le travail demande du jugement sous plusieurs angles, vous changez une équipe au lieu de recâbler un workflow."
        },
        {
          "title": "Vos collègues l'utilisent sans voir l'éditeur.",
          "body": "Ce que vous publiez arrive dans le Desk. Les Ventes, le Support ou la Finance demandent avec leurs mots, et ce qui les attend (une validation, une information manquante) est dans une seule liste. Ils peuvent l'utiliser ; ils ne peuvent pas le casser."
        },
        {
          "title": "Vos clients aussi, dans une application.",
          "body": "Une VibeApp met votre équipe derrière une application : un portail prêt à l'emploi à vos couleurs, ou une application à vous construite avec notre SDK React ou Flutter. L'équipe décide de l'écran suivant : un choix, un formulaire, un tableau. Vous changez l'équipe dans le Studio, et l'application reste la même."
        },
        {
          "title": "Des connaissances tenues à jour.",
          "body": "Une Knowledge Base lit vos textes, des pages web, un sitemap, un flux, une API ou une base de données, et les relit à la main, après un délai ou quand la source change. Vos agents l'interrogent par le sens, et la recherche tourne sur votre serveur, sans compte en plus."
        },
        {
          "title": "Vous pouvez lire ce qui s'est passé.",
          "body": "Chaque exécution est gardée étape par étape, et l'onglet Observation montre les tokens utilisés par chaque membre. Quand une réponse est fausse, vous voyez quel agent l'a donnée et pourquoi."
        }
      ],
      "honest": "Si vous voulez une application IA à partager par un lien ou à mettre sur votre site en quelques clics, ou une base de connaissances qui lit des PDF, des présentations et des drives en ligne, Dify en offre davantage aujourd'hui, et c'est le meilleur choix. Si le travail, ce sont plusieurs agents IA qui décident et des personnes de votre entreprise qui valident, Agentivity est fait pour ça.",
      "faq": [
        {
          "q": "Agentivity est-il une bonne alternative à Dify ?",
          "a": "Pour le travail qui demande une équipe d'agents, oui : les équipes, un Desk pour vos collègues, les validations et un historique lisible sont intégrés. Pour publier une application IA en quelques clics, ou chercher dans beaucoup de types de documents, Dify en offre davantage."
        },
        {
          "q": "Peut-on l'auto-héberger, comme Dify ?",
          "a": "Oui. L'édition Community tourne sur votre propre serveur avec Docker. La version hébergée ne demande aucune installation."
        },
        {
          "q": "Agentivity a-t-il une base de connaissances pour le RAG ?",
          "a": "Oui. Une Knowledge Base lit des textes, des pages web, un sitemap, un flux, une API ou une base de données, et reste à jour. Vos agents l'interrogent par le sens. Sur un serveur que vous installez, elle peut aussi lire des fichiers texte et du SQLite de ce serveur."
        },
        {
          "q": "Mes clients peuvent-ils utiliser ce que je construis ?",
          "a": "Oui, par une application : le portail prêt à l'emploi à vos couleurs, ou une application à vous construite avec notre SDK React ou Flutter. Un développeur met l'un ou l'autre en place. Construire et changer l'équipe ne demande aucun développeur."
        },
        {
          "q": "Peut-on reprendre ses applications Dify ?",
          "a": "Il n'y a pas d'import depuis Dify. Vous reconstruisez l'application, ou vous la décrivez à Winston."
        }
      ],
      "cta": ctaFr
    }
  },
};
