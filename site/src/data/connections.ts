// The connections shown on /connections (EN and FR) and on the home page, from the product's own catalogue (ConnectorCatalog.cs
// and the nodes that declare an app): each application is a step of a workflow and a tool an agent can use; "starts" means it
// can also start an agent, a team or a workflow (a trigger). Every connection shows as available, the ones being built or
// planned included (founder 2026-11-19: "ne mets aucune connexion en soon, fais comme si elles étaient déjà là"). The page
// never says how many there are: new ones arrive every week. "logo" names a mark of src/data/brand-logos.ts; an app without one
// shows its initial. "home" puts it in the home's grid.
export type Category =
  | 'crm' | 'support' | 'commerce' | 'finance' | 'marketing' | 'email' | 'messaging'
  | 'projects' | 'docs' | 'forms' | 'content' | 'ai' | 'build';

export type Connection = {
  name: string;
  /** What it does, in English and in French. */
  body: string;
  bodyFr: string;
  group: 'apps' | 'models' | 'build';
  cat: Category;
  status: 'live' | 'soon';
  /** A step of a workflow. */
  step?: boolean;
  /** A tool (or a channel) an agent uses. */
  tool?: boolean;
  /** Starts an agent, a team or a workflow when something happens in it. */
  starts?: boolean;
  home?: boolean;
  logo?: string;
  /** The French name of a building block; apps and models keep theirs. */
  fr?: string;
};

const app = (c: Omit<Connection, 'group'> & { group?: Connection['group'] }): Connection => ({ group: 'apps', home: true, ...c });
// An application with a connector: a step and a tool, and sometimes a trigger.
const both = { step: true, tool: true };

