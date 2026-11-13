// Long-form case studies, served at /projects/<slug>/.
//
// Every figure here comes from the project's own repository (README, docs,
// CI workflow, tests). Keep it that way: update the numbers when the project
// changes rather than rounding them up.

export interface ArchNode {
  label: string
  detail?: string
}

export interface ArchGroup {
  title: string
  nodes: ArchNode[]
}

export interface ArchColumn {
  title: string
  nodes?: ArchNode[]
  groups?: ArchGroup[]
}

export interface Decision {
  title: string
  why: string
  cost: string
}

export interface CaseStudy {
  slug: string
  name: string
  title: string
  tagline: string
  /** Used for the meta description and link previews. */
  description: string
  period: string
  kind: string
  /** ISO date the case study was published, for structured data. */
  published: string
  cover: string
  live: { href: string; label: string }
  github?: string
  facts: { value: string; label: string }[]
  problem: string[]
  architecture: {
    intro: string
    columns: ArchColumn[]
    /** Labels for the arrows between columns, one fewer than columns. */
    links: string[]
    footnote?: string
  }
  flow: {
    title: string
    intro: string
    steps: { title: string; detail: string }[]
  }
  decisions: Decision[]
  results: string[]
  next: { intro?: string; items: string[] }
  stack: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'solarcast',
    name: 'SolarCast',
    title: 'SolarCast: forecasting solar income, shipped with GitOps',
    tagline:
      'A Prophet model that forecasts a home solar system’s monthly generation and payout, delivered to Kubernetes through a pipeline where Git is the only way to deploy.',
    description:
      'Case study: how Kalhara Tennakoon built SolarCast, a Prophet forecasting app for residential solar, and shipped it to Kubernetes with GitHub Actions, Trivy, Kustomize and Argo CD.',
    period: 'Apr 2026 – Oct 2026',
    kind: 'Personal project · ML and DevOps',
    published: '2026-11-09',
    cover: '/project-covers/solarcast.jpg',
    live: { href: 'https://kalharatennakoon.com/solarcast/', label: 'Open the live demo' },
    github: 'https://github.com/kalharatennakoon/solarcast',
    facts: [
      { value: '8.0%', label: 'error (MAPE) on 9 unseen months' },
      { value: '9.5%', label: 'error of the same-month-last-year baseline' },
      { value: '39', label: 'automated tests gating every pull request' },
      { value: '0', label: 'manual kubectl steps to deploy' },
    ],
    problem: [
      'A rooftop solar system in Sri Lanka is paid for the energy it exports to the grid, at LKR 37 a unit, about a month after each meter reading. The household wanted to know what next month’s generation and payout would be, with an honest range rather than a single guess.',
      'The data made that harder than it sounds. There are only 29 clean monthly records, from April 2024. The utility sometimes skips a meter visit, so one reading covers two months. One month is incomplete because the inverter lost its Wi-Fi. And the readings are private, so they could not go into Git, a container image or a public demo.',
      'I also used the project to practise the delivery side properly: a forecasting model is only useful if it can be tested, shipped and rolled back as safely as any other service.',
    ],
    architecture: {
      intro:
        'Two containers, a React dashboard served by nginx and a FastAPI backend that trains and serves the model, run in two Kubernetes environments built from the same manifests. Nothing in the cluster is changed by hand: Argo CD keeps it matching the repository.',
      columns: [
        {
          title: 'Source and CI',
          nodes: [
            { label: 'GitHub repository', detail: 'App code and Kubernetes manifests in one place' },
            { label: 'GitHub Actions', detail: 'ruff, pytest, image builds, Trivy, smoke test' },
          ],
        },
        {
          title: 'Registry',
          nodes: [{ label: 'Docker Hub', detail: 'Backend and frontend images, amd64 and arm64, tagged with the commit SHA' }],
        },
        {
          title: 'Kubernetes cluster',
          nodes: [{ label: 'Argo CD', detail: 'Watches deploy/overlays and syncs, prunes and self-heals' }],
          groups: [
            {
              title: 'solarcast-dev',
              nodes: [
                { label: 'frontend', detail: 'nginx, 1 pod' },
                { label: 'backend', detail: 'FastAPI and Prophet' },
                { label: 'Synthetic data', detail: 'Secret and model volume' },
              ],
            },
            {
              title: 'solarcast-prod',
              nodes: [
                { label: 'frontend', detail: 'nginx, 2 pods' },
                { label: 'backend', detail: 'FastAPI and Prophet' },
                { label: 'Real readings', detail: 'Secret and model volume' },
              ],
            },
          ],
        },
      ],
      links: ['images', 'pulled by the cluster'],
      footnote:
        'CI never talks to the cluster. After publishing images it commits the new tag to the dev overlay, and Argo CD notices the commit. The inverter CSVs are mounted from a Kubernetes Secret created from a local folder, so they never enter Git or an image.',
    },
    flow: {
      title: 'From pull request to running pod',
      intro: 'Every change takes the same path, and each stage can stop it.',
      steps: [
        {
          title: 'Pull request',
          detail:
            'Lint with ruff, 39 pytest tests on synthetic data, a frontend build, both images built, and a Trivy scan that fails on any fixable high or critical vulnerability. Then the real containers start and a smoke test trains, predicts and reads history through nginx.',
        },
        {
          title: 'Merge to main',
          detail: 'Multi-architecture images are published to Docker Hub, tagged with the commit SHA. An image is built once and only its tag moves between environments.',
        },
        {
          title: 'Record the release in Git',
          detail:
            'A CI job writes the new SHA into deploy/overlays/dev and commits it. If another merge lands first, it rebases and retries rather than overwriting it.',
        },
        {
          title: 'Argo CD rolls out dev',
          detail: 'Automated sync applies the commit. Objects removed from Git are pruned, and changes made directly in the cluster are reverted.',
        },
        {
          title: 'Promote or roll back',
          detail:
            'Prod changes only when a pull request edits the tag in deploy/overlays/prod. Rolling back is reverting that commit, so the Git history is the record of what ran where.',
        },
      ],
    },
    decisions: [
      {
        title: 'Prophet with a deliberately small seasonal model',
        why:
          'With 20 training months, Prophet’s default yearly seasonality (Fourier order 10) overfit badly: it forecast 274 kWh for a January whose actual was 512. Order 3 with flat growth and no changepoints captures the dry-season cycle without fitting noise.',
        cost: 'Most calendar months have only one or two samples, so the seasonal shape is still rough.',
      },
      {
        title: 'Ratios for export and payout instead of a second model',
        why:
          'Only generation is forecast. Export, creditable export and cash are derived from it using per-month ratios from the training data, which is simpler to check and explain than another black box.',
        cost: 'Grid import is averaged, not predicted, so a big change in household use (an EV, say) would throw the payout off.',
      },
      {
        title: 'Confidence intervals I compute myself',
        why:
          'With flat growth and MAP fitting, Prophet’s own interval collapses to zero width. The 90% range comes from each month’s observed spread (1.645σ), widened for export by the ratio’s spread.',
        cost: 'Months with a single training sample fall back to a fixed ±10%.',
      },
      {
        title: 'CI records releases in Git and never touches the cluster',
        why:
          'Git is the single source of truth for what runs. Every deployment is a commit someone can read, review and revert, and the cluster needs no CI credentials.',
        cost: 'Each merge adds a bot commit to main, and concurrent merges need a rebase-and-retry loop.',
      },
      {
        title: 'Recreate rollouts for the backend',
        why: 'Trained models live on a persistent volume that only one pod can attach, and two pods must never write to it at once.',
        cost: 'The API is briefly unavailable during each backend rollout.',
      },
      {
        title: 'Private data stays out of everything shared',
        why:
          'CI, the dev environment and the public demo all run on a synthetic dataset. The demo on GitHub Pages runs the real pipeline at build time and ships only the JSON answers.',
        cost: 'Setting up a cluster includes a manual step to load the real readings into prod.',
      },
    ],
    results: [
      'On the 9 most recent months, which the model never saw, it is off by about 8.0% (MAE about 47 kWh a month), against about 9.5% for simply repeating the same month last year. These figures are for data up to September 2026 and move as each month is added.',
      'A merge reaches the dev cluster with no manual step, and prod moves only by a reviewed pull request. A manual change in the cluster does not last: Argo CD puts back what Git says.',
      'Both pods run as non-root with every Linux capability dropped and no Kubernetes API token, the backend on a read-only root filesystem, and every CI action is pinned to a commit SHA.',
      'The public demo rebuilds on every change and on the 1st of each month, so its history always runs to last month without any private reading reaching it.',
    ],
    next: {
      intro: 'The model only narrowly beats the baseline, and the platform has known gaps. These are next, in this order:',
      items: [
        'Observability: Prometheus, Grafana dashboards and alerts for latency, errors and forecast error. The API already exposes request metrics, but nothing collects them yet.',
        'Move training out of the API into a cluster job that publishes to an MLflow registry, and remove the unauthenticated POST /train endpoint.',
        'Switch to daily inverter data with weather features, kept in MinIO, so the model can beat the baseline by a clear margin.',
        'Add an Ingress instead of port-forwarding, and manage the Argo CD applications themselves with the app-of-apps pattern.',
        'Scheduled retraining behind a promotion gate, with canary releases through Argo Rollouts so a worse model rolls itself back.',
      ],
    },
    stack: ['Python', 'Prophet', 'pandas', 'FastAPI', 'React', 'Recharts', 'Docker', 'nginx', 'Kubernetes', 'Kustomize', 'Argo CD', 'GitHub Actions', 'Trivy', 'Docker Hub', 'pytest', 'ruff'],
  },
  {
    slug: 'know-your-letter',
    name: 'Know Your Letter',
    title: 'Know Your Letter: official letters, explained in plain Sinhala, Tamil or English',
    tagline:
      'Photograph a letter from a bank, a government office or a lawyer and get what it says, what to do and by when, in your own language. Free, and nothing from the letter is kept.',
    description:
      'Case study: how Kalhara Tennakoon built Know Your Letter, a vision-LLM app on Next.js and Ollama Cloud that explains official letters in Sinhala, Tamil or English without storing them.',
    period: 'Oct 2026',
    kind: 'Personal project · Applied AI',
    published: '2026-11-09',
    cover: '/project-covers/know-your-letter.jpg',
    live: { href: 'https://know-your-letter.vercel.app', label: 'Try it live' },
    facts: [
      { value: '3', label: 'languages, switchable without re-reading the photo' },
      { value: '4', label: 'pages per letter, in one model call' },
      { value: '88', label: 'unit tests, no network needed' },
      { value: '0', label: 'letters stored or logged' },
    ],
    problem: [
      'Many people in Sri Lanka receive letters they cannot fully read: a bank notice in English, a government letter in formal Sinhala, a lawyer’s demand, or a letter from an employer abroad. Missing what a letter asks for, or by when, can cost money. Asking someone else to read it means showing them private details.',
      'The goal was one screen on a phone: take a photo, and get what the letter is, what it says, what to do and the deadline, in the reader’s own language. Three things made this harder than calling a model. A wrong amount or date is worse than no answer. A scam letter must never be called genuine. And a letter holds identity and account numbers, so the app has to be trustworthy with them.',
    ],
    architecture: {
      intro:
        'A Next.js app on Vercel. Everything that can run on the phone does, the server makes one call to a vision model, and a small Redis store holds only counters.',
      columns: [
        {
          title: 'On the phone',
          nodes: [
            { label: 'Photos', detail: 'Shrunk in the browser to 2000 px JPEG' },
            { label: 'PDFs', detail: 'Turned into page images with pdf.js; the file and its password stay on the device' },
            { label: 'Read aloud, share, calendar', detail: 'Device voices, share sheet and .ics file, no server call' },
          ],
        },
        {
          title: 'Next.js API on Vercel',
          nodes: [
            { label: '/api/explain', detail: 'Checks pages, applies the hourly limit, one model call' },
            { label: '/api/translate', detail: 'Translates the text, then checks every number' },
            { label: '/api/ask', detail: 'Answers from the letter itself' },
            { label: 'Clean-up', detail: 'Validates the JSON, masks NIC, card and IBAN numbers' },
          ],
        },
        {
          title: 'Services',
          nodes: [
            { label: 'Ollama Cloud', detail: 'Gemma vision model, constrained to a fixed JSON schema' },
            { label: 'Upstash Redis', detail: 'Hourly counts under a hashed visitor key, and yes/no votes by letter type' },
          ],
        },
      ],
      links: ['page images, under 3.8 MB', 'one call per letter'],
      footnote:
        'The server logs only the type of an error and how long the request took. A helpful vote stores the kind of sender (bank, utility and so on) and yes or no, nothing else.',
    },
    flow: {
      title: 'What happens to a letter',
      intro: 'From the photo to the explanation, with a check at each step.',
      steps: [
        {
          title: 'Prepare on the phone',
          detail:
            'Up to four pages are shrunk until they fit together under 3.8 MB, safely inside Vercel’s 4.5 MB request limit, so uploads stay quick on mobile data.',
        },
        {
          title: 'Check and limit',
          detail:
            'The server validates the images and takes one of three letters an hour for that visitor. The visitor’s address is HMAC-hashed before it is stored, and the store forgets it once the hour has passed.',
        },
        {
          title: 'One model call',
          detail:
            'All pages go to Gemma with the prompt in a single call, and the model must fill a fixed JSON schema: what the letter is, what it says, steps, deadline, scam signs, difficult words. The server stops waiting after 55 seconds.',
        },
        {
          title: 'Clean and protect',
          detail:
            'The reply is checked field by field. Country and language must be real codes from fixed lists, and identity, card and bank numbers the model repeated are masked to their last four characters.',
        },
        {
          title: 'Switch language safely',
          detail:
            'Changing language sends the explanation’s text, not the photo, to be translated. Dates never go to the model, and if any number in the translation differs from the original, it is thrown away and the photo is read again in the new language.',
        },
      ],
    },
    decisions: [
      {
        title: 'A fixed JSON schema instead of free text',
        why:
          'The page shows the same sections in the same order every time, and the server can check each field: dates, codes, lists of words. Free text could not be checked or translated safely.',
        cost: 'The model does not always keep to the format. Once it sent a single word as an object instead of a list, so the parser accepts several shapes.',
      },
      {
        title: 'Translate the explanation, not the photo',
        why: 'Translating text takes about 5 seconds and costs far less than reading the photo again, which takes about 20.',
        cost: 'A translation can change a number, so every one is checked and some are rejected, which falls back to the slower path.',
      },
      {
        title: 'The app never says a letter is genuine',
        why:
          'The model lists only the signs of a fake it can actually see. When there are any, the page shows advice written by the app (don’t pay, don’t share a PIN or OTP, call the official number), not by the model.',
        cost: 'A worried reader of a real letter gets no reassurance from the app, only the advice to check with the sender.',
      },
      {
        title: 'Keep nothing from the letter',
        why: 'People photograph letters full of personal details. The privacy promise has to be true by design, not by policy.',
        cost: 'Real failures cannot be reviewed afterwards, so accuracy is checked on a separate set of test letters run through the model.',
      },
      {
        title: 'Serverless and free tier',
        why: 'The app is free to use, so it runs on Vercel’s Hobby plan and Upstash’s free Redis, with no server to maintain.',
        cost: 'Requests are size and time limited, which is why photos are shrunk on the phone and the model gets 55 seconds.',
      },
    ],
    results: [
      'Version 2 is live: one to four photos or a PDF in, an explanation out, switchable between Sinhala, Tamil and English.',
      'Checked against the real model with a sample English bank letter in all three languages. Two lessons from that run are built in: the prompt asks for the letter’s official wording explicitly, and the parser accepts the looser shapes the model sometimes sends.',
      'Difficult official words are listed with plain meanings in the reader’s language and underlined where they appear, allowing for how Sinhala and Tamil words change their endings.',
      '88 unit tests cover the clean-up, masking, translation checks, rate limiting, calendar files and word matching, and run without a network.',
    ],
    next: {
      intro: 'Some of version 2 has only been tested with a stand-in for the model. Before saying it works, I want to:',
      items: [
        'Run real letters from abroad, in Arabic, Korean and other scripts, through the model. Support for them is built and unit-tested, but not yet proven on real letters, or within 55 seconds for four pages.',
        'Have fluent speakers check the Sinhala and Tamil country names and word meanings.',
        'Find which check rejects English-to-Sinhala translations of the sample letter, which forces the 20-second fallback.',
        'Count "days left" in the reader’s own time zone, not Sri Lanka’s, so readers abroad are never a day out.',
      ],
    },
    stack: ['Next.js', 'React', 'Gemma (vision LLM)', 'Ollama Cloud', 'JSON Schema', 'pdf.js', 'Upstash Redis', 'Vercel', 'Web Speech API', 'Node test runner'],
  },
  {
    slug: 'orderbook',
    name: 'OrderBook',
    title: 'OrderBook: the paper order book, rebuilt for WhatsApp sellers',
    tagline:
      'Orders, advances, balances, couriers and invoices in one phone app for small Facebook and WhatsApp sellers in Sri Lanka, in Sinhala, Tamil or English, with AI that reads chats and bank slips but never decides on its own.',
    description:
      'Case study: how Kalhara Tennakoon built OrderBook, a Next.js and Postgres app for Sri Lankan social media sellers, with AI that reads WhatsApp orders and bank slips under checks the app controls.',
    period: 'Oct 2026 – Nov 2026',
    kind: 'Personal project · Product and applied AI',
    published: '2026-11-12',
    cover: '/project-covers/orderbook.jpg',
    live: { href: 'https://myorderbook.vercel.app/', label: 'Open OrderBook' },
    facts: [
      { value: '3', label: 'languages, about 620 interface strings each' },
      { value: '3', label: 'AI features, every answer checked before it is used' },
      { value: '30', label: 'orders a month on the free plan' },
      { value: 'Rs. 0', label: 'WhatsApp API cost: messages go out from the seller’s own number' },
    ],
    problem: [
      'Many small businesses in Sri Lanka sell through Facebook pages and WhatsApp: home bakers, clothing sellers, people making crafts. Orders arrive as chat messages, customers pay an advance by bank transfer and send a photo of the slip, and the rest is collected on delivery or through a courier. Most of it is tracked in a paper book or in the seller’s memory.',
      'That breaks down in predictable places: who still owes money, which slip belongs to which order, what has to be baked or packed for tomorrow, and which courier still has the cash-on-delivery money. The sellers work on their phones, often in Sinhala or Tamil, and will not pay for software that is slower than the book.',
      'So the goal was a phone-first app that is quicker than writing an order down, speaks the seller’s language, and works with how they already sell: WhatsApp, bank transfers and couriers.',
    ],
    architecture: {
      intro:
        'One Next.js app on Vercel’s Singapore region, close to Sri Lanka, with Postgres on Neon in the same region. Sellers sign in to the app; their customers use two public pages that need no account.',
      columns: [
        {
          title: 'On the phone',
          nodes: [
            { label: 'Seller app (PWA)', detail: 'Installable, with an offline page; bottom tabs on phones, a sidebar on desktop' },
            { label: 'Order link /s/…', detail: 'Customers pick products and send an order request' },
            { label: 'Order page /t/…', detail: 'Progress, balance, bank details and slip upload, behind a random 32-character token' },
            { label: 'Invoices', detail: 'Drawn on a canvas in the browser and shared as a picture' },
          ],
        },
        {
          title: 'Next.js on Vercel',
          nodes: [
            { label: 'Server actions', detail: 'Every query scoped to the signed-in seller’s shop' },
            { label: 'Better Auth', detail: 'Email and password, optional Google sign-in' },
            { label: 'AI checks', detail: 'Clean model output field by field before the form or page sees it' },
            { label: 'Slip matcher', detail: 'Plain scoring rules that suggest which unpaid order a payment is for' },
          ],
        },
        {
          title: 'Services',
          nodes: [
            { label: 'Neon Postgres', detail: '21 tables, order numbers from a trigger, balances from a view' },
            { label: 'Ollama Cloud', detail: 'Gemma model, constrained to a JSON schema for each task' },
            { label: 'Billing', detail: 'Bank QR with admin approval, or Payments.lk' },
          ],
        },
      ],
      links: ['forms and photos', 'SQL and one model call'],
      footnote:
        'WhatsApp is reached through wa.me links that open the seller’s own chat with the message filled in, so there is no WhatsApp Business API account, approval or per-message charge.',
    },
    flow: {
      title: 'A payment, from bank slip to balance',
      intro: 'Working out which order a bank transfer belongs to is fiddly by hand, so each step has a check and the seller always has the last word.',
      steps: [
        {
          title: 'Customer uploads the slip',
          detail:
            'On their order page the customer adds a photo of the transfer. The page needs no sign-in, so uploads are limited per visitor by a hashed IP address, to 6 an hour and 3 waiting per order, and a hidden field catches simple bots.',
        },
        {
          title: 'Read with AI',
          detail:
            'The seller taps “Read with AI”. One AI use is reserved from the shop’s monthly allowance first and given back if the call fails. The model returns the amount, date, reference, payer and bank as JSON, and returns nothing it cannot see.',
        },
        {
          title: 'Check against the order',
          detail:
            'Plain rules, not the model, score the unpaid orders: the order number in the reference, the payer’s name, the exact amount due, or an amount that looks like a usual advance. The reasons are shown next to the photo.',
        },
        {
          title: 'Warn about repeats',
          detail: 'Each slip gets a fingerprint, so the seller is warned before the same payment is recorded twice.',
        },
        {
          title: 'Seller confirms',
          detail:
            'Only the seller’s tap saves the payment. The balance is not stored; it is calculated from the order and its payments by a database view, so it cannot drift out of step.',
        },
      ],
    },
    decisions: [
      {
        title: 'AI reads, the app decides',
        why:
          'The model only turns a chat, screenshot or slip into fields. Dates outside a sensible window, impossible amounts and malformed phone numbers are dropped, and the seller reviews the filled form before anything is saved.',
        cost: 'The seller still has to check each result, so AI saves typing rather than removing the step.',
      },
      {
        title: 'Summaries may only use numbers they were given',
        why:
          'The weekly summary on the dashboard is rewritten by the model in the seller’s language. Any number in it that is not in the facts the app supplied, or any link, gets the text thrown away and the app’s own sentences shown instead.',
        cost: 'Some correct summaries are rejected, for example when the model writes a total in a different form.',
      },
      {
        title: 'wa.me links instead of the WhatsApp Business API',
        why: 'No approval, no monthly fee and no per-message charge, and customers see the message come from the number they already know.',
        cost: 'The seller taps Send for each message, and the app cannot know whether it was delivered.',
      },
      {
        title: 'Invoices drawn in the browser',
        why:
          'Sinhala and Tamil letters need proper text shaping. Drawing the invoice on a canvas with the Noto fonts the page already loads gets that right without a server-side PDF tool.',
        cost: 'The invoice is a picture, not a searchable PDF.',
      },
      {
        title: 'Shop scoping in code instead of row-level security',
        why: 'A plain Postgres pool with one rule, every query filtered by the seller’s shop, kept the app simple to build and to read.',
        cost: 'The database will not stop a query that forgets the rule. A single missed filter would show one shop’s data to another, so every new query has to be reviewed for it.',
      },
      {
        title: 'Pro paid by bank QR, approved by hand',
        why:
          'Sellers already pay by bank app. A fixed-amount LankaQR code with their phone number in the remarks costs nothing to accept and needs no gateway account. Payments.lk is wired in as the automatic option.',
        cost: 'Each payment is checked and approved by hand on an admin page, and QR plans do not renew by themselves.',
      },
    ],
    results: [
      'Live, with the full order cycle working: orders with items, delivery fee, discount and advance; status from new to delivered; payments and balances; customers with what they owe; and WhatsApp messages and invoice pictures in one tap.',
      'Beyond the paper book: courier parcels with cash-on-delivery tracking and what each courier still owes, printable waybills and packing slips, a “what to make” list that adds up every item due tomorrow, and payment reminders in a friendly or firm tone.',
      'Customers can order through the shop’s link and pay against their own order page, and those requests count towards the plan only when the seller accepts them.',
      'Three AI features run on one model behind monthly allowances (15 uses free, 500 on Pro): filling an order from a pasted chat or screenshot, reading bank slips and bank SMS, and the weekly summary.',
    ],
    next: {
      intro: 'OrderBook has been built quickly, and some of the groundwork has not caught up yet. In this order:',
      items: [
        'Automated tests and CI, starting with the slip matcher, money formatting and the AI clean-up, which are plain functions and easy to test. There are none yet.',
        'Row-level security in Postgres as a second line behind the shop filter in code.',
        'Have native speakers review the Sinhala and Tamil text, and fill the few strings that are still missing from the Sinhala set.',
        'Measure how often the AI order and slip readers get each field right, on a set of real anonymised chats and slips.',
        'Courier tracking through their APIs, where couriers offer one.',
      ],
    },
    stack: ['Next.js', 'React', 'JavaScript', 'PostgreSQL', 'Neon', 'Better Auth', 'Ollama Cloud', 'Gemma (vision LLM)', 'JSON Schema', 'Tailwind CSS', 'Canvas API', 'PWA', 'i18n', 'Vercel'],
  },
  {
    slug: 'strongcv',
    name: 'StrongCV',
    title: 'StrongCV: CV feedback and rewriting that never invents a fact',
    tagline:
      'Upload a CV and the role you want. Two language models score it, explain what is missing and rewrite it for applicant tracking systems, while rules in the code keep the result honest, English and parseable.',
    description:
      'Case study: how Kalhara Tennakoon built StrongCV, a Next.js app on Ollama Cloud that reviews a CV against a role, rewrites it for ATS and re-scores the result, with nothing stored.',
    period: 'Sep 2026 – Oct 2026',
    kind: 'Personal project · Applied AI',
    published: '2026-11-13',
    cover: '/project-covers/strongcv.jpg',
    live: { href: 'https://strongcv.vercel.app/', label: 'Try it live' },
    facts: [
      { value: '2', label: 'models: one reviews, one writes' },
      { value: '10', label: 'ATS checks run by plain rules, not the model' },
      { value: '6', label: 'AI steps, from review to interview prep' },
      { value: '0', label: 'CVs or job descriptions stored' },
    ],
    problem: [
      'Many employers screen CVs with an applicant tracking system before a person reads them, often only briefly. It is common, especially for graduates, to send one CV to every role, with tables, icons and unusual headings that ATS software cannot read, and with achievements that do not match the words in the job description.',
      'An AI chatbot can rewrite a CV, but it happily invents numbers, tools and job titles, which is worse than a weak CV because it falls apart at interview. The goal was a tool that says clearly what is wrong for a specific role, then fixes it using only what the candidate has actually done, and leaves a gap where a real figure belongs.',
    ],
    architecture: {
      intro:
        'One Next.js app on Vercel. Files are read on the server and thrown away, each AI step is its own API route with a 60-second limit, and the browser builds the Word and PDF downloads itself.',
      columns: [
        {
          title: 'In the browser',
          nodes: [
            { label: 'Form', detail: 'CV file, target role, and a job description or a link to the posting' },
            { label: 'Results', detail: 'Scores, gaps, rewritten CV, cover letter and interview prep' },
            { label: 'Downloads', detail: '.docx and .pdf built on the device with docx and jsPDF' },
            { label: 'Hand-off', detail: 'Opened from Shortlisted with the role and CV filled in' },
          ],
        },
        {
          title: 'Next.js API routes',
          nodes: [
            { label: 'Read the CV', detail: 'PDF, Word or text, up to 4 MB, layout noted for the ATS checks' },
            { label: 'Fetch the job', detail: 'Prefers the page’s JobPosting data; refuses private addresses' },
            { label: 'ATS rules', detail: 'Contact details, headings, dates, symbols, length, tables, images' },
            { label: 'Normalisers', detail: 'Check and repair every model reply before the page sees it' },
          ],
        },
        {
          title: 'Services',
          nodes: [
            { label: 'Ollama Cloud', detail: 'gpt-oss 120B reviews and scores; Gemma 4 31B writes' },
            { label: 'Upstash Redis', detail: 'Per-visitor hourly limits and a daily cap on AI calls' },
          ],
        },
      ],
      links: ['CV file and role', 'one model call per step'],
      footnote:
        'The CV text and job description go back to the browser after the first step, so later steps reuse them without another upload. Nothing is written to a database or a log.',
    },
    flow: {
      title: 'From uploaded CV to a better one',
      intro: 'Each step can be run on its own, and each model reply is checked before it is shown.',
      steps: [
        {
          title: 'Read and check',
          detail:
            'The CV is turned into text and the job posting is fetched or pasted. Ten ATS checks run as plain code first, so missing contact details or a table in a Word file are caught without asking a model.',
        },
        {
          title: 'Review',
          detail:
            'gpt-oss scores the CV against the role, overall and section by section, and lists strengths, weaknesses, missing keywords and prioritised suggestions, as JSON that must match a schema.',
        },
        {
          title: 'Rewrite',
          detail:
            'Gemma rewrites the CV, weakest sections first. It may only use facts from the original, may add a keyword only when the CV already shows that skill, and writes a placeholder such as [X%] where a number is missing.',
        },
        {
          title: 'Clean up',
          detail:
            'Code, not the model, forces standard headings, plain text and consistent dates, strips risky symbols, and rejects any CV or cover letter containing Sinhala or Tamil script, which makes the model try again.',
        },
        {
          title: 'Re-score',
          detail:
            'The improved CV is scored against the same role and put through the same ATS checks, so the page can show a before and after for the match score and the checks passed.',
        },
      ],
    },
    decisions: [
      {
        title: 'Two models, each for what it is good at',
        why: 'A large reasoning model is steadier at strict scoring and long JSON; a smaller writing model produces more natural CV wording, faster.',
        cost: 'Two models to watch for quota, timeouts and changes in output, and two sets of prompts to keep in step.',
      },
      {
        title: 'Rules for ATS, the model only for judgement',
        why:
          'Whether a CV has an email address, standard headings or a table is a fact the code can check every time. The model is kept for what needs judgement, such as how well an achievement fits the role.',
        cost: 'The rules only cover common problems; an unusual layout can pass every check and still parse badly.',
      },
      {
        title: 'Placeholders instead of invented numbers',
        why: 'A rewritten CV has to survive an interview. A bracket such as [N users] tells the candidate exactly where a real figure would help.',
        cost: 'The download is not finished until the candidate fills the gaps, and honesty is enforced by the prompt, not checked in code.',
      },
      {
        title: 'Lenient normalisers instead of a strict validator',
        why:
          'A model can return the right content under a different name, such as bullets as "points" or "highlights". Each reply is read field by field, common variations are accepted and repaired where that is safe, and the call is retried once if the reply is still unusable.',
        cost: 'More hand-written code per feature, and a repaired reply can hide a model that is drifting.',
      },
      {
        title: 'Free, with limits instead of accounts',
        why:
          'No sign-up keeps it quick to try. Each visitor gets three uses of each feature an hour, all AI calls together stop at 300 a day, and a bad file or an unreachable job link does not use up an allowance.',
        cost: 'Limits are by IP address, so people sharing a network share an allowance; without Redis the fallback count is easy to reset.',
      },
      {
        title: 'Build the documents in the browser',
        why: 'Word and PDF files are generated on the device on demand, so no file is ever created or kept on the server.',
        cost: 'The PDF is plain and single-column by design, which suits ATS but limits how the CV can look.',
      },
    ],
    results: [
      'Live and free: upload a PDF, Word or text CV, add a role and a job description or link, and get a scored review, an ATS-clean rewrite as Word or PDF, and a before and after score.',
      'Beyond the review: a tailored cover letter with tone options, and interview preparation with 10 to 12 likely questions, what each one tests, and answer outlines built from the CV.',
      'The feedback can be explained in Sinhala or Tamil, while the CV, keywords and cover letter always stay in English, as employers expect.',
      'Works as the CV check for Shortlisted, my job application tracker: its button opens StrongCV with the role and CV filled in, using the URL fragment so the private CV link never reaches a server log.',
    ],
    next: {
      intro: 'StrongCV works, but some of what it promises is only enforced by prompts so far. Next:',
      items: [
        'Check in code that the rewrite introduces no new employers, dates, degrees or numbers, rather than relying on the prompt alone.',
        'Score the before and after with a model or rubric other than the one that wrote the rewrite, so the improvement is not self-graded.',
        'Add tests for the ATS rules and normalisers, and run them in CI on every pull request. There are none yet.',
        'Re-check the address after every redirect when fetching a job link, and store hashed rather than raw IP addresses for the limits.',
        'Stream results so the first feedback appears in seconds rather than after the whole review.',
      ],
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Ollama Cloud', 'gpt-oss', 'Gemma', 'JSON Schema', 'Upstash Redis', 'unpdf', 'mammoth', 'docx', 'jsPDF', 'Vercel'],
  },
]

/** Case studies hosted with the project itself, linked from the pages above. */
export const hostedCaseStudies: { name: string; href: string }[] = [
  { name: 'VetCare One', href: 'https://kalharatennakoon.com/vetcareone/case-study/' },
]

export function findCaseStudy(slug: string | undefined): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}
