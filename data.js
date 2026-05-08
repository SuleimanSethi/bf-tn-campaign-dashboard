window.campaign = {
  meta: {
    period: "April 24 – May 5, 2026",
    activeDays: 11,
    dailyBudget: 75,
    status: "Ended",
    lastUpdated: "May 7, 2026"
  },
  headline: {
    spend: 799,
    directSales: 20,
    storeRevenue: 1897,
    storeRevenueLift: 843,
    roas: 1.008,
    tnHatRevenue: 848
  },
  daily: [
    { date: "Apr 24", spend: 52.80, orders: 0, roas: null },
    { date: "Apr 25", spend: 65.57, orders: 1, roas: 0.582 },
    { date: "Apr 26", spend: 90.38, orders: 2, roas: 1.098 },
    { date: "Apr 27", spend: 75.89, orders: 0, roas: null },
    { date: "Apr 28", spend: 77.11, orders: 1, roas: 0.494 },
    { date: "Apr 29", spend: 69.24, orders: 3, roas: 1.605 },
    { date: "Apr 30", spend: 74.23, orders: 2, roas: 1.297 },
    { date: "May 1",  spend: 72.84, orders: 4, roas: 2.324 },
    { date: "May 2",  spend: 63.15, orders: 1, roas: 0.604 },
    { date: "May 3",  spend: 86.36, orders: 3, roas: 1.249 },
    { date: "May 4",  spend: 53.50, orders: 3, roas: 2.016 },
    { date: "May 5",  spend: 18.38, orders: 0, roas: null }
  ],
  hero: {
    name: "Tennessee Camo Homage",
    units: 11,
    revenue: 330,
    sharePctOfTNLine: 38
  },
  whatWorked: [
    { icon: "Flag", stat: "95%", title: "State-pride messaging carried 95% of sales", body: "Of three creative angles tested, 'Tennessee on Your Head' (state pride) drove 19 of 20 conversions on 82% of spend. The only hook that converted on cold audiences." },
    { icon: "Crown", stat: "11 units", title: "One hat became the clear hero", body: "Tennessee Camo Homage produced 38% of all Tennessee hat revenue from one SKU. Repeats the Georgia pattern — every state collection produces a breakout." },
    { icon: "MapPin", stat: "41%", title: "In-state targeting found the right buyers", body: "41% of orders shipped to Tennessee residents, up from 26% in the baseline window. The state-themed creative reached the audience that wanted it." },
    { icon: "Mail", stat: "$451", title: "First email blast generated $451 in 24 hours", body: "46.7% open rate, 6 conversions on the launch blast. The newsletter list is engaged and responsive when given the right offer." },
    { icon: "Wrench", stat: "+250%", title: "Day 2 audience fix recovered the campaign", body: "An audience-config issue was caught and fixed on Day 2. Post-fix performance was 2.5× better than pre-fix — without the catch, this campaign would have come in much weaker." }
  ],
  whatDidntWork: [
    { stat: "0 / 0", title: "Two hats sold zero units", body: "Tennessee White State 5 and Grey State 6 sold zero units across 11 days of paid push. Worth pulling from the next campaign rotation." },
    { stat: "$101 / 0", title: "The 'engineering' creative got nothing", body: "An ad pitching hat construction quality spent $101 over 5 days with zero conversions. Cold audiences resist quality-vs-competitor framing." },
    { stat: "$38", title: "Second email blast underperformed by 92%", body: "Blast #2 (hero spotlight on Camo Homage) generated $38 vs Blast #1's $451. Discovery formats outperform single-product spotlights for this list." },
    { stat: "2.0×", title: "Buyer pool drained by Day 9", body: "By the final 3 days, the same person was seeing the ad twice on average. The in-state Tennessee golfer audience is small — most of it had already been reached." }
  ],
  funnel: [
    { stage: "Saw ad → clicked link",        tn: 1.41, ga: 1.92, label: "Georgia 36% better" },
    { stage: "Clicked → added to cart",      tn: 5.83, ga: 12.80, label: "Georgia 2.2× better", highlight: true },
    { stage: "Added to cart → reached checkout", tn: 79, ga: 51, label: "Tennessee better here" },
    { stage: "Reached checkout → purchased", tn: 59, ga: 59, label: "Identical" }
  ],
  velocityComparison: {
    tn: { hatSKUsSold: 10, totalHatSKUs: 12, totalUnits: 29, avgPerSKU: 2.9, spendPerSKU: 80 },
    ga: { hatSKUsSold: 8,  totalHatSKUs: 11, totalUnits: 99, avgPerSKU: 12.4, spendPerSKU: 144 }
  },
  blastComparison: {
    tn: { name: "Camo Homage Spotlight", recipients: 4193, openRate: 45.18, clicks: 68, conversions: 1, clickToBuyRate: 1.5, revenue: 38 },
    ga: { name: "Selling Fast (April)",  recipients: 4362, openRate: 46.56, clicks: 84, conversions: 10, clickToBuyRate: 11.9, revenue: 590 }
  },
  geography: [
    { state: "Tennessee",    code: "TN", orders: 16, revenue: 715 },
    { state: "Georgia",      code: "GA", orders: 3,  revenue: 242 },
    { state: "California",   code: "CA", orders: 2,  revenue: 100 },
    { state: "Massachusetts",code: "MA", orders: 2,  revenue: 97 },
    { state: "Kentucky",     code: "KY", orders: 2,  revenue: 96 },
    { state: "Texas",        code: "TX", orders: 2,  revenue: 70 },
    { state: "Alabama",      code: "AL", orders: 1,  revenue: 35 },
    { state: "Colorado",     code: "CO", orders: 1,  revenue: 35 },
    { state: "Florida",      code: "FL", orders: 1,  revenue: 32 },
    { state: "Illinois",     code: "IL", orders: 1,  revenue: 35 },
    { state: "Michigan",     code: "MI", orders: 1,  revenue: 65 },
    { state: "Missouri",     code: "MO", orders: 1,  revenue: 35 },
    { state: "N. Carolina",  code: "NC", orders: 1,  revenue: 55 },
    { state: "Nebraska",     code: "NE", orders: 1,  revenue: 35 },
    { state: "Ohio",         code: "OH", orders: 1,  revenue: 150 },
    { state: "Pennsylvania", code: "PA", orders: 1,  revenue: 32 },
    { state: "S. Carolina",  code: "SC", orders: 1,  revenue: 35 },
    { state: "Virginia",     code: "VA", orders: 1,  revenue: 35 }
  ],
  skus: [
    { rank: 1,  name: "Tennessee Camo Homage",   units: 11, revenue: 330, isHero: true },
    { rank: 2,  name: "Tennessee Grey Homage",   units: 4,  revenue: 120 },
    { rank: 3,  name: "Tennessee Black & Gold",  units: 3,  revenue: 90 },
    { rank: 4,  name: "Tennessee Navy State",    units: 3,  revenue: 90 },
    { rank: 5,  name: "Tennessee Homage (Axis)", units: 2,  revenue: 60 },
    { rank: 6,  name: "Tennessee Tri White 6",   units: 2,  revenue: 60 },
    { rank: 7,  name: "Tennessee Anchor",        units: 1,  revenue: 30 },
    { rank: 8,  name: "Tennessee Gold State",    units: 1,  revenue: 30 },
    { rank: 9,  name: "Tennessee Gold Star",     units: 1,  revenue: 30 },
    { rank: 10, name: "Tennessee Tri",           units: 1,  revenue: 30 },
    { rank: 11, name: "Tennessee White State 5", units: 0,  revenue: 0,  isZero: true },
    { rank: 12, name: "Tennessee Grey State 6",  units: 0,  revenue: 0,  isZero: true }
  ],
  emails: {
    blast1: { subject: "The Tennessee Collection — 12 hats one state", sent: "April 27, 2026", recipients: 4229, openRate: 46.71, clickRate: 2.19, conversions: 6, revenue: 451 },
    blast2: { subject: "Camo Homage Spotlight",                        sent: "May 3, 2026",    recipients: 4193, openRate: 45.18, clickRate: 1.63, conversions: 1, revenue: 38 }
  }
};
