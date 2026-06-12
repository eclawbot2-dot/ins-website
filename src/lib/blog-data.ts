/**
 * Blog / resources content.
 *
 * Each article is genuine, SEO-optimized educational content written to earn
 * organic search traffic and route readers into a quote. Articles support
 * Article + (optional) FAQ structured data, internal links to coverage pages,
 * and a CTA. Body is authored as a small block model so it stays maintainable
 * and renders without a markdown dependency.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; text: string };

export type RelatedLink = { label: string; href: string };

export type Article = {
  slug: string;
  title: string;
  /** <title> / SEO title, can differ from the on-page H1 (title). */
  metaTitle: string;
  description: string;
  category: "Personal" | "Business" | "Money-Saving" | "Getting Started";
  readMinutes: number;
  datePublished: string; // ISO
  dateModified: string; // ISO
  excerpt: string;
  /** Pre-tag the quote CTA with this line, e.g. "Homeowners Insurance". */
  quoteLine?: string;
  related: RelatedLink[];
  faqs?: { question: string; answer: string }[];
  body: Block[];
};

const COVERAGE = {
  auto: { label: "Auto Insurance", href: "/personal/auto" },
  home: { label: "Homeowners Insurance", href: "/personal/homeowners" },
  renters: { label: "Renters Insurance", href: "/personal/renters" },
  umbrella: { label: "Umbrella Insurance", href: "/personal/umbrella" },
  life: { label: "Life Insurance", href: "/personal/life" },
  health: { label: "Health Insurance", href: "/personal/health" },
  gl: { label: "General Liability", href: "/business/general-liability" },
  bop: { label: "Business Owners Policy", href: "/business/bop" },
  wc: { label: "Workers' Comp", href: "/business/workers-comp" },
  cauto: { label: "Commercial Auto", href: "/business/commercial-auto" },
  cyber: { label: "Cyber Liability", href: "/business/cyber" },
  eo: { label: "Professional Liability (E&O)", href: "/business/professional-liability" },
  cprop: { label: "Commercial Property", href: "/business/commercial-property" },
} as const;

