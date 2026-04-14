// Niche buyer-intent landing pages. Each targets a high-intent Google query
// like "SEO for dentists" or "SEO for ecommerce stores". Rendered by App.jsx.

export const niches = {
  dentists: {
    slug: 'seo-for-dentists',
    title: 'SEO for Dentists — Monthly Dental SEO Service | RankFrame SEO',
    metaDescription:
      'Monthly dental SEO service for small private practices. Local SEO, Google Business Profile, schema markup, and ranking reports from $150/month. No setup fee.',
    h1: 'SEO for Dentists',
    subhead:
      'Monthly dental SEO service for private practices that want steady, organic new-patient flow — not one-off campaigns.',
    painPoints: [
      'Your competitors rank above you for "dentist near me" even though they\'re two blocks farther away.',
      'You get traffic to the homepage but almost none to service pages like Invisalign or implants.',
      'Reviews say you\'re the best in town, but Google Business Profile looks half-empty.',
      'You tried one ad campaign and it burned $3,000 with four calls to show for it.',
    ],
    whatWeDo: [
      'Local SEO architecture built on LocalBusiness + Dentist schema with NAP consistency across 50+ directories.',
      'Service-page optimization for every procedure (whitening, crowns, Invisalign, implants) with dedicated title tags and FAQ schema.',
      'Google Business Profile audit — categories, services, photos, Q&A, posting cadence.',
      'Review-schema markup to surface star ratings in SERPs without buying fake reviews.',
      'Monthly ranking reports on local + service keywords with a 30-day action roadmap.',
    ],
    faq: [
      {
        q: 'How long until a dental practice sees SEO results?',
        a: 'Local dental SEO typically shows Google Business Profile visibility gains in 2–4 weeks. Organic ranking movement on service pages usually appears between 60 and 90 days. The compounding effect is strongest at the 6-month mark, after Google has seen consistent schema, reviews, and internal linking.',
      },
      {
        q: 'Do you work with multi-location dental groups?',
        a: 'Yes. Multi-location dental groups need individual location pages with unique LocalBusiness schema, city-specific landing pages, and Google Business Profile management per location. RankFrame\'s $750/month plan includes this structure.',
      },
      {
        q: 'Can SEO replace Google Ads for a dental practice?',
        a: 'For most established practices, organic SEO delivers a lower cost per patient than Google Ads within 6–9 months. Paid ads are better for brand-new practices with no domain history. The smart play is usually both — ads for immediate volume, SEO for long-term compounding.',
      },
      {
        q: 'How is this different from an SEO agency charging $2,500/month?',
        a: 'Most agency retainers bundle strategy meetings, reporting software, and account management that a 1–2 location dental practice doesn\'t need. RankFrame\'s $150/month plan covers the actual technical SEO and reporting; $750/month adds backlinks and citation management. You get the work, not the overhead.',
      },
    ],
    stats: [
      { label: '46%', text: 'of all Google searches have local intent.' },
      { label: '78%', text: 'of local mobile searches result in an offline purchase or booking.' },
      { label: '3x', text: 'higher click-through on Google Business Profile listings with 5+ photos.' },
    ],
  },
  ecommerce: {
    slug: 'seo-for-ecommerce',
    title: 'SEO for E-commerce Stores — Monthly Technical SEO | RankFrame SEO',
    metaDescription:
      'Monthly SEO service for Shopify, WooCommerce, and BigCommerce stores. Product schema, collection pages, crawl budget, and ranking reports from $150/month.',
    h1: 'SEO for E-commerce Stores',
    subhead:
      'Monthly technical SEO for Shopify, WooCommerce, and BigCommerce stores — fix crawl budget, Product schema, and collection-page architecture so Google ranks your catalog.',
    painPoints: [
      'Google indexes 200 pages and ignores the other 2,000 — your crawl budget is bleeding out on faceted URLs.',
      'Product pages have generic titles like "Blue Shirt | StoreName" instead of keyword-first descriptive ones.',
      'No Product schema means no star ratings, no price, no availability in SERPs — your rich snippets are blank.',
      'Collection pages rank nowhere because they lack unique copy, internal links, or canonical tags.',
    ],
    whatWeDo: [
      'Product schema (Product, Offer, AggregateRating, Review) applied across the full catalog with automation.',
      'Faceted-navigation audit — robots.txt + canonical tag strategy so Google spends crawl budget on money pages.',
      'Collection-page rewrites with unique descriptions, internal links, and breadcrumb schema.',
      'Site-speed / Core Web Vitals pass for mobile — LCP, CLS, INP under Google thresholds.',
      'Monthly ranking reports on category-level and long-tail product keywords with a 30-day priority roadmap.',
    ],
    faq: [
      {
        q: 'Do you work with Shopify, WooCommerce, and BigCommerce?',
        a: 'Yes. All three platforms expose the hooks RankFrame needs — theme.liquid or header.php for schema injection, robots.txt for crawl control, and sitemap settings. Shopify stores on Dawn or modern themes are the fastest to optimize; WooCommerce stores on older WordPress themes usually need a Core Web Vitals pass first.',
      },
      {
        q: 'Will Product schema show star ratings in Google if I have no reviews yet?',
        a: 'No — Google only surfaces AggregateRating rich snippets when you have verified review data (typically 5+ reviews). Product schema still helps even without reviews because it surfaces price, availability, and brand directly in the SERP, which lifts click-through rate 15–25%.',
      },
      {
        q: 'How do you handle out-of-stock product SEO?',
        a: 'Best practice in 2026: keep the URL live, update the Product schema availability to OutOfStock, and add a visible "Notify me" form. Redirecting to category pages or 404-ing wastes earned authority. RankFrame monitors availability monthly and flags stale SKUs.',
      },
      {
        q: 'What about duplicate content from product variants?',
        a: 'The fix is a strict canonical-tag policy (variants canonicalize to the parent product), combined with unique meta descriptions per variant only where they genuinely differ (e.g., size vs. color). This is part of every RankFrame e-commerce audit.',
      },
    ],
    stats: [
      { label: '53%', text: 'of product searches start on Google, not on a marketplace.' },
      { label: '20–30%', text: 'higher CTR on e-commerce SERPs with Product + AggregateRating schema.' },
      { label: '7%', text: 'conversion-rate lift per 1-second improvement in product-page load time.' },
    ],
  },
};

export function getNicheBySlug(slug) {
  return Object.values(niches).find((n) => n.slug === slug) || null;
}
