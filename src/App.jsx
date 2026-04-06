import { useEffect, useMemo, useState } from 'react';

export default function AISeoMarketingLandingPage() {
  const [route, setRoute] = useState(getRoute());
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    website: '',
    notes: '',
  });

  const stripeUrl = 'https://buy.stripe.com/8x2cMXbuO81d1Qkbjb9AA00';
  const formspreeEndpoint = 'https://formspree.io/f/xykbbzye';

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const titles = {
      home: 'SEO Reporting & Architecture Audit Service | RankFrame SEO',
      checkout: 'Start Your Monthly SEO Report | RankFrame SEO',
      success: 'Payment Successful — Welcome to RankFrame SEO',
    };
    const descriptions = {
      home: 'RankFrame SEO delivers monthly SEO reports, keyword ranking tracking, and SEO architecture audits for small businesses. $150/month. No setup fee.',
      checkout: 'Submit your website details and start your monthly SEO reporting service. $150/month. No setup fee.',
      success: 'Your RankFrame SEO subscription is confirmed. We will begin your monthly SEO audit and report.',
    };
    document.title = titles[route] || titles.home;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', descriptions[route] || descriptions.home);
  }, [route]);

  const deliverables = [
    'Monthly SEO performance report',
    'Full website SEO architecture audit',
    'Keyword ranking and visibility tracking',
    'Metadata, indexing, and crawlability review',
    'Technical SEO issues with action steps',
    '30-day priority roadmap for improvements',
  ];

  const process = [
    {
      step: '01',
      title: 'Submit your website',
      text: 'Send us your website details and we begin reviewing the structure, technical SEO foundation, and keyword positioning.',
    },
    {
      step: '02',
      title: 'We audit your SEO setup',
      text: 'We examine SEO architecture, internal linking, metadata, crawlability, indexing, and keyword ranking visibility.',
    },
    {
      step: '03',
      title: 'Receive your monthly report',
      text: 'You get a clear report with issues, opportunities, ranking insights, and next-step recommendations.',
    },
  ];

  const highlights = [
    'SEO architecture audit',
    'Keyword ranking review',
    'Monthly SEO reporting',
    'Technical SEO checks included',
    '$150 per month',
  ];

  const trustPoints = [
    'Focused on SEO architecture and reporting',
    'Keyword ranking visibility tracking',
    'Technical SEO checks with action steps',
    'Built for small businesses and growing teams',
  ];

  const benefits = [
    'Monthly SEO architecture review',
    'Actionable keyword ranking insights',
    'Metadata, indexing, and crawlability checks',
    'Clean, easy-to-read SEO reporting',
    'Simple one-plan pricing',
    'Built for businesses that need clear SEO direction',
  ];

  const whoFor = [
    'Small business owners who want clear SEO direction',
    'Website owners with low or unstable traffic',
    'Startups that need fast SEO insights without hiring an agency',
    'Companies that want simple monthly reporting without complexity',
  ];

  const whySeoMatters = [
    { stat: '68%', label: 'of online experiences begin with a search engine' },
    { stat: '53%', label: 'of all website traffic comes from organic search' },
    { stat: '0.63%', label: 'of users click on results from the second page of Google' },
    { stat: '14.6%', label: 'close rate for SEO leads vs 1.7% for outbound leads' },
  ];

  const faqs = [
    {
      q: 'What happens after I subscribe?',
      a: 'You submit your site details, our AI audit workflow begins, and you receive your first structured SEO review with recommendations.',
    },
    {
      q: 'Is there any setup fee?',
      a: 'No. The service is a flat $150 per month with no setup charge.',
    },
    {
      q: 'What is included in the monthly report?',
      a: 'The report includes SEO architecture checks, keyword ranking review, Google-facing framework checks, technical issues, and next-step priorities.',
    },
    {
      q: 'Who is this service best for?',
      a: 'It is ideal for small businesses, startup teams, and site owners who want a premium monthly SEO review without the cost of a full agency retainer.',
    },
    {
      q: 'How fast do you review a website?',
      a: 'We review core SEO structure, technical issues, indexing signals, and keyword visibility efficiently, then organize the findings into a clean monthly report.',
    },
    {
      q: 'Do you support ecommerce and service websites?',
      a: 'Yes. The service is suitable for service businesses, ecommerce sites, and general company websites that need better SEO structure and reporting.',
    },
  ];

  const nextChargeText = useMemo(() => '$150 / month billed monthly', []);

  const goTo = (next) => {
    window.location.hash = next;
    setRoute(next.replace('#', ''));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      website: form.website,
      notes: form.notes,
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem('seoLeadDraft', JSON.stringify(payload));

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Form submit failed');
      }
    } catch (error) {
      console.error('Formspree submit failed:', error);
      alert('We could not submit your details right now. Please try again.');
      return;
    }

    window.location.href = stripeUrl;
  };

  /* ───────── CHECKOUT PAGE ───────── */
  if (route === 'checkout') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
        <SiteHeader />
        <main className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="mb-8">
            <button
              onClick={() => goTo('#home')}
              className="rounded-full border border-gray-700 bg-[#141414] px-4 py-2 text-sm font-semibold text-gray-300 transition hover:border-amber-500/50 hover:text-amber-400"
            >
              ← Back to site
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-[2rem] border border-gray-800 bg-[#141414] p-8 shadow-sm md:p-10">
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">Client Details</div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
                Tell us about your business
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-400">
                Fill in your contact details and website URL first. Then continue to secure checkout.
              </p>

              <form id="lead-checkout-form" onSubmit={handleCheckout} className="mt-10 grid gap-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">Full name</label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleInput}
                    required
                    className="w-full rounded-2xl border border-gray-700 bg-[#1a1a1a] px-5 py-4 text-white outline-none transition focus:border-amber-500"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">Phone number</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleInput}
                    required
                    className="w-full rounded-2xl border border-gray-700 bg-[#1a1a1a] px-5 py-4 text-white outline-none transition focus:border-amber-500"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInput}
                    required
                    className="w-full rounded-2xl border border-gray-700 bg-[#1a1a1a] px-5 py-4 text-white outline-none transition focus:border-amber-500"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">Website URL</label>
                  <input
                    name="website"
                    value={form.website}
                    onChange={handleInput}
                    required
                    className="w-full rounded-2xl border border-gray-700 bg-[#1a1a1a] px-5 py-4 text-white outline-none transition focus:border-amber-500"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">Notes</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleInput}
                    rows={5}
                    className="w-full rounded-2xl border border-gray-700 bg-[#1a1a1a] px-5 py-4 text-white outline-none transition focus:border-amber-500"
                    placeholder="Anything you want us to know about your website or goals"
                  />
                </div>
              </form>
            </section>

            <aside className="rounded-[2rem] border border-amber-500/20 bg-[#111111] p-8 text-white shadow-xl shadow-amber-500/5 md:p-10">
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">Next Step</div>
              <h2 className="mt-4 text-3xl font-semibold">Continue to checkout</h2>
              <p className="mt-4 text-base leading-7 text-gray-400">
                After you submit, you will be redirected to secure Stripe checkout for your monthly AI SEO service.
              </p>

              <button
                type="submit"
                form="lead-checkout-form"
                className="mt-8 w-full rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition hover:scale-[1.02]"
              >
                Submit & Continue
              </button>

              <div className="mt-8 rounded-[1.5rem] border border-amber-500/10 bg-amber-500/5 p-6">
                <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <div className="text-sm uppercase tracking-[0.22em] text-gray-400">Plan</div>
                    <div className="mt-2 text-xl font-semibold">AI SEO Monthly</div>
                  </div>
                  <div className="text-3xl font-semibold text-amber-400">$150</div>
                </div>
                <div className="space-y-4 pt-5 text-gray-300">
                  <div className="flex items-center justify-between">
                    <span>Billing</span>
                    <span>{nextChargeText}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Setup fee</span>
                    <span className="text-amber-400">$0</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    );
  }

  /* ───────── SUCCESS PAGE ───────── */
  if (route === 'success') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
        <SiteHeader />
        <main className="mx-auto flex max-w-4xl items-center px-6 py-20 lg:px-10">
          <section className="w-full rounded-[2.5rem] border border-gray-800 bg-[#141414] p-10 text-center shadow-xl md:p-14">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10 text-3xl text-amber-500">
              ✓
            </div>
            <div className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">
              Payment Successful
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Thanks for your payment
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
              Your order has been received successfully. We will begin processing your monthly AI SEO service and follow up using the details you provided.
            </p>

            <div className="mx-auto mt-10 grid max-w-2xl gap-4 text-left sm:grid-cols-2">
              <div className="rounded-2xl bg-[#1a1a1a] p-5 ring-1 ring-gray-800">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Customer</div>
                <div className="mt-2 text-lg font-semibold text-white">{form.fullName || 'Your name'}</div>
                <div className="mt-1 text-gray-400">{form.email || 'your@email.com'}</div>
              </div>
              <div className="rounded-2xl bg-[#1a1a1a] p-5 ring-1 ring-gray-800">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Plan</div>
                <div className="mt-2 text-lg font-semibold text-white">Monthly AI SEO Service</div>
                <div className="mt-1 text-gray-400">$150 / month · No setup fee</div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => goTo('#home')}
                className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition hover:scale-[1.02]"
              >
                Return to homepage
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  /* ───────── HOME PAGE ───────── */
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <SiteHeader />

      {/* ── HERO ── */}
      <section id="home" className="relative overflow-hidden border-t border-gray-800/70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,170,62,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(217,170,62,0.06),transparent_30%)]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-28">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-400 shadow-sm">
              AI SEO Marketing Services
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              SEO architecture audits, keyword ranking reports, and clear monthly action plans.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-400">
              We review your website's SEO architecture, keyword ranking performance, technical issues, metadata, indexing signals, and internal linking structure — then turn the findings into a clean monthly report with clear next steps.
            </p>

            <p className="mt-5 text-xl font-semibold text-amber-400">$150/month. No setup fee.</p>

            <div className="mt-9 flex flex-wrap gap-4">
              <button
                onClick={() => goTo('#checkout')}
                className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition hover:scale-[1.02]"
              >
                Get My SEO Report
              </button>

              <a
                href="#case-study"
                className="rounded-full border border-gray-700 bg-[#141414] px-7 py-4 text-sm font-semibold text-gray-300 transition hover:border-amber-500/50 hover:text-amber-400"
              >
                View Case Study
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                ['Monthly Reports', 'Clear SEO findings every 30 days'],
                ['AI Technical Audit', 'Structure, metadata, and Google checks'],
                ['Simple Pricing', 'One flat fee, no setup cost'],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-3xl border border-gray-800 bg-[#141414] p-5 shadow-sm"
                >
                  <div className="text-sm font-semibold text-amber-400">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-gray-500">{text}</div>
                </div>
              ))}
            </div>

            <div className="mt-14">
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">Who This Is For</div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {whoFor.map((item) => (
                  <div key={item} className="rounded-2xl bg-[#141414] p-4 text-sm text-gray-400 shadow-sm ring-1 ring-gray-800">
                    <span className="text-amber-500">✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="rounded-[2rem] border border-amber-500/20 bg-[#111111] p-7 text-white shadow-2xl shadow-amber-500/5">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-[#1a1a0a] via-[#111111] to-[#0d0d00] p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm uppercase tracking-[0.22em] text-amber-400">Live Service Snapshot</div>
                    <div className="mt-3 text-3xl font-semibold">AI SEO Report</div>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/90 text-2xl text-black">
                    ✓
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-amber-500/10 bg-amber-500/5 px-4 py-3 text-base text-gray-200"
                    >
                      <span className="text-amber-400">→</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5">
                  <div className="text-sm uppercase tracking-[0.2em] text-amber-300">What clients want</div>
                  <div className="mt-3 text-lg font-semibold text-white">
                    Clear SEO problems. Clear next steps. No agency complexity.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST POINTS ── */}
      <section className="mx-auto max-w-7xl px-6 py-4 lg:px-10">
        <div className="grid gap-4 md:grid-cols-4">
          {trustPoints.map((item) => (
            <div key={item} className="rounded-[1.75rem] bg-[#141414] px-6 py-5 shadow-sm ring-1 ring-gray-800">
              <div className="text-sm font-semibold text-gray-200"><span className="text-amber-500">✓</span> {item}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY SEO MATTERS ── */}
      <section id="why-seo" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="rounded-[2.5rem] border border-amber-500/20 bg-gradient-to-br from-[#141410] via-[#0f0f0a] to-[#0a0a0a] p-10 shadow-xl shadow-amber-500/5 md:p-14">
          <div className="text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">Why SEO Matters</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Without SEO, your website is invisible
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
              Search engine optimization is not optional — it is the foundation of how customers discover your business online. Companies that ignore SEO lose traffic, leads, and revenue to competitors who invest in it. Every day without proper SEO is a day your competitors are outranking you.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whySeoMatters.map((item) => (
              <div key={item.stat} className="rounded-[1.5rem] border border-amber-500/10 bg-[#0a0a0a] p-6 text-center">
                <div className="text-4xl font-bold text-amber-400">{item.stat}</div>
                <div className="mt-3 text-sm leading-6 text-gray-400">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-4xl space-y-6">
            <div className="rounded-[1.5rem] border border-gray-800 bg-[#111111] p-6">
              <h3 className="text-lg font-semibold text-amber-400">SEO drives the highest-quality traffic</h3>
              <p className="mt-2 text-base leading-7 text-gray-400">
                Organic search delivers visitors who are actively looking for your products or services. Unlike paid ads that stop the moment you stop paying, SEO compounds over time — building a sustainable pipeline of leads and customers.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-gray-800 bg-[#111111] p-6">
              <h3 className="text-lg font-semibold text-amber-400">Your competitors are investing in SEO right now</h3>
              <p className="mt-2 text-base leading-7 text-gray-400">
                If you are not actively monitoring your SEO health, someone else is ranking for the keywords your customers use to find businesses like yours. The longer you wait, the harder and more expensive it becomes to catch up.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-gray-800 bg-[#111111] p-6">
              <h3 className="text-lg font-semibold text-amber-400">Technical SEO issues silently kill your rankings</h3>
              <p className="mt-2 text-base leading-7 text-gray-400">
                Broken links, missing metadata, poor indexing coverage, and weak site architecture can cause Google to deprioritize your pages — even if your content is excellent. Regular audits catch these problems before they cost you traffic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] bg-[#141414] p-10 shadow-sm ring-1 ring-gray-800">
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">What You Get</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white">
              Monthly AI SEO service built for clarity and action.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-400">
              This service is designed for businesses that need a premium but simple SEO monitoring system. Every month, we inspect your website with AI and give you a concise, actionable report that shows what matters most.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {deliverables.map((item) => (
              <div
                key={item}
                className="rounded-[2rem] bg-[#141414] p-6 shadow-sm ring-1 ring-gray-800 transition hover:-translate-y-1 hover:ring-amber-500/30"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
                  ✓
                </div>
                <div className="text-lg font-semibold leading-7 text-gray-200">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDY: PACK EXPO ── */}
      <section id="case-study" className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="rounded-[2.5rem] border border-gray-800 bg-[#141414] p-10 shadow-sm md:p-14">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">Real Case Study</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              PACK EXPO International — Marketing Audit Report
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-400">
              We analyzed packexpointernational.com, one of the largest packaging trade shows in North America with 77,500 attendees and 2,600+ exhibitors. Our audit uncovered significant opportunities across 6 categories — proving that even major brands have critical SEO and marketing gaps.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            {/* Score Breakdown */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[2rem] bg-[#1a1a1a] p-7 ring-1 ring-gray-800">
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-500">Overall Score</div>
                <div className="mt-5 flex items-end gap-2">
                  <span className="text-6xl font-bold text-amber-400">66</span>
                  <span className="mb-2 text-2xl text-gray-500">/100</span>
                </div>
                <div className="mt-2 text-lg font-semibold text-amber-500">Grade: C+</div>
                <div className="mt-4 space-y-3 text-sm text-gray-400">
                  <div className="flex justify-between"><span>Content & Messaging</span><span className="text-gray-200">62/100</span></div>
                  <div className="flex justify-between"><span>Conversion Optimization</span><span className="text-amber-400">52/100</span></div>
                  <div className="flex justify-between"><span>SEO & Discoverability</span><span className="text-gray-200">72/100</span></div>
                  <div className="flex justify-between"><span>Competitive Positioning</span><span className="text-gray-200">67/100</span></div>
                  <div className="flex justify-between"><span>Brand & Trust</span><span className="text-gray-200">74/100</span></div>
                  <div className="flex justify-between"><span>Growth & Strategy</span><span className="text-green-400">82/100</span></div>
                </div>
              </div>

              <div className="rounded-[2rem] bg-[#1a1a1a] p-7 ring-1 ring-amber-500/20">
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-500">Key Findings</div>
                <div className="mt-5 space-y-4 text-sm text-gray-300">
                  <div className="rounded-xl bg-red-500/10 p-3 text-red-400">Critical: No urgency mechanics on $30 early bird pricing</div>
                  <div className="rounded-xl bg-red-500/10 p-3 text-red-400">Critical: Homepage headline fails 5-second test</div>
                  <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400">High: Missing Event schema JSON-LD markup</div>
                  <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400">High: Zero competitor comparison content</div>
                  <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">Medium: Meta description exceeds 160 chars</div>
                </div>
              </div>
            </div>

            {/* Impact Summary */}
            <div className="rounded-[2rem] border border-amber-500/20 bg-[#111111] p-8 text-white shadow-xl shadow-amber-500/5">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-400">Impact Analysis</div>
              <h3 className="mt-4 text-3xl font-semibold">$200K–$575K/mo potential</h3>
              <p className="mt-5 text-base leading-7 text-gray-400">
                Our analysis found that implementing all recommendations could drive an estimated $200,000–$575,000/month in incremental value through increased registrations, higher exhibitor conversion rates, and improved retention.
              </p>

              <div className="mt-8 space-y-4 text-base text-gray-200">
                <div><span className="text-amber-500">✔</span> Identified conversion optimization gaps (52/100)</div>
                <div><span className="text-amber-500">✔</span> Flagged missing structured data for Google rich results</div>
                <div><span className="text-amber-500">✔</span> Mapped competitive positioning vs Interpack, FachPack, ProPak</div>
                <div><span className="text-amber-500">✔</span> Delivered prioritized action plan: quick wins → strategic</div>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-amber-500/10 bg-amber-500/5 p-6">
                <div className="text-sm uppercase tracking-[0.2em] text-gray-400">Estimated Impact</div>
                <div className="mt-3 text-3xl font-semibold text-amber-400">+15–25% registration conversion</div>
              </div>

              <a
                href="/case-study-pack-expo.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition hover:scale-[1.02]"
              >
                Download Full Case Study PDF →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((item) => (
            <div key={item} className="rounded-[2rem] bg-[#141414] p-7 shadow-sm ring-1 ring-gray-800 transition hover:ring-amber-500/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-xl text-amber-500">
                ✦
              </div>
              <div className="mt-5 text-lg font-semibold leading-7 text-gray-200">{item}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-10 text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">How It Works</div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            A simple 3-step process
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {process.map((item) => (
            <div key={item.step} className="rounded-[2rem] bg-[#141414] p-8 shadow-sm ring-1 ring-gray-800">
              <div className="text-sm font-semibold tracking-[0.25em] text-amber-500">{item.step}</div>
              <h3 className="mt-4 text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-gray-400">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT WE FOCUS ON ── */}
      <section id="team" className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-500 px-8 py-16 text-center shadow-xl shadow-amber-500/10 md:px-16">
          <div className="text-sm font-semibold uppercase tracking-[0.28em] text-black/60">What We Focus On</div>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-black md:text-5xl">
            We help businesses improve SEO structure, reporting, and keyword visibility.
          </h2>
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-black/30" />
          <p className="mx-auto mt-10 max-w-4xl text-xl leading-9 text-black/80">
            Our service is built around three core areas: SEO architecture, monthly reporting, and keyword ranking analysis. We review how your website is structured, how search engines interpret it, and where visibility can be improved.
          </p>
          <p className="mx-auto mt-8 max-w-4xl text-lg leading-8 text-black/70">
            Instead of overwhelming clients with scattered data, we organize technical SEO findings, ranking insights, and site structure issues into a report that is simple, useful, and actionable.
          </p>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="mx-auto max-w-5xl px-6 pb-10 pt-20 lg:px-10">
        <div className="rounded-[2.5rem] border border-gray-800 bg-[#141414] p-10 text-center shadow-xl shadow-amber-500/5 md:p-14">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">Pricing</div>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            One monthly SEO architecture and reporting service. One simple price.
          </h2>
          <div className="mt-8 text-6xl font-semibold tracking-tight text-white">
            $150<span className="text-2xl text-gray-500">/month</span>
          </div>
          <p className="mt-4 text-xl font-medium text-amber-400">No setup fee. No unnecessary complexity.</p>

          <div className="mx-auto mt-10 grid max-w-3xl gap-4 text-left sm:grid-cols-2">
            {[
              'Monthly SEO report',
              'Full SEO architecture review',
              'Keyword ranking tracking',
              'Metadata and indexing checks',
              'Technical SEO fixes and recommendations',
              'Clear monthly reporting experience',
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-[#1a1a1a] px-5 py-4 text-base text-gray-300 ring-1 ring-gray-800"
              >
                <span className="text-amber-500">✓</span> {item}
              </div>
            ))}
          </div>

          <button
            onClick={() => goTo('#checkout')}
            className="mt-10 inline-flex rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition hover:scale-[1.02]"
          >
            Get My SEO Report
          </button>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
        <div className="rounded-[2.5rem] border border-gray-800 bg-[#141414] p-10 shadow-sm md:p-14">
          <div className="text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">Frequently Asked Questions</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white">
              Simple answers for new clients
            </h2>
          </div>
          <div className="mt-10 grid gap-4">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-[1.75rem] bg-[#1a1a1a] p-6 ring-1 ring-gray-800">
                <div className="text-lg font-semibold text-white">{item.q}</div>
                <div className="mt-2 text-base leading-7 text-gray-400">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-12 lg:px-10">
        <div className="rounded-[2.5rem] border border-amber-500/20 bg-[#111111] px-8 py-12 text-center text-white shadow-xl shadow-amber-500/5 md:px-14">
          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">Ready to start?</div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Get your first AI SEO report started today
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
            Submit your website, complete checkout, and we'll begin your monthly SEO reporting workflow.
          </p>
          <button
            onClick={() => goTo('#checkout')}
            className="mt-8 inline-flex rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition hover:scale-[1.02]"
          >
            Get My SEO Report
          </button>
        </div>
      </section>
    </div>
  );
}

/* ───────── SITE HEADER ───────── */
function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800/70 bg-[#0a0a0a]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <a href="#home" className="text-left">
          <div className="text-3xl font-semibold tracking-tight text-white">
            Rank<span className="text-amber-500">Frame</span> SEO
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.28em] text-gray-500">SEO Architecture & Reporting</div>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-400 md:flex">
          <a href="#why-seo" className="transition hover:text-amber-400">Why SEO</a>
          <a href="#services" className="transition hover:text-amber-400">Services</a>
          <a href="#case-study" className="transition hover:text-amber-400">Case Study</a>
          <a href="#how-it-works" className="transition hover:text-amber-400">How It Works</a>
          <a href="#pricing" className="transition hover:text-amber-400">Pricing</a>
        </nav>
      </div>
    </header>
  );
}

function getRoute() {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'checkout') return 'checkout';
  if (hash === 'success') return 'success';
  return 'home';
}