export const ARTICLES: Article[] = [
  {
    slug: "how-much-homeowners-insurance-do-i-need",
    title: "How Much Homeowners Insurance Do I Actually Need?",
    metaTitle: "How Much Homeowners Insurance Do I Need? (2026 Guide)",
    description:
      "Replacement cost vs. market value, the right dwelling limit, coverage A–F explained, and how to avoid being underinsured at claim time. A plain-English guide.",
    category: "Personal",
    readMinutes: 8,
    datePublished: "2026-01-14",
    dateModified: "2026-06-01",
    excerpt:
      "The most expensive mistake in homeowners insurance is being underinsured on your dwelling. Here's how to set the right limits — and why your home's market value is the wrong number to start from.",
    quoteLine: "Homeowners Insurance",
    related: [COVERAGE.home, COVERAGE.umbrella, COVERAGE.auto],
    faqs: [
      {
        question: "Should my dwelling coverage equal my home's market value?",
        answer:
          "No. Market value includes the land, which doesn't burn down. Dwelling coverage should equal the cost to rebuild the structure at today's construction prices — which can be higher or lower than market value depending on your area.",
      },
      {
        question: "What is an 80% coinsurance clause?",
        answer:
          "Many policies require you to insure your home to at least 80% of its full replacement cost. If you're below that threshold, the insurer can reduce even partial claim payments proportionally. Insuring to full replacement cost avoids the penalty.",
      },
    ],
    body: [
      {
        type: "p",
        text: "For most families, the home is the single largest asset they'll ever own — and homeowners insurance is the financial backstop that makes recovering from a fire, storm, or lawsuit possible. Yet the most common and most costly mistake homeowners make is being underinsured: carrying a dwelling limit that wouldn't actually rebuild the house at today's construction costs.",
      },
      { type: "h2", text: "Start with replacement cost, not market value" },
      {
        type: "p",
        text: "Your home's market value is what a buyer would pay for it — land included. Insurance doesn't rebuild land; it rebuilds structures. The number that matters is replacement cost: what it would cost a contractor to rebuild your home from the foundation up, at current local labor and materials prices.",
      },
      {
        type: "callout",
        text: "In some markets replacement cost is lower than market value (high land prices); in others it's higher (expensive construction, older or custom homes). Either way, basing your dwelling limit on your purchase price or mortgage balance is a guess — and usually a low one.",
      },
      { type: "h2", text: "The six homeowners coverages, decoded" },
      {
        type: "ul",
        items: [
          "Dwelling (Coverage A): rebuilds the structure. The anchor of the policy — get this right first.",
          "Other Structures (Coverage B): detached garages, fences, sheds — typically 10% of dwelling.",
          "Personal Property (Coverage C): your belongings, usually 50–70% of dwelling. Choose replacement-cost settlement, not actual cash value.",
          "Loss of Use (Coverage D): hotel and living costs while your home is uninhabitable.",
          "Personal Liability (Coverage E): defense and damages if someone is injured on your property. Consider $300k–$500k.",
          "Medical Payments (Coverage F): small no-fault medical bills for injured guests.",
        ],
      },
      { type: "h2", text: "How to size your dwelling limit" },
      {
        type: "ol",
        items: [
          "Get a replacement-cost estimate based on square footage, construction type, and local building costs — not a Zillow estimate.",
          "Add an extended or guaranteed replacement cost endorsement so you're covered if rebuild costs spike after a widespread disaster.",
          "Re-verify the number every renewal. Construction costs have risen sharply; a limit set three years ago may be 20–30% short today.",
        ],
      },
      { type: "h2", text: "Don't forget the gaps standard policies leave" },
      {
        type: "p",
        text: "Standard homeowners policies exclude flood and earthquake, cap jewelry and collectibles at small sublimits, and pay personal property at actual cash value unless you upgrade. Over 20% of flood claims come from properties outside high-risk zones — worth a separate quote even if you're not in a flood plain.",
      },
      {
        type: "p",
        text: "If your net worth exceeds your liability limits, an umbrella policy adds $1 million or more in protection for roughly a dollar a day — see our guide on umbrella insurance below.",
      },
    ],
  },
  {
    slug: "auto-insurance-discounts-youre-missing",
    title: "Auto Insurance Discounts You're Probably Missing",
    metaTitle: "Auto Insurance Discounts You're Missing (Save Hundreds)",
    description:
      "From bundling to telematics to professional-group discounts, here are the auto insurance discounts drivers most often leave on the table — and how to claim them.",
    category: "Money-Saving",
    readMinutes: 7,
    datePublished: "2026-02-03",
    dateModified: "2026-05-20",
    excerpt:
      "Carriers offer dozens of discounts, but they won't always apply them automatically. Here's the checklist we run on every auto policy to make sure you're not overpaying.",
    quoteLine: "Auto Insurance",
    related: [COVERAGE.auto, COVERAGE.home, COVERAGE.umbrella],
    body: [
      {
        type: "p",
        text: "Two drivers with identical records can pay hundreds of dollars apart for the same coverage — partly because of which carrier they're with, and partly because of discounts one of them never claimed. Carriers don't always apply every discount you qualify for automatically. Here's the checklist we run on every auto policy.",
      },
      { type: "h2", text: "Bundling and multi-policy discounts" },
      {
        type: "p",
        text: "Pairing auto with home or renters coverage typically unlocks 10–25% off. But the best bundle isn't always with one carrier — as an independent agency we compare everything-with-one-company against splitting policies across carriers. Sometimes two carriers beat one.",
      },
      { type: "h2", text: "Discounts drivers most often miss" },
      {
        type: "ul",
        items: [
          "Telematics / safe-driver programs: opt-in apps that track mileage and braking can cut 10–30% for careful drivers.",
          "Low-mileage / pay-per-mile: if you work from home or commute rarely, you may be subsidizing heavy drivers.",
          "Professional, alumni, and employer group discounts: many carriers discount specific affiliations.",
          "Paperless, pay-in-full, and autopay discounts: small individually, meaningful together.",
          "Good student and student-away-at-school discounts for households with young drivers.",
          "Anti-theft, advanced safety features, and garaging discounts.",
          "Defensive-driving course completion (especially valuable for older drivers).",
        ],
      },
      { type: "h2", text: "The biggest 'discount' of all: re-shopping at renewal" },
      {
        type: "p",
        text: "Carriers raise rates for entire regions based on repair costs, weather losses, and litigation trends — even when you haven't had a claim. The single largest savings most drivers leave on the table is failing to re-shop when their carrier hikes the rate. That's exactly where an independent agent earns their keep: we re-quote the market for you instead of you starting over from scratch.",
      },
      {
        type: "callout",
        text: "Shopping your policy across carriers uses a soft credit pull and never hurts your credit score — no matter how many carriers we quote.",
      },
    ],
  },
  {
    slug: "what-is-an-umbrella-policy",
    title: "What Is an Umbrella Policy — and Do You Need One?",
    metaTitle: "What Is Umbrella Insurance? Do You Need It? (2026)",
    description:
      "Umbrella insurance adds $1M+ of liability protection above your auto and home policies for about a dollar a day. Here's how it works and who should have it.",
    category: "Personal",
    readMinutes: 6,
    datePublished: "2026-02-18",
    dateModified: "2026-05-10",
    excerpt:
      "Your auto and home liability limits cap out — often at $300k or $500k. An umbrella policy is the inexpensive layer that protects your savings, home equity, and future wages above those limits.",
    quoteLine: "Umbrella Insurance",
    related: [COVERAGE.umbrella, COVERAGE.auto, COVERAGE.home],
    faqs: [
      {
        question: "How much umbrella coverage should I buy?",
        answer:
          "A common starting point is enough to cover your net worth, rounded up to the next million. High earners should also consider future income, which judgments can reach. Each additional million usually costs less than the first.",
      },
    ],
    body: [
      {
        type: "p",
        text: "Your auto and homeowners policies include liability coverage, but those limits cap out — often at $300,000 or $500,000. A serious at-fault car accident, a guest's severe injury, or a dog-bite lawsuit can easily produce judgments beyond that. Everything above your policy limits comes from you: savings, investments, home equity, and even future wages can be garnished.",
      },
      { type: "h2", text: "How an umbrella works" },
      {
        type: "p",
        text: "An umbrella policy sits on top of your auto and home liability. When a covered claim exhausts the underlying limit, the umbrella pays the next $1 million or more. It also covers some claims your base policies don't — like libel, slander, and false-arrest — and pays legal defense costs, often in addition to the limit.",
      },
      { type: "h2", text: "Who should have one" },
      {
        type: "ul",
        items: [
          "Your net worth (home equity + savings + investments) exceeds your auto/home liability limits.",
          "You have teen drivers — statistically your highest liability exposure.",
          "You own a pool, trampoline, boat, dog, or rental property.",
          "You host guests frequently or serve on boards.",
          "You have a high income — future wages can be garnished even if current assets are modest.",
        ],
      },
      {
        type: "callout",
        text: "An umbrella requires minimum underlying limits — commonly 250/500 on auto and $300k on home. We coordinate all three policies so there's no gap between where your base coverage ends and your umbrella begins.",
      },
      {
        type: "p",
        text: "At roughly $150–$400 a year for $1 million in protection, the cost-to-protection ratio is the best in personal insurance. It's not just for the wealthy — anyone with home equity, retirement savings, or a solid income has something a judgment can take.",
      },
    ],
  },
  {
    slug: "business-insurance-for-contractors",
    title: "Business Insurance for Contractors: The Complete Checklist",
    metaTitle: "Business Insurance for Contractors: What You Need (2026)",
    description:
      "GL, workers' comp, commercial auto, tools coverage, and certificates of insurance — the coverage contractors need to win jobs and stay protected. A practical guide.",
    category: "Business",
    readMinutes: 9,
    datePublished: "2026-01-28",
    dateModified: "2026-05-28",
    excerpt:
      "Contractors face a stack of insurance requirements — from GCs, from clients, from the state. Here's what each coverage does and why your contracts will demand most of them.",
    quoteLine: "General Liability Insurance",
    related: [COVERAGE.gl, COVERAGE.wc, COVERAGE.cauto],
    faqs: [
      {
        question: "What insurance do general contractors require from subs?",
        answer:
          "Most GCs require subcontractors to carry general liability (commonly $1M/$2M), workers' compensation, and often commercial auto — and to name the GC as additional insured on a certificate of insurance before work begins.",
      },
      {
        question: "How fast can I get a certificate of insurance?",
        answer:
          "We issue COIs same-day — usually within the hour during business hours — including additional-insured wording when your contract requires it.",
      },
    ],
    body: [
      {
        type: "p",
        text: "For contractors, insurance isn't just protection — it's a prerequisite to getting hired. General contractors, project owners, and licensing boards all require specific coverages before you can pick up a tool on their job. Here's the stack, and what each piece actually does.",
      },
      { type: "h2", text: "General liability — the foundation" },
      {
        type: "p",
        text: "General liability covers third-party bodily injury and property damage your operations cause — a client's floor you damage, a passerby injured at your site. The market standard is $1M per occurrence / $2M aggregate, and nearly every contract requires at least that. Critically, products-and-completed-operations coverage protects you for claims that surface after the job is done.",
      },
      { type: "h2", text: "Workers' compensation — required by law" },
      {
        type: "p",
        text: "Nearly every state requires workers' comp once you hire your first employee, and several construction trades require it even for sole proprietors. Beyond legality, a single serious injury can cost six figures. Watch your class codes and experience modifier (e-mod) — many project owners won't hire contractors with an e-mod above 1.0.",
      },
      {
        type: "callout",
        text: "At your workers' comp audit, any uninsured subcontractor's payroll gets added to YOUR premium. Always collect certificates of insurance from your subs.",
      },
      { type: "h2", text: "Commercial auto and tools" },
      {
        type: "p",
        text: "Personal auto policies exclude most business use — hauling tools to job sites, deliveries. A work truck needs commercial auto, and contracts often require a $1M combined single limit. Your tools and equipment in the truck aren't covered by the auto policy at all; those need an inland marine (contractor's equipment) policy.",
      },
      { type: "h2", text: "Certificates of insurance — your ticket to the job" },
      {
        type: "p",
        text: "A certificate of insurance (COI) is the one-page proof of coverage clients and GCs demand before you start. Getting the additional-insured endorsements right is routine for an agency and a frequent compliance headache for contractors who buy coverage online. We issue COIs same-day with the exact wording your contract requires.",
      },
    ],
  },
  {
    slug: "bundle-home-and-auto-insurance-save",
    title: "Should You Bundle Home and Auto Insurance? When It Saves (and When It Doesn't)",
    metaTitle: "Bundle Home & Auto Insurance: Does It Really Save? (2026)",
    description:
      "Bundling home and auto can save 10–25% — but not always. Here's how multi-policy discounts work and why the best bundle isn't always with a single carrier.",
    category: "Money-Saving",
    readMinutes: 6,
    datePublished: "2026-03-04",
    dateModified: "2026-05-15",
    excerpt:
      "Multi-policy discounts are real and substantial — but 'bundle everything with one company' is marketing, not math. Here's how to actually find your cheapest combination.",
    quoteLine: "Auto Insurance",
    related: [COVERAGE.auto, COVERAGE.home, COVERAGE.renters],
    body: [
      {
        type: "p",
        text: "Bundling — buying your home (or renters) and auto policies from the same carrier — typically unlocks a multi-policy discount of 10–25%. It also simplifies your life: one renewal, one bill, one point of contact. So far, so good. But the captive-carrier pitch of 'bundle everything with us and save' hides an important asterisk.",
      },
      { type: "h2", text: "The catch: one carrier rarely wins every line" },
      {
        type: "p",
        text: "A carrier that's competitively priced on auto may be expensive on home, and vice versa. A 20% bundle discount on an overpriced base rate can still cost more than two separate policies from carriers that each lead their line. The only way to know is to compare both ways — and that comparison is exactly what a captive agent can't do, because they only sell one company.",
      },
      { type: "h2", text: "How we actually find your cheapest combination" },
      {
        type: "ol",
        items: [
          "Quote a bundled package from several carriers that bundle well.",
          "Quote each line separately across all our carriers.",
          "Compare the all-in cost of the best bundle against the best split — including the coverage quality, not just the price.",
          "Recommend whichever combination protects you best for the least money.",
        ],
      },
      {
        type: "callout",
        text: "Renters insurance bundles too. The multi-policy discount on the auto side often offsets most of the renters premium — meaning solid renters coverage can be nearly free in practice.",
      },
    ],
  },
  {
    slug: "understanding-insurance-deductibles",
    title: "Understanding Deductibles: How to Choose the Right One",
    metaTitle: "Insurance Deductibles Explained: How to Choose (2026)",
    description:
      "What a deductible is, how it affects your premium, the difference between flat and percentage deductibles, and a simple rule of thumb for choosing the right amount.",
    category: "Getting Started",
    readMinutes: 5,
    datePublished: "2026-03-19",
    dateModified: "2026-05-08",
    excerpt:
      "A higher deductible lowers your premium but raises your out-of-pocket cost per claim. Here's how to find the balance that fits your finances — and the percentage deductibles that surprise homeowners.",
    related: [COVERAGE.auto, COVERAGE.home],
    faqs: [
      {
        question: "What deductible should I choose?",
        answer:
          "As a rule of thumb, pick the highest deductible you could comfortably pay tomorrow without straining your finances. That maximizes your premium savings while keeping any single claim affordable.",
      },
    ],
    body: [
      {
        type: "p",
        text: "A deductible is the amount you pay out of pocket on a claim before your insurance starts paying. Choose $1,000 instead of $500 and you'll pay less in premium every month — but you'll pay more yourself when you file a claim. Getting this balance right can save you real money without leaving you exposed.",
      },
      { type: "h2", text: "Higher deductible, lower premium — and vice versa" },
      {
        type: "p",
        text: "Raising your deductible shifts risk from the insurer to you, so they charge you less. The trade-off is simple: lower deductible means higher premium but a smaller bill at claim time; higher deductible means lower premium but more out of pocket if something happens.",
      },
      { type: "h2", text: "The percentage deductible that surprises homeowners" },
      {
        type: "callout",
        text: "Many homeowners policies use a percentage deductible (1–10% of the dwelling limit) for wind, hail, hurricane, or wildfire — not a flat dollar amount. On a $500,000 home, a 2% deductible is $10,000. Always check whether your peril-specific deductibles are flat or percentage-based.",
      },
      { type: "h2", text: "A simple rule of thumb" },
      {
        type: "p",
        text: "Pick the highest deductible you could comfortably pay tomorrow. If you have a healthy emergency fund, a higher deductible captures premium savings year after year while keeping any single claim affordable. And remember: filing small claims close to your deductible can raise your rates for years — sometimes paying out of pocket is the smarter move. Call us before you file; we'll help you think it through with no pressure.",
      },
    ],
  },
  {
    slug: "term-vs-whole-life-insurance",
    title: "Term vs. Whole Life Insurance: Which Is Right for You?",
    metaTitle: "Term vs. Whole Life Insurance: How to Choose (2026)",
    description:
      "Term life delivers the most coverage per dollar; whole life adds permanent coverage and cash value. Here's how to decide which fits your family — without the sales pressure.",
    category: "Personal",
    readMinutes: 7,
    datePublished: "2026-04-02",
    dateModified: "2026-05-30",
    excerpt:
      "For most families, term insurance is the right answer — but not for everyone. Here's an honest, commission-neutral breakdown of when each type makes sense.",
    quoteLine: "Life Insurance",
    related: [COVERAGE.life, COVERAGE.umbrella],
    faqs: [
      {
        question: "How much life insurance do I need?",
        answer:
          "A common rule of thumb is 10–12 times your annual income, but a needs-based calculation is better: outstanding debts + mortgage payoff + income-replacement years + future costs like college − existing savings and coverage.",
      },
    ],
    body: [
      {
        type: "p",
        text: "Life insurance answers one question: if you died tomorrow, would the people who depend on you be financially okay? If the answer is no, life insurance is how you fix that — usually for far less than people expect. The first decision is term versus permanent (whole/universal) coverage.",
      },
      { type: "h2", text: "Term life: maximum coverage per dollar" },
      {
        type: "p",
        text: "Term insurance covers a set period — 10, 20, or 30 years — matched to your needs (until the mortgage is gone, until the kids are independent). A healthy 35-year-old can often buy $500,000 of 20-year term for $25–$40 a month. It's pure protection with no cash value, which is exactly why it's inexpensive — and why it's the right answer for most families.",
      },
      { type: "h2", text: "Whole and universal life: permanent coverage" },
      {
        type: "p",
        text: "Permanent policies last your whole life and build cash value, but cost several times more than term for the same death benefit. They make sense for specific lifelong needs: estate planning, a special-needs dependent who'll always require support, business succession, or guaranteed final-expense coverage.",
      },
      {
        type: "callout",
        text: "Be wary of anyone who leads with permanent insurance before understanding your situation. Because we're independent and compare carriers, our recommendation follows your needs — not a commission schedule.",
      },
      { type: "h2", text: "Why shopping carriers matters most for life insurance" },
      {
        type: "p",
        text: "The same person can be quoted dramatically different rates by different companies, because each carrier's underwriting treats health conditions differently. If you have diabetes, anxiety, or a past diagnosis, the carrier you apply to matters enormously. We pre-screen your profile with underwriters across carriers before you ever formally apply.",
      },
    ],
  },
  {
    slug: "workers-compensation-basics",
    title: "Workers' Compensation Basics: What Every Employer Should Know",
    metaTitle: "Workers' Comp Basics for Employers (2026 Guide)",
    description:
      "What workers' comp covers, why it's required, how premiums and your experience modifier work, and the classification mistakes that quietly inflate your costs.",
    category: "Business",
    readMinutes: 8,
    datePublished: "2026-04-16",
    dateModified: "2026-06-02",
    excerpt:
      "Workers' comp is required in nearly every state from your first hire — and getting your class codes and e-mod right can mean the difference between winning and losing bids.",
    quoteLine: "Workers' Compensation Insurance",
    related: [COVERAGE.wc, COVERAGE.gl, COVERAGE.bop],
    faqs: [
      {
        question: "Do I need workers' comp with only one or two employees?",
        answer:
          "In most states, yes — many require it from the first employee, and several construction trades require it even for sole proprietors. We'll confirm your state's exact threshold.",
      },
      {
        question: "How are workers' comp premiums calculated?",
        answer:
          "Premium equals payroll divided by $100, multiplied by a rate set by job classification code, multiplied by your experience modifier. Correct class codes, accurate payroll estimates, and a clean claims history are the three levers that reduce cost.",
      },
    ],
    body: [
      {
        type: "p",
        text: "Workers' compensation covers your employees when they're injured or become ill because of their job: medical treatment, partial lost wages, rehabilitation, and disability benefits. In exchange, it's the 'exclusive remedy' — employees who accept comp benefits generally can't sue you over the injury. That trade protects both sides.",
      },
      { type: "h2", text: "It's required — and penalties are severe" },
      {
        type: "p",
        text: "Nearly every state requires workers' comp once you hire your first employee (thresholds vary), and going without it can mean fines, stop-work orders, personal liability for injury costs, and in some states criminal charges. This isn't optional coverage to skip while you're small.",
      },
      { type: "h2", text: "How premiums work — and where money leaks" },
      {
        type: "p",
        text: "Your premium is payroll times a rate per $100, set by job classification code, adjusted by your experience modifier (e-mod). A clerical employee misclassified as field labor can multiply your cost — auditing class codes is the first thing we do for every workers' comp client.",
      },
      {
        type: "callout",
        text: "Your e-mod compares your claims history to your industry. Below 1.0 earns a discount; above 1.0 is a surcharge — and many project owners won't hire contractors with a mod above 1.0. Safety programs and return-to-work options keep it clean.",
      },
      { type: "h2", text: "What to do when an employee is injured" },
      {
        type: "p",
        text: "Get them medical care immediately, then report the claim promptly — late reporting is the single biggest driver of claim-cost inflation. A simple injury-response procedure and light-duty return-to-work options keep claims small and your e-mod low.",
      },
    ],
  },
  {
    slug: "do-i-need-renters-insurance",
    title: "Do I Need Renters Insurance? (Yes — Here's Why It's Worth It)",
    metaTitle: "Do I Need Renters Insurance? What It Covers & Costs (2026)",
    description:
      "Your landlord's policy covers the building, not your belongings or your liability. Renters insurance costs $12–$25/month and is one of the best values in insurance.",
    category: "Personal",
    readMinutes: 5,
    datePublished: "2026-05-06",
    dateModified: "2026-06-04",
    excerpt:
      "A common, costly myth: your landlord's insurance protects you. It doesn't. For about the price of a streaming subscription, renters insurance protects your stuff and your liability.",
    quoteLine: "Renters Insurance",
    related: [COVERAGE.renters, COVERAGE.auto, COVERAGE.umbrella],
    body: [
      {
        type: "p",
        text: "Here's a misconception that costs renters dearly: 'my landlord's insurance covers me.' It doesn't. The landlord's policy covers the building structure. If a fire, burst pipe, or break-in damages or destroys your belongings, you're entirely on your own without a renters policy.",
      },
      { type: "h2", text: "What renters insurance actually covers" },
      {
        type: "ul",
        items: [
          "Your belongings — furniture, electronics, clothing — against fire, theft, vandalism, and water damage from burst pipes.",
          "Your property even away from home: items stolen from your car or while traveling.",
          "Liability if a guest is injured in your unit, or you accidentally damage the building (e.g., a kitchen fire).",
          "Hotel and living expenses if a covered loss makes your apartment uninhabitable.",
        ],
      },
      { type: "h2", text: "One of the best values in insurance" },
      {
        type: "p",
        text: "Renters insurance typically costs $12–$25 a month for tens of thousands of dollars in coverage. The liability protection alone — which can cover a six-figure injury claim — is worth more than decades of premiums. Many landlords now require it, and bundling it with auto often makes it nearly free after the multi-policy discount.",
      },
      {
        type: "callout",
        text: "Choose replacement-cost (not actual-cash-value) settlement so depreciation doesn't gut your claim payout, and schedule any high-value items like jewelry or a premium bike for full coverage.",
      },
    ],
  },
  {
    slug: "cyber-insurance-for-small-business",
    title: "Cyber Insurance for Small Business: Why You're a Target",
    metaTitle: "Cyber Insurance for Small Business: Do You Need It? (2026)",
    description:
      "Small businesses are now the primary target for cybercrime. Here's what cyber insurance covers, what it costs, and the security controls that lower your premium.",
    category: "Business",
    readMinutes: 7,
    datePublished: "2026-05-22",
    dateModified: "2026-06-06",
    excerpt:
      "One phishing email can cost a small business six figures. Cyber insurance pays the bill — and just as importantly, hands you a breach-response team the moment something goes wrong.",
    quoteLine: "Cyber Liability Insurance",
    related: [COVERAGE.cyber, COVERAGE.eo, COVERAGE.bop],
    faqs: [
      {
        question: "Would hackers really target a small business?",
        answer:
          "Small businesses are now the majority of cyber-attack victims because attackers automate at scale and small firms have weaker defenses. Most incidents aren't even targeted — phishing kits and bots don't care about your size.",
      },
      {
        question: "What does cyber insurance cost?",
        answer:
          "For most small businesses, $1M of coverage runs roughly $500–$2,500 a year depending on industry, revenue, and security posture. Controls like multi-factor authentication and backups can meaningfully lower the premium.",
      },
    ],
    body: [
      {
        type: "p",
        text: "Cybercrime has shifted decisively toward small and mid-size businesses — precisely because they have weaker defenses and no response plan. Ransomware, phishing-driven funds-transfer fraud, and stolen customer data routinely cost small businesses six figures between forensics, notification laws, system restoration, lost income, and liability. Many never recover.",
      },
      { type: "h2", text: "What cyber insurance covers" },
      {
        type: "ul",
        items: [
          "Breach response: forensics, privacy attorney, customer notification, credit monitoring, PR.",
          "Ransomware and cyber extortion: negotiation, lawful payments, and system restoration.",
          "Funds-transfer fraud / social engineering: wire payments your team is tricked into sending — the #1 small-business cyber loss.",
          "Business interruption: income lost while systems are down.",
          "Third-party liability: lawsuits from customers whose data was exposed, plus insurable regulatory fines.",
        ],
      },
      { type: "h2", text: "You're buying a response team, not just a check" },
      {
        type: "callout",
        text: "When you get hit, you call the carrier's 24/7 breach hotline and a team takes over within hours: forensics, a privacy attorney, ransomware negotiators, and restoration specialists. In the moment, the team matters even more than the coverage.",
      },
      { type: "h2", text: "Controls that lower your premium" },
      {
        type: "p",
        text: "Carriers now price heavily on security posture. Multi-factor authentication, reliable backups, and email security can cut your premium meaningfully — and we'll tell you which controls move the price before you apply. Answer the application honestly: carriers have denied claims where applicants attested to controls (like MFA) they didn't actually have.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export const ARTICLE_CATEGORIES = [
  "Personal",
  "Business",
  "Money-Saving",
  "Getting Started",
] as const;
