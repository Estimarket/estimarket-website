export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  tone: "navy" | "orange";
  category: string;
  kicker: string;
  title: string;
  excerpt: string;
  subtitle: string;
  byline: string;
  intro: string[];
  blocks: ArticleBlock[];
  sources?: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "hidden-cost-of-getting-quotes",
    tone: "navy",
    category: "For homeowners",
    kicker: "For homeowners · 7 min read",
    title: "The hidden cost of getting quotes.",
    excerpt:
      "Following the “get three quotes” advice can take 4–6 weeks and still leave you shopping blind. Why the process itself raises the price of every project.",
    subtitle:
      "How the contractor search process quietly makes your project less affordable — before a single nail is driven.",
    byline: "By the Estimarket team · Published May 2026",
    intro: [
      "You've decided to renovate your bathroom. You've done some research, saved up a budget, and you're ready to move. The next step, every financial advisor and home improvement expert will tell you, is to get multiple quotes. Three to five is the standard recommendation. So you reach out to a few contractors and wait.",
      "What happens next is one of the most underappreciated sources of cost and frustration in homeownership — and it starts long before anyone picks up a tool.",
    ],
    blocks: [
      { type: "h", text: "The process itself is the first problem" },
      {
        type: "p",
        text: "Getting quotes for a home improvement project isn't just inconvenient — it's a weeks-long commitment. For a bathroom remodel or similar project, the typical turnaround from site visit to written estimate runs one to two weeks per contractor. That means following the conventional “get three quotes” advice can easily consume four to six weeks of calendar time before you've made any decision at all.",
      },
      {
        type: "p",
        text: "Each of those quotes requires its own in-home appointment — usually an hour or more — where a sales representative collects the same basic information every other company will ask for: room dimensions, photos, scope of work. You schedule around their availability, take time away from work or family, and do it again. And again.",
      },
      {
        type: "p",
        text: "The Houzz 2024 U.S. Houzz & Home Study, which surveyed more than 32,000 homeowners, found that 48% of people renovating their homes identified finding trustworthy professionals as a significant challenge. Angi's 2024 State of Home Spending Report put it even higher: 54% of homeowners said they struggled to find qualified professionals.",
      },
      {
        type: "p",
        text: "This isn't a problem of homeowners being difficult to please. It's a structural feature of how the market works.",
      },
      { type: "quote", text: "“Get 3 quotes, pick the one in the middle” would be smart if your 3 quotes actually represent the market — they likely don't." },
      { type: "h", text: "You're shopping blind" },
      {
        type: "p",
        text: "Even after going through all of that, most homeowners come out the other side without a clear sense of whether they got a good deal.",
      },
      {
        type: "p",
        text: "Quotes for the same project routinely vary by 50% or more — sometimes far higher. Real-world examples documented by renovation platforms show bids of $22,000, $28,000, and $47,000 for identical scopes of work. There's no standard bid format in the home improvement industry: one contractor's quote might be all-inclusive (labor, materials, permits, cleanup), while another covers only bare-minimum labor. Comparing them is genuinely difficult without expertise.",
      },
      {
        type: "p",
        text: "This isn't accidental. The market is structured in a way that makes price discovery hard for buyers. There's no central marketplace that gives you a real-time sense of what the work should cost, so you're relying on the advice to “pick the one in the middle” — which tells you nothing meaningful about whether any of the quotes reflect fair market value.",
      },
      { type: "h", text: "The high-pressure visit" },
      {
        type: "p",
        text: "There's another dynamic that makes comparison shopping harder than it should be: the in-home sales visit is often designed to prevent it.",
      },
      {
        type: "p",
        text: "Companies whose sales staff are paid on commission have a strong structural incentive to close during the first visit. The tactic that follows is familiar: a “special discount” available only if you sign today, urgency about scheduling, and sometimes pointed suggestions that the other companies you're considering aren't up to their standard. The pressure exists precisely because contractors know that most homeowners won't want to start the process over.",
      },
      { type: "h", text: "The affordability connection" },
      {
        type: "p",
        text: "All of this friction has a real cost — not just in time and stress, but in dollars. When the process of finding and evaluating contractors is burdensome, homeowners get fewer quotes. Fewer quotes means less competitive pressure on pricing. Less competitive pressure means higher prices.",
      },
      {
        type: "p",
        text: "According to a 2024 survey of 1,000 homeowners by Clever Real Estate, 78% of homeowners went over budget on their last renovation project. Of those, 44% exceeded their budget by at least $5,000, and 35% exceeded it by $10,000 or more. Nearly two-thirds have gone into debt to cover renovation costs.",
      },
      {
        type: "p",
        text: "The quote process doesn't just make things inconvenient. It makes projects less likely to happen at prices that work for real people.",
      },
      { type: "h", text: "A better way to start" },
      {
        type: "p",
        text: "The premise of Estimarket is simple: the information a contractor actually needs to give you a ballpark — room dimensions, photos, a description of the work — doesn't require an in-person visit. It requires a good document.",
      },
      {
        type: "p",
        text: "When homeowners can describe their project once, in a structured format, and receive competitive bids from contractors who've reviewed the full scope before responding, a few things change. The time to first quote drops dramatically. The bids arrive in a comparable format. And the competitive dynamics shift toward price, rather than toward whichever company was most aggressive during your in-home appointment.",
      },
      {
        type: "p",
        text: "Getting quotes doesn't have to be a weeks-long ordeal. And your project doesn't have to cost more simply because the process of finding a contractor was too hard to finish.",
      },
    ],
    sources: [
      "Houzz — “2024 U.S. Houzz & Home Study: Renovation Trends” houzz.com/magazine",
      "Angi — “2024 State of Home Spending Report” (Jan 2025) ir.angi.com/news-releases",
      "Quoterly — “How to Compare Multiple Contractor Quotes the Right Way” quoterly.app/blog",
      "Clever Real Estate — “New Data: Home Renovation Trends in 2024” listwithclever.com/research",
    ],
  },
  {
    slug: "the-lead-quality-trap",
    tone: "orange",
    category: "For contractors",
    kicker: "For contractors · 6 min read",
    title: "The lead quality trap.",
    excerpt:
      "Why Thumbtack and Angi cost more than you think — and why scaling your sales team isn't the answer. The math behind shared leads and the $1–3M ceiling.",
    subtitle:
      "Buying shared leads feels like growth. The unit economics tell a different story — and they cap how big you can get.",
    byline: "By the Estimarket team · Published May 2026",
    intro: [
      "Every contractor who has bought leads knows the feeling: a notification comes in, you call within minutes, and the homeowner doesn't pick up. Or they do — and they've already talked to four other companies who bought the exact same lead.",
      "Lead generation platforms sell access to homeowners. What they don't sell is intent, exclusivity, or any guarantee that the person on the other end is ready to hire. That gap is where most contractors quietly lose money.",
    ],
    blocks: [
      { type: "h", text: "A lead is not a customer" },
      {
        type: "p",
        text: "On most platforms, a “lead” is a name and a phone number. It's sold to multiple contractors at once, which means you're racing competitors to the first callback before you know anything about the job. You pay whether or not the homeowner answers, whether or not the project is real, and whether or not it's even in your wheelhouse.",
      },
      {
        type: "p",
        text: "Industry close rates on shared leads typically land between 10% and 25%. That means for every ten leads you pay for, seven to nine go nowhere — but you paid full price for all ten.",
      },
      { type: "quote", text: "You're not buying work. You're buying the chance to chase work that nine other companies are also chasing." },
      { type: "h", text: "The math that caps your growth" },
      {
        type: "p",
        text: "Here's the trap. To grow on a lead-buying model, you buy more leads. More leads means more callbacks, more quotes, and more sales appointments — which means more salespeople, more trucks, and more overhead. Your cost to acquire a customer rises right alongside revenue.",
      },
      {
        type: "p",
        text: "This is why so many home-services businesses stall somewhere between $1M and $3M in annual revenue. The model doesn't compound; it just requires more fuel. Every new dollar of revenue costs nearly as much as the last one to produce.",
      },
      { type: "h", text: "What changes with real projects" },
      {
        type: "p",
        text: "A project is different from a lead. On Estimarket, a project is a scoped brief: photos, measurements, a written description, a stated budget, and a bid window. You see the full scope before you spend a minute of your time, and you decide whether to bid.",
      },
      {
        type: "p",
        text: "Bids are private — homeowners review them without seeing what competitors quoted, so there's no race to the bottom. Early data from our Denver market shows 22–35% close rates on submitted bids, because you're only ever bidding on work you've already reviewed and chosen.",
      },
      { type: "h", text: "Spend time bidding, not chasing" },
      {
        type: "p",
        text: "When the platform does the qualification up front, your team's hours go toward winning the jobs worth winning — not dialing numbers that never pick up. That's the difference between buying leads and building a pipeline.",
      },
    ],
    sources: [
      "Estimarket internal data — Denver pilot market, 2026",
      "Angi — “2024 State of Home Spending Report” ir.angi.com/news-releases",
    ],
  },
  {
    slug: "the-two-sided-fix",
    tone: "navy",
    category: "For everyone",
    kicker: "For everyone · 5 min read",
    title: "The two-sided fix.",
    excerpt:
      "Homeowners hate getting quotes. Contractors hate buying leads. The same broken process is the root of both — and fixing it for one side fixes it for the other.",
    subtitle:
      "Two complaints, one cause. Why a real marketplace is the only thing that solves both sides at once.",
    byline: "By the Estimarket team · Published May 2026",
    intro: [
      "Ask a homeowner about their last renovation and you'll hear about the weeks spent scheduling estimates and the wildly different numbers that came back. Ask a contractor about growth and you'll hear about the money sunk into leads that went cold.",
      "These sound like two separate problems. They're the same problem, viewed from opposite ends.",
    ],
    blocks: [
      { type: "h", text: "One broken handoff" },
      {
        type: "p",
        text: "The friction lives in the handoff between homeowner and contractor. Today that handoff is an in-home sales visit: slow to schedule, expensive to staff, and impossible to compare across companies. Homeowners pay for it in time. Contractors pay for it in overhead. Nobody actually likes it.",
      },
      { type: "quote", text: "Fix the handoff, and both sides of the market get what they actually wanted all along." },
      { type: "h", text: "Why one-sided tools fail" },
      {
        type: "p",
        text: "Lead-gen platforms tried to fix the contractor's side by selling more contacts — but that just made homeowners field more calls and contractors chase more dead ends. Quote aggregators tried to fix the homeowner's side — but without committed, verified contractors on the other end, the quotes weren't real. Solving one side while ignoring the other just moves the pain around.",
      },
      { type: "h", text: "What a real marketplace does" },
      {
        type: "p",
        text: "A marketplace works when both sides show up with real intent. Homeowners post a structured project once — photos, measurements, scope, budget. Verified contractors review the full brief and submit private bids. The homeowner compares like-for-like and picks. No repeated visits, no shared leads, no race to the bottom.",
      },
      {
        type: "p",
        text: "Because the same structured brief serves both sides, every improvement for homeowners is an improvement for contractors. Faster quotes for homeowners means higher close rates for contractors. Better-qualified projects for contractors means better bids for homeowners.",
      },
      { type: "h", text: "Building it in Denver first" },
      {
        type: "p",
        text: "We're starting in Denver because marketplaces work best with real density on both sides. Get the homeowners and the contractors in the same place, fix the handoff between them, and the rest takes care of itself.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
