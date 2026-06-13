export type CoverageComponent = {
  name: string;
  description: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type CoverageLine = {
  slug: string;
  category: "personal" | "business";
  name: string;
  shortName: string;
  icon: string; // lucide icon key, mapped in components
  tagline: string;
  summary: string;
  intro: string[];
  whatItCovers: string[];
  whatItDoesNotCover: string[];
  components: CoverageComponent[];
  whenYouNeedIt: string[];
  faqs: Faq[];
};

export const PERSONAL_LINES: CoverageLine[] = [
  {
    slug: "auto",
    category: "personal",
    name: "Auto Insurance",
    shortName: "Auto",
    icon: "car",
    tagline: "Protection for every mile, priced by carriers competing for your business.",
    summary:
      "Liability, collision, and comprehensive coverage for your vehicles — quoted across multiple carriers so you never overpay for the protection you need.",
    intro: [
      "Auto insurance protects you financially when your vehicle is involved in an accident, stolen, or damaged. Nearly every state requires drivers to carry minimum liability coverage, but the legally required minimums are rarely enough to protect your savings if you cause a serious accident.",
      "As an independent agency, we quote your auto policy with multiple carriers at once. Rates for the exact same driver can vary by hundreds of dollars per year between companies — the only way to know you're getting a fair price is to compare, and that's what we do on every policy, every renewal.",
    ],
    whatItCovers: [
      "Bodily injury you cause to other people in an at-fault accident",
      "Damage you cause to other people's vehicles and property",
      "Repairs to your own vehicle after a collision, regardless of fault",
      "Theft, vandalism, fire, hail, flood, and animal strikes (comprehensive)",
      "Your medical bills and lost wages after an accident with an uninsured driver",
      "Towing, roadside assistance, and rental car reimbursement (optional add-ons)",
    ],
    whatItDoesNotCover: [
      "Intentional damage or racing-related losses",
      "Normal wear and tear or mechanical breakdown",
      "Personal belongings stolen from the vehicle (covered by home/renters instead)",
      "Business use of a personal vehicle, such as delivery driving, unless endorsed",
    ],
    components: [
      {
        name: "Bodily Injury Liability",
        description:
          "Pays medical bills, lost income, and legal costs when you injure someone else in an at-fault accident. This is the coverage that protects your savings and future wages from a lawsuit — we typically recommend limits well above state minimums.",
      },
      {
        name: "Property Damage Liability",
        description:
          "Pays for damage you cause to other vehicles, fences, buildings, and other property. With the average new car now costing over $45,000, low limits can leave you personally exposed in a multi-car accident.",
      },
      {
        name: "Collision",
        description:
          "Repairs or replaces your own vehicle after a crash with another vehicle or object, regardless of who was at fault, minus your deductible.",
      },
      {
        name: "Comprehensive",
        description:
          "Covers non-collision losses: theft, vandalism, glass breakage, fire, falling objects, hail, flood, and collisions with animals.",
      },
      {
        name: "Uninsured / Underinsured Motorist",
        description:
          "Steps in when the at-fault driver has no insurance or not enough. Roughly one in seven drivers on the road is uninsured — this coverage protects you and your passengers from someone else's bad decision.",
      },
      {
        name: "Medical Payments / PIP",
        description:
          "Pays medical expenses for you and your passengers after an accident, regardless of fault. Required in some states, optional but valuable in others.",
      },
    ],
    whenYouNeedIt: [
      "You own or lease any vehicle — liability coverage is required by law in nearly every state",
      "You have a loan or lease — lenders require collision and comprehensive",
      "You have savings, a home, or future income worth protecting from an at-fault lawsuit",
      "You drive for rideshare or delivery — your personal policy likely excludes it without an endorsement",
      "Your teenager is getting licensed — we can compare carriers to soften the rate impact",
    ],
    faqs: [
      {
        question: "How much auto insurance do I actually need?",
        answer:
          "State minimums (often 25/50/25 or lower) are rarely enough. If you cause an accident with serious injuries, anything beyond your limits comes out of your pocket. For most households we recommend at least 100/300/100 in liability limits, and adding an umbrella policy if you have meaningful assets. We'll walk you through what makes sense for your situation.",
      },
      {
        question: "Will shopping my policy with multiple carriers hurt my credit?",
        answer:
          "No. Insurance quotes use a 'soft pull' that doesn't affect your credit score, no matter how many carriers we quote.",
      },
      {
        question: "What deductible should I choose?",
        answer:
          "A higher deductible ($1,000 vs. $500) lowers your premium but means more out of pocket per claim. The right choice depends on your emergency fund and your vehicle's value. As a rule of thumb, pick the highest deductible you could comfortably pay tomorrow.",
      },
      {
        question: "Does my personal auto policy cover rideshare or delivery driving?",
        answer:
          "Usually not. Most personal policies exclude losses while you're logged into a rideshare or delivery app. If you drive for Uber, Lyft, DoorDash, or similar, tell us — several of our carriers offer affordable rideshare endorsements that close the gap.",
      },
      {
        question: "Why did my rate go up even though I haven't had a claim?",
        answer:
          "Carriers adjust rates for entire regions based on repair costs, medical inflation, weather losses, and litigation trends. This is exactly where an independent agent earns their keep: when your carrier raises rates, we re-shop the market for you instead of you starting over from scratch.",
      },
    ],
  },
  {
    slug: "homeowners",
    category: "personal",
    name: "Homeowners Insurance",
    shortName: "Homeowners",
    icon: "home",
    tagline: "Your largest asset deserves more than a one-size-fits-all policy.",
    summary:
      "Coverage for your home's structure, your belongings, and your liability — built around your home's real replacement cost, not a guess.",
    intro: [
      "For most families, the home is the single largest asset they'll ever own — and homeowners insurance is the financial backstop that makes recovering from a fire, storm, or lawsuit possible. A good policy rebuilds your house, replaces what's inside it, pays for somewhere to live in the meantime, and defends you if someone is injured on your property.",
      "The most common — and most expensive — mistake in homeowners insurance is being underinsured on dwelling coverage. Construction costs have risen sharply, and a policy that hasn't been reviewed in years may not cover the actual cost to rebuild. We calculate replacement cost properly and compare quotes from multiple carriers to find the right structure at the right price.",
    ],
    whatItCovers: [
      "Rebuilding or repairing your home after fire, wind, hail, lightning, and other covered perils",
      "Detached structures: garages, fences, sheds, and pools",
      "Personal belongings — furniture, electronics, clothing — at home and worldwide",
      "Additional living expenses (hotel, rent, meals) while your home is uninhabitable",
      "Personal liability if someone is injured on your property or you damage someone else's property",
      "Medical payments for guests injured at your home, regardless of fault",
    ],
    whatItDoesNotCover: [
      "Flood damage — requires a separate flood policy (we can quote it)",
      "Earthquake damage — requires a separate policy or endorsement",
      "Gradual problems: wear and tear, mold from long-term leaks, pest damage",
      "High-value items above sublimits (jewelry, art, collectibles) without scheduling them",
    ],
    components: [
      {
        name: "Dwelling (Coverage A)",
        description:
          "Pays to rebuild your home's structure at today's construction costs. This number should be based on replacement cost — what it costs to rebuild — not your market value or mortgage balance. We recommend extended or guaranteed replacement cost endorsements where available.",
      },
      {
        name: "Other Structures (Coverage B)",
        description:
          "Covers detached garages, fences, sheds, and similar structures, typically at 10% of your dwelling limit.",
      },
      {
        name: "Personal Property (Coverage C)",
        description:
          "Replaces your belongings after a covered loss, typically 50–70% of the dwelling limit. Ask for replacement-cost (not actual-cash-value) settlement so depreciation doesn't gut your claim payment.",
      },
      {
        name: "Loss of Use (Coverage D)",
        description:
          "Pays additional living expenses — hotel, temporary rent, increased food costs — while your home is being repaired after a covered loss.",
      },
      {
        name: "Personal Liability (Coverage E)",
        description:
          "Protects you if someone sues you for injury or property damage — a guest's fall, a dog bite, your child's errant baseball. Includes legal defense costs. We typically recommend $300,000–$500,000, paired with an umbrella for larger asset bases.",
      },
      {
        name: "Medical Payments (Coverage F)",
        description:
          "Pays smaller medical bills for guests injured on your property without anyone needing to prove fault — often the difference between a quick resolution and a lawsuit.",
      },
    ],
    whenYouNeedIt: [
      "You own a home — mortgage lenders require it, and going without it puts everything at risk",
      "You've renovated, added square footage, or finished a basement since your last policy review",
      "Construction costs in your area have risen since your dwelling limit was last calculated",
      "You own a dog, a pool, or a trampoline — liability exposures worth reviewing",
      "You run a small business or daycare from home (needs an endorsement or separate policy)",
    ],
    faqs: [
      {
        question: "How much dwelling coverage do I need?",
        answer:
          "Enough to completely rebuild your home at current construction costs — which is different from your home's market value or purchase price. We run a replacement-cost estimate using your home's square footage, construction type, and local building costs, and we review it at every renewal so rising costs don't quietly leave you underinsured.",
      },
      {
        question: "Is flood damage covered?",
        answer:
          "No — standard homeowners policies exclude flood, and over 20% of flood claims come from properties outside high-risk zones. We can quote flood coverage through the NFIP or private flood markets, often for less than homeowners expect.",
      },
      {
        question: "What's the difference between replacement cost and actual cash value?",
        answer:
          "Replacement cost pays what it costs to buy a new equivalent item today. Actual cash value subtracts depreciation — so a 7-year-old roof or TV gets paid out at a fraction of its replacement price. We quote replacement-cost coverage wherever possible; the premium difference is usually small relative to the claim-time difference.",
      },
      {
        question: "Will filing a small claim raise my rates?",
        answer:
          "It can — claims history follows you between carriers for several years. For losses close to your deductible, paying out of pocket often makes financial sense. Call us before you file; we'll help you think it through with no pressure either way.",
      },
      {
        question: "Are my jewelry and collectibles fully covered?",
        answer:
          "Only up to small sublimits — often $1,500 for jewelry theft. Engagement rings, watches, art, instruments, and collections should be 'scheduled' (individually listed) for full value, which also typically removes the deductible and adds coverage for accidental loss.",
      },
    ],
  },
  {
    slug: "renters",
    category: "personal",
    name: "Renters Insurance",
    shortName: "Renters",
    icon: "key",
    tagline: "Your landlord's policy covers the building. It covers nothing of yours.",
    summary:
      "Affordable protection for your belongings and your liability — most renters policies cost less per month than a streaming subscription.",
    intro: [
      "A common and costly misconception: your landlord's insurance protects you. It doesn't. The landlord's policy covers the building — if a fire, burst pipe, or break-in damages or destroys your belongings, you're on your own without a renters policy.",
      "Renters insurance is one of the best values in all of insurance. For roughly $12–$25 a month, you get tens of thousands of dollars in coverage for your belongings, liability protection if someone is injured in your unit, and money for a hotel if your apartment becomes unlivable. Many landlords now require it — and bundling it with your auto policy often costs almost nothing after the multi-policy discount.",
    ],
    whatItCovers: [
      "Your belongings — furniture, electronics, clothing, kitchenware — against fire, theft, vandalism, and water damage from burst pipes",
      "Your property even outside your home: items stolen from your car or while traveling",
      "Liability if a guest is injured in your unit or you accidentally damage the building (e.g., a kitchen fire)",
      "Hotel and living expenses if a covered loss makes your apartment uninhabitable",
      "Medical payments for guests injured in your home",
    ],
    whatItDoesNotCover: [
      "The building itself — that's your landlord's policy",
      "Your roommate's belongings (each tenant needs their own policy)",
      "Flood and earthquake damage without separate coverage",
      "High-value jewelry, art, or equipment above sublimits unless scheduled",
    ],
    components: [
      {
        name: "Personal Property",
        description:
          "The core of the policy. Walk through your home mentally — replacing every piece of clothing, furniture, and electronics adds up fast. Most renters need $20,000–$50,000. Choose replacement-cost settlement so depreciation doesn't reduce your payout.",
      },
      {
        name: "Personal Liability",
        description:
          "Protects you if someone is injured in your unit or if you cause damage to others — including accidentally burning or flooding your own building, which your landlord's insurer can pursue you for. Standard limits run $100,000–$300,000.",
      },
      {
        name: "Loss of Use",
        description:
          "Pays for a hotel, temporary rental, and increased living costs if a covered loss forces you out of your apartment while it's repaired.",
      },
      {
        name: "Medical Payments to Others",
        description:
          "Covers smaller injuries to guests without a liability claim or lawsuit — usually $1,000–$5,000.",
      },
    ],
    whenYouNeedIt: [
      "You rent an apartment, house, condo, or room — even with few belongings, the liability protection alone is worth it",
      "Your lease requires proof of renters insurance (increasingly common)",
      "You own a laptop, phone, TV, bicycle, or any combination worth more than a few hundred dollars",
      "You have guests over — a single injury claim can cost more than decades of premiums",
      "You're a student living off campus (on-campus students may have coverage under their parents' homeowners policy — ask us)",
    ],
    faqs: [
      {
        question: "How much does renters insurance cost?",
        answer:
          "Typically $12–$25 per month depending on location, coverage amount, and deductible. Bundled with an auto policy, the multi-policy discount on the auto side often offsets most of the renters premium.",
      },
      {
        question: "Doesn't my landlord's insurance cover my stuff?",
        answer:
          "No. The landlord's policy covers the building structure only. If the building burns down, the landlord's insurer rebuilds the walls — replacing everything you own inside them is entirely on you without a renters policy.",
      },
      {
        question: "Do my roommate and I share one policy?",
        answer:
          "Generally each roommate should carry their own policy. Some carriers allow unrelated roommates on one policy, but it creates complications with claims and liability. Individual policies are inexpensive and far cleaner.",
      },
      {
        question: "Is my bike covered if it's stolen away from home?",
        answer:
          "Yes — renters insurance covers your personal property worldwide, including theft from your car, your office, or while traveling. High-value bikes may need to be scheduled for full coverage.",
      },
    ],
  },
  {
    slug: "umbrella",
    category: "personal",
    name: "Umbrella Insurance",
    shortName: "Umbrella",
    icon: "umbrella",
    tagline: "An extra million dollars of protection for about a dollar a day.",
    summary:
      "Personal liability coverage that sits on top of your auto and home policies — protecting your savings, your home equity, and your future income from a catastrophic lawsuit.",
    intro: [
      "Your auto and homeowners policies include liability coverage, but those limits cap out — often at $300,000 or $500,000. A serious at-fault car accident, a guest's severe injury, or a dog-bite lawsuit can easily produce judgments beyond that. Everything above your policy limits comes from you: savings, investments, home equity, and even future wages can be garnished.",
      "An umbrella policy adds $1 million or more in liability protection above your underlying policies, and it's remarkably inexpensive — typically $150–$400 per year for the first million. It also covers some claims your base policies don't, like libel, slander, and false-arrest claims. If you have assets to protect or income worth defending, an umbrella is among the highest-value coverage decisions you can make.",
    ],
    whatItCovers: [
      "Liability judgments and settlements above your auto, home, or boat policy limits",
      "Legal defense costs — often paid in addition to the policy limit",
      "Personal injury claims: libel, slander, defamation, false arrest, invasion of privacy",
      "Liability from incidents worldwide, not just at home",
      "Claims against household members, including teen drivers",
    ],
    whatItDoesNotCover: [
      "Your own injuries or property damage (that's what your auto and home coverage are for)",
      "Business liability — that requires commercial coverage",
      "Intentional or criminal acts",
      "Contracts you've agreed to or professional services you provide",
    ],
    components: [
      {
        name: "Excess Liability",
        description:
          "The core function: when a covered claim exhausts your auto or home liability limit, the umbrella pays the next $1M–$5M+. Without it, the gap between your policy limit and a judgment is your personal responsibility.",
      },
      {
        name: "Broader Coverage (Drop-Down)",
        description:
          "Umbrellas cover certain claims your underlying policies exclude — like personal injury offenses (libel, slander) — subject to a self-insured retention rather than an underlying limit.",
      },
      {
        name: "Defense Costs",
        description:
          "Lawsuits are expensive to defend even when you win. Umbrella policies pay attorney fees and court costs for covered claims, typically in addition to the liability limit.",
      },
      {
        name: "Worldwide Territory",
        description:
          "Coverage follows you globally — an accident while driving a rental car abroad or an incident on vacation is covered the same as one at home.",
      },
    ],
    whenYouNeedIt: [
      "Your net worth (home equity + savings + investments) exceeds your auto/home liability limits",
      "You have teen drivers — statistically your highest liability exposure",
      "You own a pool, trampoline, boat, dog, or rental property",
      "You host guests frequently or volunteer on boards",
      "You have a high income — future wages can be garnished even if current assets are modest",
    ],
    faqs: [
      {
        question: "How much umbrella coverage should I buy?",
        answer:
          "A common starting point is enough to cover your net worth, rounded up to the next million. High earners should also consider future income, which judgments can reach. Each additional million typically costs less than the first — going from $1M to $2M often adds only $75–$100 a year.",
      },
      {
        question: "What does an umbrella policy require of my other policies?",
        answer:
          "Carriers require minimum underlying liability limits — commonly 250/500 on auto and $300,000 on home. We coordinate all three policies so there's no gap between where your base coverage ends and your umbrella begins.",
      },
      {
        question: "Is umbrella insurance only for wealthy people?",
        answer:
          "No. Anyone with home equity, retirement savings, or a solid income has something a judgment can take. At roughly $150–$400 a year for $1 million in protection, the cost-to-protection ratio is the best in personal insurance.",
      },
      {
        question: "Does an umbrella cover my rental property?",
        answer:
          "It can — most carriers will extend umbrella coverage over landlord (dwelling fire) policies for one to several rental units. Tell us about every property you own so we can structure it correctly.",
      },
    ],
  },
  {
    slug: "life",
    category: "personal",
    name: "Life Insurance",
    shortName: "Life",
    icon: "heart",
    tagline: "If someone depends on your income, this is the policy that keeps their life on track.",
    summary:
      "Term and permanent life insurance from multiple highly rated carriers — sized to replace your income, pay off the mortgage, and fund your family's future.",
    intro: [
      "Life insurance answers one question: if you died tomorrow, would the people who depend on you be financially okay? If the answer is no — a spouse who'd struggle with the mortgage, kids with college ahead, a co-signed loan, a business partner — life insurance is how you fix that, usually for far less than people expect.",
      "A healthy 35-year-old can often buy $500,000 of 20-year term coverage for $25–$40 a month. Because we're independent, we compare term and permanent options across multiple carriers, including how each carrier's underwriting treats your specific health profile — the same person can be quoted dramatically different rates by different companies.",
    ],
    whatItCovers: [
      "A tax-free lump sum (the death benefit) paid to your beneficiaries when you die",
      "Income replacement so your family can maintain their standard of living",
      "Mortgage payoff and elimination of co-signed debts",
      "Future expenses: college tuition, childcare, retirement contributions for a surviving spouse",
      "Final expenses and estate settlement costs",
      "Business needs: key-person protection and buy-sell agreement funding",
    ],
    whatItDoesNotCover: [
      "Death by suicide within the first two policy years (standard exclusion period)",
      "Material misrepresentation on the application (always answer honestly — we'll find the right carrier for your history)",
      "Term policies pay nothing if you outlive the term — that's by design and why term is inexpensive",
    ],
    components: [
      {
        name: "Term Life",
        description:
          "Pure protection for a set period — 10, 20, or 30 years — matched to your needs (until the mortgage is gone, until the kids are independent). It delivers the most coverage per dollar and is the right answer for most families.",
      },
      {
        name: "Whole Life",
        description:
          "Permanent coverage with level premiums and guaranteed cash value growth. More expensive than term, but appropriate for lifelong needs: estate planning, special-needs dependents, or guaranteed final-expense coverage.",
      },
      {
        name: "Universal Life",
        description:
          "Permanent coverage with flexible premiums and death benefits. Indexed and guaranteed variants suit different goals — we'll explain the trade-offs in plain English before you commit to anything.",
      },
      {
        name: "Riders",
        description:
          "Policy add-ons that expand protection: accelerated death benefit (access funds if terminally ill), waiver of premium on disability, child term riders, and conversion options that let you change term to permanent without new medical underwriting.",
      },
    ],
    whenYouNeedIt: [
      "You have a spouse, children, or aging parents who rely on your income",
      "You have a mortgage or co-signed debt someone else would inherit responsibility for",
      "You're a stay-at-home parent — replacing childcare and household management has real cost",
      "You own a business with partners, debt, or key employees",
      "You're young and healthy — locking in low rates now protects your future insurability",
    ],
    faqs: [
      {
        question: "How much life insurance do I need?",
        answer:
          "A common rule of thumb is 10–12 times your annual income, but the better approach is needs-based: outstanding debts + mortgage payoff + income replacement years + college costs − existing savings and coverage. We'll run that calculation with you in about ten minutes.",
      },
      {
        question: "Term or whole life — which should I buy?",
        answer:
          "For most families, term insurance is the right answer: it covers the years your family depends on your income at the lowest cost. Permanent insurance makes sense for specific lifelong needs — estate planning, special-needs dependents, business succession. Be wary of anyone who leads with permanent insurance before understanding your situation.",
      },
      {
        question: "Do I need a medical exam?",
        answer:
          "Not always. Many carriers now offer accelerated underwriting — no needles, no exam — for qualified applicants up to $1M–$3M in coverage, with decisions in days instead of weeks. We'll match you to carriers whose underwriting style fits your profile.",
      },
      {
        question: "Isn't the life insurance through my job enough?",
        answer:
          "Group coverage is a nice benefit but usually caps at 1–2x salary — well short of most families' needs — and it typically ends when you leave the job. A personally owned policy stays with you regardless of employer, locked in at rates based on your age and health today.",
      },
      {
        question: "I have a health condition. Can I still get coverage?",
        answer:
          "Almost certainly — the question is price, and that's where independent shopping matters most. Carriers treat conditions like diabetes, anxiety, or a past cancer diagnosis very differently. We pre-screen your profile with underwriters across carriers before you ever formally apply.",
      },
    ],
  },
];

export const BUSINESS_LINES: CoverageLine[] = [
  {
    slug: "general-liability",
    category: "business",
    name: "General Liability Insurance",
    shortName: "General Liability",
    icon: "shield",
    tagline: "The foundation of business protection — and the policy your contracts will demand.",
    summary:
      "Covers third-party bodily injury, property damage, and advertising injury claims — the baseline coverage nearly every business contract and commercial lease requires.",
    intro: [
      "General liability (GL) is the foundational commercial policy: it protects your business when a third party — a customer, vendor, or member of the public — claims your operations injured them or damaged their property. A customer slips in your store, your crew damages a client's floor, a product you sold causes harm: GL pays the defense costs, settlements, and judgments.",
      "Even careful businesses get sued, and defense costs alone can run tens of thousands of dollars before any verdict. Beyond protection, GL is a business enabler: landlords, general contractors, and enterprise clients routinely require a certificate of insurance with specific limits before they'll sign with you. We issue certificates same-day and structure limits to match your contract requirements.",
    ],
    whatItCovers: [
      "Third-party bodily injury — a customer slip-and-fall at your premises or job site",
      "Third-party property damage caused by your operations or completed work",
      "Products liability — harm caused by products you make, sell, or distribute",
      "Personal and advertising injury — libel, slander, and copyright infringement in your advertising",
      "Legal defense costs for covered claims, even groundless ones",
      "Medical payments for minor third-party injuries, regardless of fault",
    ],
    whatItDoesNotCover: [
      "Injuries to your own employees (that's workers' compensation)",
      "Damage to your own property (commercial property coverage)",
      "Professional mistakes and bad advice (professional liability / E&O)",
      "Auto accidents (commercial auto)",
      "Data breaches and cyber incidents (cyber liability)",
    ],
    components: [
      {
        name: "Each-Occurrence Limit",
        description:
          "The maximum paid for any single claim — commonly $1 million. Contracts you sign will usually specify the minimum occurrence limit you must carry.",
      },
      {
        name: "General Aggregate Limit",
        description:
          "The maximum paid across all claims in a policy year — commonly $2 million. Once exhausted, you're uninsured for the remainder of the term unless you carry excess coverage.",
      },
      {
        name: "Products & Completed Operations",
        description:
          "Covers claims arising after your work is done or your product is sold — critical for contractors and manufacturers, since many claims surface months or years after the job.",
      },
      {
        name: "Damage to Premises Rented to You",
        description:
          "Covers fire and certain damage to space you lease — the coverage your landlord's lease almost certainly requires.",
      },
      {
        name: "Additional Insured Endorsements",
        description:
          "Extends your coverage to clients, landlords, or GCs as contracts require. Getting these endorsements right is routine for us and a frequent source of contract compliance problems for businesses who buy online.",
      },
    ],
    whenYouNeedIt: [
      "You interact with customers, visitors, or the public anywhere — your premises or theirs",
      "You're signing a commercial lease (landlords require GL with specific limits)",
      "You're bidding on contracts that require a certificate of insurance",
      "You make, sell, or distribute physical products",
      "You perform work at client locations — trades, services, installations",
    ],
    faqs: [
      {
        question: "How much general liability coverage do I need?",
        answer:
          "The market standard is $1M per occurrence / $2M aggregate, and most contracts require at least that. Higher-risk operations or larger contracts may require $5M+, usually structured as $1M GL plus a commercial umbrella. We'll align your limits with the contracts you actually sign.",
      },
      {
        question: "What does general liability cost?",
        answer:
          "It varies widely with industry, revenue, and payroll — an office-based consultant might pay $400–$900 a year, while a contractor might pay several thousand. Because we quote multiple carriers, you see the realistic range for your specific operation, not a generic average.",
      },
      {
        question: "What's a certificate of insurance and how fast can I get one?",
        answer:
          "A COI is the one-page proof of coverage that clients, landlords, and GCs request. We issue them same-day — usually within the hour during business hours — including additional-insured wording when your contract requires it.",
      },
      {
        question: "Does GL cover my work itself if I make a mistake?",
        answer:
          "GL covers damage your work causes to other property or people — not the cost of redoing faulty work itself, and not financial harm from professional errors. If clients could lose money from your advice or services, you also need professional liability (E&O). Many businesses need both.",
      },
    ],
  },
  {
    slug: "bop",
    category: "business",
    name: "Business Owners Policy (BOP)",
    shortName: "BOP",
    icon: "briefcase",
    tagline: "Liability + property + lost income, bundled at a better price than buying separately.",
    summary:
      "Combines general liability, commercial property, and business interruption coverage into one streamlined policy — the standard starting point for small and mid-size businesses.",
    intro: [
      "A Business Owners Policy bundles the coverages most small businesses need — general liability, commercial property, and business interruption — into a single policy that typically costs 10–30% less than buying each coverage separately. It's the workhorse policy for retail shops, offices, restaurants, contractors, and professional practices.",
      "The often-overlooked gem inside a BOP is business interruption coverage: if a fire or covered disaster shuts you down, it replaces your lost income and pays ongoing expenses — rent, payroll, loan payments — while you rebuild. For many small businesses, the income loss from downtime is more dangerous than the property damage itself.",
    ],
    whatItCovers: [
      "Everything general liability covers: third-party injury, property damage, advertising injury",
      "Your building (if owned) and business personal property — equipment, inventory, furniture, tenant improvements",
      "Lost income and ongoing expenses while you're shut down by a covered loss (business interruption)",
      "Extra expenses to keep operating — temporary location, equipment rental, expediting costs",
      "Common add-ons: hired/non-owned auto, employee dishonesty, equipment breakdown, spoilage, and basic cyber",
    ],
    whatItDoesNotCover: [
      "Workers' compensation (required separately in nearly every state)",
      "Professional liability / E&O",
      "Owned business vehicles (commercial auto)",
      "Flood and earthquake without separate policies",
      "Larger or higher-risk businesses may exceed BOP eligibility and need a commercial package policy instead",
    ],
    components: [
      {
        name: "General Liability",
        description:
          "The same third-party injury and property-damage protection as a standalone GL policy, typically at $1M/$2M limits, with certificates and additional-insured endorsements available.",
      },
      {
        name: "Commercial Property",
        description:
          "Covers your building (if owned), leasehold improvements, equipment, inventory, and furniture against fire, theft, vandalism, and wind. Insure at replacement cost and update limits as you grow.",
      },
      {
        name: "Business Interruption",
        description:
          "Replaces net income and pays continuing expenses during a covered shutdown. Pay attention to the restoration period and whether the limit reflects your actual monthly revenue — we model this with you.",
      },
      {
        name: "Equipment Breakdown",
        description:
          "Covers sudden mechanical or electrical failure of HVAC, refrigeration, computers, and production equipment — losses standard property coverage excludes.",
      },
      {
        name: "Optional Endorsements",
        description:
          "Hired and non-owned auto (employees running errands in personal cars), employee dishonesty, outdoor signs, spoilage for food businesses, and entry-level cyber liability.",
      },
    ],
    whenYouNeedIt: [
      "You run a small-to-mid-size business with a physical location, equipment, or inventory",
      "You lease commercial space — your lease requires liability and often property coverage",
      "Your business couldn't survive 3–6 months of lost income after a fire or disaster",
      "You currently carry GL only — you're likely one covered property loss away from a major gap",
      "You want one policy, one renewal, and one premium instead of three",
    ],
    faqs: [
      {
        question: "What's the difference between a BOP and general liability?",
        answer:
          "GL covers harm to third parties only. A BOP includes GL and adds coverage for your own property and your lost income if a covered event shuts you down. If you have any equipment, inventory, or premises — or revenue you can't afford to lose — a BOP almost always makes more sense, often for only a few hundred dollars more per year.",
      },
      {
        question: "How much does a BOP cost?",
        answer:
          "Most small businesses pay $600–$3,500 per year depending on industry, revenue, location, and property values. Bundling typically saves 10–30% versus separate policies, and we compare BOP quotes across multiple carriers to find the right structure at the best price.",
      },
      {
        question: "Does a BOP cover my business if I work from home?",
        answer:
          "Home-based businesses often assume homeowners insurance covers them — it generally doesn't beyond trivial limits, and business activity can even jeopardize homeowners claims. A BOP (or an in-home business endorsement, depending on scale) closes that gap.",
      },
      {
        question: "Is my business eligible for a BOP?",
        answer:
          "BOPs are designed for low-to-moderate risk businesses, generally under carrier thresholds for revenue, square footage, and class of business. If you've outgrown BOP eligibility, we'll build a commercial package policy with the same coverages tailored to your operation — that's a sign of growth, not a problem.",
      },
    ],
  },
  {
    slug: "workers-comp",
    category: "business",
    name: "Workers' Compensation Insurance",
    shortName: "Workers' Comp",
    icon: "hardhat",
    tagline: "Required by law in nearly every state — and your shield against employee injury lawsuits.",
    summary:
      "Pays medical care and lost wages for work-related injuries, protects you from employee lawsuits, and keeps you compliant with state law.",
    intro: [
      "Workers' compensation covers your employees when they're injured or become ill because of their job: medical treatment, a portion of lost wages, rehabilitation, and disability benefits. In exchange, it serves as the 'exclusive remedy' — employees who accept workers' comp benefits generally cannot sue you over the injury. That trade protects both sides.",
      "Nearly every state requires workers' comp once you hire your first employee (thresholds vary), and penalties for going without it are severe — fines, stop-work orders, personal liability for injury costs, and in some states criminal charges. Premiums are based on payroll and job classification codes, which means misclassified employees quietly inflate your premium. Reviewing class codes is one of the first things we do for every workers' comp client.",
    ],
    whatItCovers: [
      "Medical treatment for work-related injuries and illnesses — no deductible or copay for the employee",
      "Partial wage replacement (typically about two-thirds) while an injured employee can't work",
      "Rehabilitation, physical therapy, and retraining when needed",
      "Permanent disability benefits for lasting impairments",
      "Death benefits and funeral costs for fatal workplace accidents",
      "Employer's liability — defense against injury-related suits that fall outside the comp system",
    ],
    whatItDoesNotCover: [
      "Injuries from intoxication, fights the employee started, or off-duty activities",
      "Independent contractors (but misclassification is heavily audited — see FAQs)",
      "Wage replacement at 100% — benefits are partial by design",
      "OSHA fines and penalties",
    ],
    components: [
      {
        name: "Part One — Statutory Benefits",
        description:
          "Pays whatever your state's workers' comp law requires — medical, wage replacement, disability, and death benefits. There's no dollar limit; the statute defines the obligation.",
      },
      {
        name: "Part Two — Employer's Liability",
        description:
          "Covers lawsuits related to workplace injuries that fall outside the statutory system, such as third-party-over actions and consortium claims. Standard limits are 100/500/100; contracts often require $1M, achieved with an inexpensive increased-limits endorsement.",
      },
      {
        name: "Class Codes & Payroll",
        description:
          "Your premium = payroll × rate per $100, by job classification. A clerical employee misclassified as field labor can multiply your cost. We audit classifications on every new policy and at renewal.",
      },
      {
        name: "Experience Modifier (E-Mod)",
        description:
          "Once large enough, your business gets an experience modifier comparing your claims history to your industry. Below 1.0 earns a discount; above 1.0 is a surcharge — and many project owners won't hire contractors with a mod above 1.0. We help you manage it with claims practices and return-to-work programs.",
      },
      {
        name: "Premium Audit",
        description:
          "Workers' comp premiums are estimates trued-up by an annual audit of actual payroll. We prepare you for audits so there are no surprise bills — and we contest audits that get classifications wrong.",
      },
    ],
    whenYouNeedIt: [
      "You have employees — most states require coverage at one employee; some construction trades at zero",
      "You use subcontractors — uninsured subs' payroll gets charged to YOUR policy at audit",
      "A client contract requires a workers' comp certificate before you can start work",
      "You're an officer/owner deciding whether to include or exclude yourself (the right answer depends on your health coverage and state rules)",
      "Your e-mod is above 1.0 and costing you money or contracts",
    ],
    faqs: [
      {
        question: "I only have one or two employees. Do I really need workers' comp?",
        answer:
          "In most states, yes — many require it from the first employee, and several construction trades require it even for sole proprietors. Beyond legality, a single serious injury can cost six figures in medical bills and lost wages that you'd otherwise owe personally. We'll confirm your state's exact threshold.",
      },
      {
        question: "Do I need to cover independent contractors?",
        answer:
          "Genuine independent contractors aren't covered — but states and carriers scrutinize classification hard. If a 'contractor' works under your direction with your tools on your schedule, they're likely an employee for comp purposes. And at audit, any uninsured subcontractor's payroll is added to your premium. Always collect certificates of insurance from subs.",
      },
      {
        question: "How are workers' comp premiums calculated?",
        answer:
          "Rate per $100 of payroll, set by job classification code, multiplied by your experience modifier. Three levers reduce cost: correct classifications, accurate payroll estimates, and a clean claims history supported by safety and return-to-work programs. We work all three.",
      },
      {
        question: "What should I do when an employee is injured?",
        answer:
          "Get them medical care immediately, then report the claim promptly — late reporting is the single biggest driver of claim cost inflation. We give every client a one-page injury-response procedure and help you set up light-duty return-to-work options that keep claims small and your e-mod clean.",
      },
      {
        question: "Can the owner be excluded from coverage?",
        answer:
          "Most states allow officers/owners to exclude themselves to save premium. Whether you should depends on your health insurance (many health plans exclude work injuries) and contract requirements. We'll walk through it — the cheap choice is sometimes the expensive one.",
      },
    ],
  },
  {
    slug: "commercial-auto",
    category: "business",
    name: "Commercial Auto Insurance",
    shortName: "Commercial Auto",
    icon: "truck",
    tagline: "Personal auto policies exclude business use. Don't find out at claim time.",
    summary:
      "Liability and physical damage coverage for business vehicles — plus hired and non-owned auto protection for employees driving personal cars on company business.",
    intro: [
      "If a vehicle is used for business — deliveries, job sites, client visits, hauling tools or goods — it needs commercial auto coverage. Personal auto policies exclude most business use, and carriers investigate usage at claim time. The worst possible moment to discover you have the wrong policy is after your employee causes a serious accident in a company truck.",
      "Commercial auto also carries higher stakes: businesses are sued for more, and 'nuclear verdicts' against commercial vehicle operators have driven contract requirements up. Most business contracts now require $1M combined single limit. We structure fleets of one vehicle to fifty across multiple carriers, including the hired and non-owned coverage most businesses don't realize they need.",
    ],
    whatItCovers: [
      "Bodily injury and property damage your business vehicles cause to others",
      "Physical damage to your own vehicles — collision and comprehensive",
      "Medical payments / PIP for drivers and passengers",
      "Uninsured and underinsured motorist protection",
      "Hired auto — liability when you rent or borrow vehicles for business",
      "Non-owned auto — liability when employees drive their personal cars on company business",
      "Permanently attached equipment, and optional towing, rental reimbursement, and downtime coverage",
    ],
    whatItDoesNotCover: [
      "Cargo and customers' goods in transit (motor truck cargo coverage)",
      "Tools and inventory in the vehicle (inland marine / property coverage)",
      "Employee injuries on the job (workers' comp)",
      "For-hire trucking operations without proper filings (we handle those separately)",
    ],
    components: [
      {
        name: "Liability (Combined Single Limit)",
        description:
          "Commercial auto liability is usually written as a combined single limit — commonly $1M — covering bodily injury and property damage together. Most contracts and many landlords specify $1M CSL as a minimum.",
      },
      {
        name: "Physical Damage",
        description:
          "Collision and comprehensive for owned vehicles, at actual cash value or agreed/stated value. For work trucks with upfits — racks, lifts, wraps, toolboxes — make sure declared values reflect the upfit, not just the bare chassis.",
      },
      {
        name: "Hired & Non-Owned Auto (HNOA)",
        description:
          "The most commonly missing coverage in small business. If your employee causes an accident running a business errand in their own car, your business can be sued — HNOA protects the business. It's inexpensive and often attachable to a BOP or GL policy.",
      },
      {
        name: "Driver Schedule & MVR Monitoring",
        description:
          "Who drives matters as much as what they drive. We help you set driver eligibility standards and review motor vehicle records, which keeps premiums down and underwriters comfortable.",
      },
      {
        name: "Coverage Symbols",
        description:
          "Commercial auto policies use numeric symbols defining which vehicles are covered. Symbol 1 ('any auto') is the broadest; cheaper policies quietly use narrower symbols that exclude newly acquired or borrowed vehicles. We make sure your symbols match how you actually operate.",
      },
    ],
    whenYouNeedIt: [
      "Your business owns, leases, or registers any vehicle",
      "Vehicles haul tools, equipment, materials, or products — even a personal pickup used daily for work",
      "Employees drive their own cars for deliveries, errands, or client visits (you need HNOA)",
      "You rent vehicles or trucks for business use",
      "A contract requires a $1M auto liability certificate",
    ],
    faqs: [
      {
        question: "I use my personal truck for my business. Isn't my personal policy enough?",
        answer:
          "Probably not. Personal policies exclude most commercial use — hauling tools to job sites, deliveries, transporting clients. If the carrier determines the loss occurred during business use, the claim can be denied entirely. A commercial policy on that vehicle often costs less than people fear, and it actually pays when you need it.",
      },
      {
        question: "What is hired and non-owned auto coverage, and do I need it?",
        answer:
          "If any employee ever drives their personal car for a business task — bank runs, supply pickups, client visits — your business is exposed when they cause an accident, because plaintiffs sue the employer. HNOA covers the business's liability in exactly that scenario. It's one of the cheapest, most frequently missing coverages we see.",
      },
      {
        question: "How much liability should my business carry on vehicles?",
        answer:
          "$1M combined single limit is the practical floor — it's what contracts demand and what serious accidents cost. Businesses with bigger fleets, heavier vehicles, or more assets should layer a commercial umbrella above it. State minimums are not a serious option for a business with anything to lose.",
      },
      {
        question: "Are my tools and cargo covered if the van is broken into?",
        answer:
          "Not by the auto policy — it covers the vehicle, not its contents. Tools and equipment need an inland marine (contractor's equipment) policy; goods you haul for others need motor truck cargo coverage. We typically package these alongside the auto policy so there's no gap.",
      },
    ],
  },
  {
    slug: "cyber",
    category: "business",
    name: "Cyber Liability Insurance",
    shortName: "Cyber",
    icon: "lock",
    tagline: "Small businesses are now the primary target. One phishing email can cost six figures.",
    summary:
      "Covers data breaches, ransomware, funds-transfer fraud, and business interruption from cyber events — plus the incident-response team that gets you through the first 72 hours.",
    intro: [
      "Cybercrime has shifted decisively toward small and mid-size businesses precisely because they have weaker defenses and no response plan. Ransomware, phishing-driven funds-transfer fraud, and stolen customer data routinely cost small businesses six figures — between forensics, notification laws, system restoration, lost income, and liability. Many never recover.",
      "Cyber insurance does two things: it pays those costs, and — just as important — it hands you a breach-response team the moment something happens: forensic investigators, privacy attorneys, notification services, and ransomware negotiators on call 24/7. If your business takes payments, stores customer information, depends on email, or runs on any software at all, this coverage has moved from optional to essential.",
    ],
    whatItCovers: [
      "Breach response: forensics, legal counsel, customer notification, credit monitoring, PR",
      "Cyber extortion and ransomware — negotiation, payments where lawful, and restoration",
      "Funds-transfer fraud and social engineering — wire payments tricked out of your team",
      "Business interruption — income lost while systems are down",
      "Data restoration and system recovery costs",
      "Third-party liability — lawsuits from customers whose data was exposed, and regulatory fines/penalties where insurable",
      "Payment card (PCI) fines and assessments",
    ],
    whatItDoesNotCover: [
      "Bodily injury and property damage (GL territory)",
      "Loss of future profits or company valuation after an incident",
      "Failures to maintain the security controls you attested to on the application (answer honestly)",
      "Acts of war exclusions can apply to state-sponsored attacks — wording varies; we read it",
    ],
    components: [
      {
        name: "First-Party Breach Response",
        description:
          "The 'first 72 hours' coverage: a breach coach (privacy attorney), forensic investigators, notification to affected individuals as state laws require, call centers, and credit monitoring. Notification laws apply in all 50 states, with deadlines.",
      },
      {
        name: "Cyber Extortion / Ransomware",
        description:
          "Covers negotiation expertise, ransom payment where legal and approved, and the larger cost of restoring systems and data. Carriers' response panels deal with ransomware groups weekly — you don't want to improvise this.",
      },
      {
        name: "Cybercrime / Social Engineering",
        description:
          "Covers funds transferred by your own employees after being deceived — fake vendor invoices, spoofed executive emails. This is the most frequent small-business cyber loss, and it often carries a sublimit. We negotiate that sublimit up.",
      },
      {
        name: "Business Interruption & Data Restoration",
        description:
          "Replaces income lost while ransomware or an attack keeps you offline, and pays to rebuild data and systems — including, on better forms, losses from outages at your cloud providers.",
      },
      {
        name: "Third-Party Liability & Regulatory",
        description:
          "Defends and pays claims from customers, partners, and regulators after a breach of data you held — including defense for state AG actions and insurable fines.",
      },
    ],
    whenYouNeedIt: [
      "You accept credit cards or hold any customer personal information (names + emails count)",
      "You pay vendors by wire or ACH — funds-transfer fraud is the #1 small-business cyber loss",
      "Your operations depend on email, cloud software, or any computer system",
      "You're in a regulated or data-heavy field: healthcare, finance, legal, retail, professional services",
      "A client contract or vendor agreement now requires cyber coverage (increasingly standard)",
    ],
    faqs: [
      {
        question: "My business is small — would hackers really target us?",
        answer:
          "Small businesses are now the majority of cyber-attack victims precisely because attackers automate at scale and small firms have weaker defenses. Most incidents aren't targeted at all: phishing kits and credential-stuffing bots don't care about your size, and the average small-business incident runs well into six figures once forensics, notification, downtime, and recovery are counted.",
      },
      {
        question: "What does cyber insurance cost?",
        answer:
          "For most small businesses, $1M of coverage runs roughly $500–$2,500 a year depending on industry, revenue, and security posture. Carriers now price heavily on controls — multi-factor authentication, backups, and email security can cut your premium meaningfully. We'll tell you which controls move the price before you apply.",
      },
      {
        question: "We use cloud software for everything. Isn't security their problem?",
        answer:
          "Cloud providers secure their infrastructure — but you remain legally responsible for your customers' data, your employees still click phishing links, and your business still loses income when the provider goes down. Good cyber policies cover contingent business interruption from cloud outages; we check for it specifically.",
      },
      {
        question: "What happens if we get hit with ransomware?",
        answer:
          "You call the carrier's 24/7 breach hotline and a response team takes over within hours: forensics to assess scope, a privacy attorney to manage legal obligations, negotiators if a ransom is in play, and restoration specialists. The coverage matters, but in the moment, the team matters more — that's what you're really buying.",
      },
      {
        question: "Will my application answers affect claims?",
        answer:
          "Yes — carriers have denied claims where applicants attested to controls (like MFA) they didn't actually have. We go through the application with you carefully so every answer is accurate, and where a control is missing, we help you close it (which usually lowers the premium anyway).",
      },
    ],
  },
  {
    slug: "professional-liability",
    category: "business",
    name: "Professional Liability (E&O) Insurance",
    shortName: "Professional Liability",
    icon: "scale",
    tagline: "When clients pay for your expertise, mistakes — even alleged ones — are lawsuits.",
    summary:
      "Errors & omissions coverage for service providers and advisors — defends and pays claims that your work, advice, or oversight caused a client financial loss.",
    intro: [
      "If clients pay for your judgment, advice, designs, or services, you carry an exposure general liability doesn't touch: financial harm from your professional work. A consultant's recommendation goes wrong, an accountant misses a deadline, an IT firm's deployment corrupts data, an agent overlooks a coverage need — the client sues for the money they lost. Professional liability (errors & omissions) insurance defends those claims and pays settlements and judgments.",
      "Here's the uncomfortable truth: you don't need to make a mistake to face a claim. A significant share of E&O claims are brought by clients who suffered losses and went looking for someone to blame. Defense costs alone — easily $50,000–$150,000 — can sink a small firm even when the claim is groundless. E&O coverage means the carrier's lawyers fight that battle, not your bank account.",
    ],
    whatItCovers: [
      "Negligence, errors, and omissions in delivering professional services",
      "Defense costs — attorneys, experts, court fees — even for meritless claims",
      "Settlements and judgments for client financial losses",
      "Missed deadlines, project delays, and failure to deliver as promised",
      "Negligent misrepresentation and breach of professional duty",
      "Many forms include personal injury (libel/slander) arising from professional services",
    ],
    whatItDoesNotCover: [
      "Bodily injury and property damage (general liability)",
      "Intentional fraud or dishonest acts",
      "Employment disputes (employment practices liability)",
      "Data breaches (cyber — though combined E&O/cyber forms exist for tech firms)",
      "Work performed before your retroactive date (see FAQs — this matters enormously)",
    ],
    components: [
      {
        name: "Claims-Made Coverage Trigger",
        description:
          "Most E&O policies are 'claims-made': they cover claims made while the policy is active, for work performed after your retroactive date. This makes continuous, uninterrupted coverage critical — a gap can void coverage for years of past work.",
      },
      {
        name: "Retroactive Date",
        description:
          "The earliest work date your policy covers. When switching carriers, we always preserve your original retroactive date so your earliest covered work stays covered. Letting it reset is the most expensive invisible mistake in E&O.",
      },
      {
        name: "Limits & Defense Costs",
        description:
          "Typical limits run $1M/$1M to $2M/$2M. On many forms defense costs erode the limit, so a long lawsuit can consume coverage before any settlement — worth understanding when choosing limits.",
      },
      {
        name: "Extended Reporting Period (Tail)",
        description:
          "If you retire, sell, or close the business, a 'tail' endorsement extends the window to report claims for past work — essential protection at the end of a professional career.",
      },
      {
        name: "Industry-Specific Forms",
        description:
          "Real E&O is written for your profession: tech E&O (usually paired with cyber), consultants, architects/engineers, real estate, accountants, healthcare professionals, and insurance agents each get tailored forms. We place coverage with carriers that know your industry.",
      },
    ],
    whenYouNeedIt: [
      "Clients pay you for advice, analysis, design, or professional services of any kind",
      "Client contracts require E&O coverage before signing (standard in consulting, tech, and real estate)",
      "Your state or licensing body mandates it for your profession",
      "Your work product could cause a client financial loss if it's late, wrong, or incomplete",
      "You're closing or selling a practice and need tail coverage for past work",
    ],
    faqs: [
      {
        question: "I'm careful and good at my job. Do I really need E&O?",
        answer:
          "Quality reduces risk; it doesn't eliminate claims. Clients sue when projects lose money regardless of true fault, and defending even a baseless claim costs tens of thousands. E&O is less about whether you'll make a mistake and more about who pays the lawyers when a client decides you did.",
      },
      {
        question: "What's the difference between general liability and professional liability?",
        answer:
          "GL covers physical harm — bodily injury and property damage. E&O covers financial harm from your professional work — bad advice, errors, missed deadlines. A client tripping in your office is GL; a client losing $200,000 because of your report is E&O. Most service businesses need both.",
      },
      {
        question: "What does 'claims-made' mean and why should I care?",
        answer:
          "It means the policy must be in force when the claim is made, not just when the work was done. Practical consequences: never let coverage lapse, always preserve your retroactive date when switching carriers, and buy tail coverage when you close or sell the business. We manage all three for our clients.",
      },
      {
        question: "How much E&O coverage do I need?",
        answer:
          "Start from contract requirements (commonly $1M), then consider the size of client engagements — your exposure scales with the financial impact your work can have, not your revenue. A $200k/year consultant advising on $20M decisions needs more than minimum limits. We'll benchmark against your actual engagements.",
      },
    ],
  },
  {
    slug: "commercial-property",
    category: "business",
    name: "Commercial Property Insurance",
    shortName: "Commercial Property",
    icon: "building",
    tagline: "Buildings, equipment, inventory — insured to actual replacement cost, not a guess.",
    summary:
      "Protects your building, equipment, inventory, and improvements against fire, theft, storms, and more — with business interruption to keep revenue flowing while you rebuild.",
    intro: [
      "Commercial property insurance covers the physical backbone of your business: owned buildings, leasehold improvements, machinery and equipment, computers, inventory, furniture, and even outdoor signs. When fire, theft, vandalism, or wind strikes, this is the policy that rebuilds and re-equips you.",
      "Two decisions determine whether a property claim makes you whole or leaves you short: insuring at replacement cost versus actual cash value, and getting the values right. Construction and equipment costs have climbed steeply, and a limit set three years ago may be 20–30% short today — and coinsurance clauses penalize underinsurance even on partial losses. We re-verify values at every renewal so your limits match reality.",
    ],
    whatItCovers: [
      "Owned buildings and structures, including permanently installed fixtures",
      "Tenant improvements and betterments — the build-out you paid for in leased space",
      "Business personal property: equipment, machinery, computers, furniture, inventory",
      "Property of others in your care, custody, or control",
      "Fire, lightning, windstorm, hail, theft, and vandalism",
      "Outdoor signs, fences, and landscaping (often with sublimits)",
      "Business interruption and extra expense when added — lost income during covered downtime",
    ],
    whatItDoesNotCover: [
      "Flood and earthquake — separate policies we can arrange",
      "Equipment mechanical breakdown without an equipment breakdown endorsement",
      "Vehicles (commercial auto) and most property in transit or at job sites (inland marine)",
      "Wear, tear, and gradual deterioration",
      "Utility failure originating off-premises, unless endorsed",
    ],
    components: [
      {
        name: "Building Coverage",
        description:
          "Covers owned structures at replacement cost — what it costs to rebuild today, including code-upgrade costs with an ordinance-or-law endorsement, which older buildings absolutely need.",
      },
      {
        name: "Business Personal Property",
        description:
          "Your equipment, inventory, computers, and furniture. Inventory values often swing seasonally — peak-season endorsements or reporting forms keep you covered at your highest exposure.",
      },
      {
        name: "Tenant Improvements & Betterments",
        description:
          "If you lease, the build-out you invested in — flooring, walls, lighting, fixtures — is typically yours to insure, not the landlord's. This is one of the most frequently missed coverages for leased businesses.",
      },
      {
        name: "Business Interruption / Extra Expense",
        description:
          "Replaces lost net income and pays continuing expenses — payroll, rent, debt service — during restoration, plus extra expense to operate temporarily elsewhere. For most businesses the income exposure exceeds the property exposure.",
      },
      {
        name: "Coinsurance & Valuation",
        description:
          "Coinsurance clauses (typically 80–90%) penalize you on every claim if your limits are below the required percentage of full value. We calculate values properly and, where available, use agreed-value provisions that remove the penalty entirely.",
      },
      {
        name: "Equipment Breakdown",
        description:
          "Adds coverage for sudden mechanical, electrical, and pressure-system failures — HVAC, refrigeration, production machinery, servers — that standard property forms exclude.",
      },
    ],
    whenYouNeedIt: [
      "You own your building or any meaningful equipment, inventory, or technology",
      "You lease space and invested in build-out (your lease likely requires property coverage too)",
      "Your revenue stops if your location, equipment, or stock is damaged",
      "Your property values have grown — or construction costs have — since limits were last set",
      "You hold customers' property: repair shops, dry cleaners, warehouses, IT shops",
    ],
    faqs: [
      {
        question: "Replacement cost or actual cash value — which should I choose?",
        answer:
          "Replacement cost pays to buy new equivalent property; actual cash value deducts depreciation, which can cut a payout on older equipment by half or more. Replacement cost costs somewhat more in premium and is almost always worth it. The exception is older property you genuinely wouldn't replace in kind — we'll go item by item where it matters.",
      },
      {
        question: "What is coinsurance and why does it matter?",
        answer:
          "A coinsurance clause requires you to insure to a stated percentage of full value (usually 80–90%). If you're underinsured, every claim — even small partial ones — is penalized proportionally. Example: a building worth $1M insured for $600k with 80% coinsurance gets only 75% of any loss paid. Accurate valuations or agreed-value endorsements eliminate this trap.",
      },
      {
        question: "I lease my space — doesn't my landlord insure the building?",
        answer:
          "The landlord insures the shell. Your lease almost certainly makes you responsible for your improvements, your contents, and often the glass — and requires you to carry insurance proving it. We read lease insurance clauses for clients routinely and build the policy to match what you actually signed.",
      },
      {
        question: "How much business interruption coverage do I need?",
        answer:
          "Start with monthly gross profit plus continuing expenses, multiplied by a realistic restoration timeline — and be honest about how long permits, construction, and equipment lead times actually take (12–18 months is common for serious losses, not 3–4). We model it with your financials so the limit reflects your real downtime exposure.",
      },
    ],
  },
];

export const ALL_LINES: CoverageLine[] = [...PERSONAL_LINES, ...BUSINESS_LINES];

export function getLine(category: "personal" | "business", slug: string): CoverageLine | undefined {
  return ALL_LINES.find((l) => l.category === category && l.slug === slug);
}