export const connections: Connection[] = [
  // Google Workspace and the best-known apps first: the home grid keeps this order.
  app({ name: 'Google Sheets', cat: 'docs', status: 'live', ...both, logo: 'googlesheets', body: 'Read rows, add rows, and update or clear cells', bodyFr: 'Lire et ajouter des lignes, modifier ou vider des cellules' }),
  app({ name: 'Google Drive', cat: 'docs', status: 'live', ...both, logo: 'googledrive', body: 'Find, read and file documents', bodyFr: 'Trouver, lire et classer des documents' }),
  app({ name: 'Google Calendar', cat: 'forms', status: 'live', ...both, logo: 'googlecalendar', body: 'List, create, change and delete events', bodyFr: 'Lister, créer, modifier et supprimer des événements' }),
  app({ name: 'Google Docs', cat: 'docs', status: 'live', ...both, logo: 'googledocs', body: 'Read and write documents', bodyFr: 'Lire et écrire des documents' }),
  app({ name: 'Slack', cat: 'messaging', status: 'live', ...both, logo: 'slack', body: 'Post and read messages; an agent can ask a person in Slack', bodyFr: 'Publier et lire des messages ; un agent peut poser une question dans Slack' }),
  app({ name: 'HubSpot', cat: 'crm', status: 'live', ...both, logo: 'hubspot', body: 'Read and update contacts, companies and deals', bodyFr: 'Lire et mettre à jour contacts, entreprises et affaires' }),
  app({ name: 'Notion', cat: 'docs', status: 'live', ...both, logo: 'notion', body: 'Read and write pages and databases', bodyFr: 'Lire et écrire des pages et des bases' }),
  app({ name: 'Stripe', cat: 'commerce', status: 'live', ...both, starts: true, logo: 'stripe', body: 'Customers, payments, invoices and payment links', bodyFr: 'Clients, paiements, factures et liens de paiement' }),
  app({ name: 'Shopify', cat: 'commerce', status: 'live', ...both, starts: true, logo: 'shopify', body: 'Orders, products and customers of your store', bodyFr: 'Commandes, produits et clients de votre boutique' }),
  app({ name: 'Airtable', cat: 'docs', status: 'live', ...both, starts: true, logo: 'airtable', body: 'List, read, add, update and delete records', bodyFr: 'Lister, lire, ajouter, modifier et supprimer des enregistrements' }),
  app({ name: 'Zendesk', cat: 'support', status: 'live', ...both, starts: true, logo: 'zendesk', body: 'Read, answer and update tickets', bodyFr: 'Lire, répondre et mettre à jour des tickets' }),
  app({ name: 'Intercom', cat: 'support', status: 'live', ...both, logo: 'intercom', body: 'Read and answer conversations', bodyFr: 'Lire et répondre aux conversations' }),
  app({ name: 'Freshdesk', cat: 'support', status: 'live', ...both, logo: 'freshdesk', body: 'Read, answer and update tickets', bodyFr: 'Lire, répondre et mettre à jour des tickets' }),
  app({ name: 'Jira', cat: 'projects', status: 'live', ...both, logo: 'jira', body: 'Create and update issues', bodyFr: 'Créer et mettre à jour des tickets' }),
  app({ name: 'Asana', cat: 'projects', status: 'live', ...both, starts: true, logo: 'asana', body: 'Create and update tasks', bodyFr: 'Créer et mettre à jour des tâches' }),
  app({ name: 'Trello', cat: 'projects', status: 'live', ...both, logo: 'trello', body: 'Create and move cards', bodyFr: 'Créer et déplacer des cartes' }),
  app({ name: 'monday.com', cat: 'projects', status: 'live', ...both, starts: true, body: 'Create and update items on your boards', bodyFr: 'Créer et mettre à jour les éléments de vos tableaux' }),
  app({ name: 'ClickUp', cat: 'projects', status: 'live', ...both, starts: true, logo: 'clickup', body: 'Create and update tasks', bodyFr: 'Créer et mettre à jour des tâches' }),
  app({ name: 'Linear', cat: 'projects', status: 'live', ...both, starts: true, logo: 'linear', body: 'Create and update issues', bodyFr: 'Créer et mettre à jour des tickets' }),
  app({ name: 'GitHub', cat: 'projects', status: 'live', ...both, starts: true, logo: 'github', body: 'Issues and pull requests', bodyFr: 'Issues et pull requests' }),
  app({ name: 'Todoist', cat: 'projects', status: 'live', ...both, logo: 'todoist', body: 'Create and complete tasks', bodyFr: 'Créer et terminer des tâches' }),
  app({ name: 'Google Tasks', cat: 'projects', status: 'live', ...both, logo: 'googletasks', body: 'Read and update your task lists and tasks', bodyFr: 'Lire et mettre à jour vos listes et vos tâches' }),
  app({ name: 'Pipedrive', cat: 'crm', status: 'live', ...both, starts: true, logo: 'pipedrive', body: 'Read and update deals, people and organizations', bodyFr: 'Lire et mettre à jour affaires, personnes et organisations' }),
  app({ name: 'Attio', cat: 'crm', status: 'live', ...both, starts: true, logo: 'attio', body: 'Read and update the records of your CRM', bodyFr: 'Lire et mettre à jour les fiches de votre CRM' }),
  app({ name: 'Google Contacts', cat: 'crm', status: 'live', ...both, body: 'Read and update your contacts', bodyFr: 'Lire et mettre à jour vos contacts' }),
  app({ name: 'Mailchimp', cat: 'marketing', status: 'live', ...both, logo: 'mailchimp', body: 'Keep your audiences and send campaigns', bodyFr: 'Tenir vos audiences et envoyer des campagnes' }),
  app({ name: 'Brevo', cat: 'marketing', status: 'live', ...both, logo: 'brevo', body: 'Send emails, and keep your contacts and lists', bodyFr: 'Envoyer des e-mails, tenir vos contacts et vos listes' }),
  app({ name: 'MailerLite', cat: 'marketing', status: 'live', ...both, body: 'Keep your subscribers and send campaigns', bodyFr: 'Tenir vos abonnés et envoyer des campagnes' }),
  app({ name: 'Resend', cat: 'email', status: 'live', ...both, logo: 'resend', body: 'Send emails from your application', bodyFr: 'Envoyer des e-mails depuis votre application' }),
  app({ name: 'Email', cat: 'email', status: 'live', step: true, tool: true, body: 'Send and read emails with any mailbox (SMTP and IMAP)', bodyFr: "Envoyer et lire des e-mails avec n'importe quelle boîte (SMTP et IMAP)" }),
  app({ name: 'Telegram', cat: 'messaging', status: 'live', ...both, starts: true, logo: 'telegram', body: 'Send messages, photos and files from a bot, and read chats', bodyFr: "Envoyer messages, photos et fichiers depuis un bot, et lire les discussions" }),
  app({ name: 'Discord', cat: 'messaging', status: 'live', ...both, logo: 'discord', body: "Post, edit, read and delete messages in a server's channels", bodyFr: "Publier, modifier, lire et supprimer des messages dans les salons d'un serveur" }),
  app({ name: 'Google Forms', cat: 'forms', status: 'live', ...both, logo: 'googleforms', body: 'Create and change forms, and read their answers', bodyFr: 'Créer et modifier des formulaires, lire leurs réponses' }),
  app({ name: 'Typeform', cat: 'forms', status: 'live', ...both, starts: true, logo: 'typeform', body: 'Read the answers to your forms', bodyFr: 'Lire les réponses à vos formulaires' }),
  app({ name: 'Tally', cat: 'forms', status: 'live', ...both, starts: true, logo: 'tally', body: 'Read the answers to your forms', bodyFr: 'Lire les réponses à vos formulaires' }),
  app({ name: 'Calendly', cat: 'forms', status: 'live', ...both, starts: true, logo: 'calendly', body: 'The meetings people book with you', bodyFr: 'Les rendez-vous que l’on prend avec vous' }),
  app({ name: 'Cal.com', cat: 'forms', status: 'live', ...both, starts: true, logo: 'calcom', body: 'The meetings people book with you', bodyFr: 'Les rendez-vous que l’on prend avec vous' }),
  app({ name: 'Google Slides', cat: 'docs', status: 'live', ...both, logo: 'googleslides', body: 'Read and write presentations', bodyFr: 'Lire et écrire des présentations' }),
  app({ name: 'WordPress', cat: 'content', status: 'live', step: true, logo: 'wordpress', body: 'Publish and update posts and media', bodyFr: 'Publier et mettre à jour articles et médias' }),
  app({ name: 'Supabase Storage', cat: 'build', status: 'live', step: true, logo: 'supabase', body: 'Store and fetch files', bodyFr: 'Stocker et récupérer des fichiers' }),
  app({ name: 'Recraft', cat: 'ai', status: 'live', step: true, logo: 'recraft', body: 'Make images from a description', bodyFr: 'Créer des images à partir d’une description' }),

  app({ name: 'WooCommerce', cat: 'commerce', status: 'live', ...both, starts: true, logo: 'woocommerce', body: 'Orders, products and customers of your store', bodyFr: 'Commandes, produits et clients de votre boutique' }),
  app({ name: 'PayPal', cat: 'commerce', status: 'live', ...both, starts: true, logo: 'paypal', body: 'Payments, orders, invoices and disputes', bodyFr: 'Paiements, commandes, factures et litiges' }),
  app({ name: 'Mollie', cat: 'commerce', status: 'live', ...both, starts: true, body: 'Payments, payment links and refunds', bodyFr: 'Paiements, liens de paiement et remboursements' }),
  app({ name: 'Pennylane', cat: 'finance', status: 'live', ...both, starts: true, body: 'Your books: invoices, suppliers and customers', bodyFr: 'Votre comptabilité : factures, fournisseurs et clients' }),
  app({ name: 'Qonto', cat: 'finance', status: 'live', ...both, starts: true, body: 'Read your bank transactions and attach receipts', bodyFr: 'Lire vos opérations bancaires et joindre les justificatifs' }),
  app({ name: 'Klaviyo', cat: 'marketing', status: 'live', ...both, body: 'Profiles, lists and events of your email marketing', bodyFr: 'Profils, listes et événements de votre e-mailing' }),
  app({ name: 'ActiveCampaign', cat: 'marketing', status: 'live', ...both, starts: true, logo: 'activecampaign', body: 'Contacts, lists, tags and deals', bodyFr: 'Contacts, listes, tags et affaires' }),
  app({ name: 'SendGrid', cat: 'email', status: 'live', ...both, starts: true, body: 'Send emails, and follow what became of them', bodyFr: 'Envoyer des e-mails et suivre ce qu’ils deviennent' }),
  app({ name: 'Postmark', cat: 'email', status: 'live', ...both, starts: true, logo: 'postmark', body: 'Send and receive emails from your application', bodyFr: 'Envoyer et recevoir des e-mails depuis votre application' }),
  app({ name: 'Mailgun', cat: 'email', status: 'live', ...both, starts: true, logo: 'mailgun', body: 'Send and receive emails on your domain', bodyFr: 'Envoyer et recevoir des e-mails sur votre domaine' }),
  app({ name: 'Twilio', cat: 'messaging', status: 'live', ...both, starts: true, body: 'Send and receive text messages', bodyFr: 'Envoyer et recevoir des SMS' }),
  app({ name: 'WhatsApp Business', cat: 'messaging', status: 'live', ...both, starts: true, logo: 'whatsapp', body: 'Send and receive messages on your business number', bodyFr: 'Envoyer et recevoir des messages sur votre numéro professionnel' }),
  app({ name: 'Webflow', cat: 'content', status: 'live', ...both, starts: true, logo: 'webflow', body: 'Publish and update your site content', bodyFr: 'Publier et mettre à jour le contenu de votre site' }),
  app({ name: 'Contentful', cat: 'content', status: 'live', ...both, starts: true, logo: 'contentful', body: 'Entries and assets of your content', bodyFr: 'Entrées et médias de vos contenus' }),
  app({ name: 'Zoom', cat: 'forms', status: 'live', ...both, starts: true, logo: 'zoom', body: 'Create meetings and read their details', bodyFr: 'Créer des réunions et lire leurs détails' }),
  app({ name: 'Dropbox', cat: 'docs', status: 'live', ...both, logo: 'dropbox', body: 'Find, read and file documents', bodyFr: 'Trouver, lire et classer des documents' }),
  app({ name: 'Box', cat: 'docs', status: 'live', ...both, starts: true, logo: 'box', body: 'Find, read and file documents', bodyFr: 'Trouver, lire et classer des documents' }),
  app({ name: 'Miro', cat: 'docs', status: 'live', ...both, logo: 'miro', body: 'Add notes and cards to your boards', bodyFr: 'Ajouter des notes et des cartes à vos tableaux' }),
  app({ name: 'Microsoft Excel', cat: 'docs', status: 'live', ...both, logo: 'microsoftexcel', body: 'Read and fill your workbooks', bodyFr: 'Lire et remplir vos classeurs' }),
  app({ name: 'Outlook', cat: 'email', status: 'live', ...both, logo: 'microsoftoutlook', body: 'Read, sort and answer your emails', bodyFr: 'Lire, trier et répondre à vos e-mails' }),
  app({ name: 'Microsoft Teams', cat: 'messaging', status: 'live', ...both, logo: 'microsoftteams', body: 'Post and read messages', bodyFr: 'Publier et lire des messages' }),
  app({ name: 'OneDrive', cat: 'docs', status: 'live', ...both, logo: 'microsoftonedrive', body: 'Find, read and file documents', bodyFr: 'Trouver, lire et classer des documents' }),
  app({ name: 'SharePoint', cat: 'docs', status: 'live', ...both, logo: 'microsoftsharepoint', body: 'Find, read and file documents in your sites', bodyFr: 'Trouver, lire et classer les documents de vos sites' }),
  app({ name: 'Salesforce', cat: 'crm', status: 'live', ...both, logo: 'salesforce', body: 'Read and update your CRM', bodyFr: 'Lire et mettre à jour votre CRM' }),
  app({ name: 'Zoho CRM', cat: 'crm', status: 'live', ...both, logo: 'zoho', body: 'Read and update leads, contacts and deals', bodyFr: 'Lire et mettre à jour prospects, contacts et affaires' }),
  app({ name: 'Close', cat: 'crm', status: 'live', ...both, starts: true, body: 'Read and update leads, opportunities, notes and tasks', bodyFr: 'Lire et mettre à jour prospects, opportunités, notes et tâches' }),
  app({ name: 'Copper', cat: 'crm', status: 'live', ...both, starts: true, body: 'Read and update people, companies, leads and opportunities', bodyFr: 'Lire et mettre à jour personnes, entreprises, prospects et opportunités' }),
  app({ name: 'folk', cat: 'crm', status: 'live', ...both, starts: true, body: 'Read and update people, companies and groups', bodyFr: 'Lire et mettre à jour personnes, entreprises et groupes' }),
  app({ name: 'lemlist', cat: 'marketing', status: 'live', ...both, starts: true, body: 'Add leads to campaigns and follow their replies', bodyFr: 'Ajouter des contacts aux campagnes et suivre leurs réponses' }),
  app({ name: 'QuickBooks', cat: 'finance', status: 'live', ...both, logo: 'quickbooks', body: 'Read and create invoices and customers', bodyFr: 'Lire et créer des factures et des clients' }),
  app({ name: 'Xero', cat: 'finance', status: 'live', ...both, logo: 'xero', body: 'Read and create invoices and contacts', bodyFr: 'Lire et créer des factures et des contacts' }),
  app({ name: 'Confluence', cat: 'docs', status: 'live', ...both, logo: 'confluence', body: 'Read and write pages', bodyFr: 'Lire et écrire des pages' }),
  app({ name: 'Google Analytics', cat: 'content', status: 'live', ...both, logo: 'googleanalytics', body: 'Read your traffic reports', bodyFr: "Lire vos rapports d'audience" }),
  app({ name: 'PostgreSQL', cat: 'build', status: 'live', ...both, logo: 'postgresql', body: 'Read and write the tables of your database', bodyFr: 'Lire et écrire les tables de votre base' }),

  // The AI models: each agent picks its own.
  app({ name: 'OpenRouter', group: 'models', cat: 'ai', status: 'live', logo: 'openrouter', body: 'Many AI providers through one account', bodyFr: "De nombreux fournisseurs d'IA avec un seul compte" }),
  app({ name: 'OpenAI', group: 'models', cat: 'ai', status: 'live', logo: 'openai', body: 'GPT models', bodyFr: 'Les modèles GPT' }),
  app({ name: 'Anthropic', group: 'models', cat: 'ai', status: 'live', logo: 'anthropic', body: 'Claude models', bodyFr: 'Les modèles Claude' }),
  app({ name: 'Google Gemini', group: 'models', cat: 'ai', status: 'live', logo: 'googlegemini', body: 'Gemini models', bodyFr: 'Les modèles Gemini' }),
  app({ name: 'Amazon Bedrock', group: 'models', cat: 'ai', status: 'live', body: 'The models of your AWS account', bodyFr: 'Les modèles de votre compte AWS' }),

  // The building blocks that reach everything else.
  { name: 'HTTP requests', fr: 'Requêtes HTTP', group: 'build', cat: 'build', status: 'live', step: true, tool: true, body: 'Call your own systems and other web services from a step or an agent', bodyFr: "Appeler vos propres systèmes et d'autres services web, depuis une étape ou un agent" },
  { name: 'MCP servers', fr: 'Serveurs MCP', group: 'build', cat: 'build', status: 'live', tool: true, body: 'Give your agents the tools of any MCP server', bodyFr: "Donner à vos agents les outils de n'importe quel serveur MCP" },
  { name: 'Webhooks', fr: 'Webhooks', group: 'build', cat: 'build', status: 'live', starts: true, body: 'Start an automation when another service calls it', bodyFr: 'Lancer une automatisation quand un autre service l’appelle' },
  { name: 'Schedules', fr: 'Planifications', group: 'build', cat: 'build', status: 'live', starts: true, body: 'Start an automation at the times you set', bodyFr: 'Lancer une automatisation aux heures que vous fixez' },
  { name: 'Web search', fr: 'Recherche web', group: 'build', cat: 'build', status: 'live', step: true, tool: true, body: 'Search the web from a step or an agent', bodyFr: 'Chercher sur le web, depuis une étape ou un agent' },
  { name: 'Web pages', fr: 'Pages web', group: 'build', cat: 'build', status: 'live', step: true, tool: true, body: 'Read any public page', bodyFr: "Lire n'importe quelle page publique" },
];

/** The name of a connection on a page in that language: apps and models keep theirs; the building blocks have a French one. */
export const nameOf = (item: Connection, lang: 'en' | 'fr') => (lang === 'fr' && item.fr) || item.name;
