import { useEffect, useMemo, useState } from 'react';

export default function RankFrameSEOLandingPage() {
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
      text: 'Send us your website details and we begin reviewing your SEO structure and keyword positioning.',
    },
    {
      step: '02',
      title: 'We audit your SEO setup',
      text: 'We analyze SEO architecture, internal linking, metadata, crawlability, indexing, and keyword visibility.',
    },
    {
      step: '03',
      title: 'Receive your report',
      text: 'You get a clean report with issues, opportunities, ranking insights, and clear next steps.',
    },
  ];

  const trustPoints = [
    'Focused on SEO architecture and reporting',
    'Keyword ranking visibility tracking',
    'Technical SEO checks with action steps',
    'Built for small businesses and growing teams',
  ];

  const sampleKeywords = [
    { keyword: 'local seo service', position: '#18', change: '+6' },
    { keyword: 'seo report service', position: '#11', change: '+4' },
    { keyword: 'technical seo audit', position: '#9', change: '+3' },
  ];

  const faqs = [
    {
      q: 'What happens after I subscribe?',
      a: 'You submit your site details, we begin reviewing your SEO structure, keyword visibility, and technical setup, and deliver your first report.',
    },
    {
      q: 'Is there any setup fee?',
      a: 'No. The service is a flat $150 per month with no setup charge.',
    },
    {
      q: 'What is included in the report?',
      a: 'SEO architecture review, keyword ranking tracking, metadata checks, indexing analysis, and technical SEO issues with action steps.',
    },
    {
      q: 'Who is this for?',
      a: 'Small businesses, startups, and website owners who want clear SEO direction without hiring a full agency.',
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

    const payload = { ...form };

    await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    window.location.href = stripeUrl;
  };

  if (route === 'checkout') {
    return (
      <div className="min-h-screen bg-[#f4f7fb] text-slate-800">
        <main className="mx-auto max-w-6xl px-6 py-20">
          <h1 className="text-3xl font-semibold mb-6">Enter your details</h1>

          <form onSubmit={handleCheckout} className="grid gap-4">
            <input name="fullName" placeholder="Full Name" onChange={handleInput} required />
            <input name="email" placeholder="Email" onChange={handleInput} required />
            <input name="website" placeholder="Website URL" onChange={handleInput} required />

            <button className="bg-teal-500 text-white py-3 rounded">
              Continue to Payment
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-500">
            You will be redirected to secure Stripe checkout for your SEO reporting service.
          </p>
        </main>
      </div>
    );
  }

  if (route === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-semibold">Payment Successful</h1>
          <p className="mt-4">We’ll begin your SEO report shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-slate-800">
      <main className="max-w-6xl mx-auto px-6 py-20">

        {/* HERO */}
        <h1 className="text-5xl font-semibold max-w-3xl">
          SEO architecture audits, keyword ranking reports, and clear monthly action plans.
        </h1>

        <p className="mt-6 text-lg max-w-2xl text-slate-600">
          We review your website’s SEO structure, keyword visibility, metadata, indexing signals, and technical issues — then turn everything into a clean report with clear next steps.
        </p>

        <button
          onClick={() => goTo('#checkout')}
          className="mt-8 bg-teal-500 text-white px-6 py-3 rounded"
        >
          Get My SEO Report
        </button>

        {/* TRUST */}
        <div className="grid md:grid-cols-4 gap-4 mt-16">
          {trustPoints.map((item) => (
            <div key={item} className="bg-white p-4 rounded shadow-sm">
              ✓ {item}
            </div>
          ))}
        </div>

        {/* KEYWORD SAMPLE */}
        <div className="mt-20">
          <h2 className="text-3xl font-semibold mb-6">Sample Keyword Rankings</h2>

          <div className="bg-white rounded shadow-sm p-6">
            {sampleKeywords.map((k) => (
              <div key={k.keyword} className="flex justify-between py-2 border-b">
                <span>{k.keyword}</span>
                <span>{k.position}</span>
                <span className="text-green-600">{k.change}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SERVICES */}
        <div className="mt-20 grid md:grid-cols-2 gap-6">
          {deliverables.map((item) => (
            <div key={item} className="bg-white p-6 rounded shadow-sm">
              {item}
            </div>
          ))}
        </div>

        {/* PROCESS */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {process.map((p) => (
            <div key={p.step} className="bg-white p-6 rounded shadow-sm">
              <div className="text-teal-500">{p.step}</div>
              <h3 className="text-xl font-semibold mt-2">{p.title}</h3>
              <p className="mt-2 text-slate-600">{p.text}</p>
            </div>
          ))}
        </div>

        {/* PRICING */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-semibold">Simple Pricing</h2>
          <p className="mt-4">$150 / month</p>

          <button
            onClick={() => goTo('#checkout')}
            className="mt-6 bg-teal-500 text-white px-6 py-3 rounded"
          >
            Get My SEO Report
          </button>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="text-3xl font-semibold mb-6">FAQ</h2>

          {faqs.map((f) => (
            <div key={f.q} className="mb-4">
              <div className="font-semibold">{f.q}</div>
              <div className="text-slate-600">{f.a}</div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}

function getRoute() {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'checkout') return 'checkout';
  if (hash === 'success') return 'success';
  return 'home';
}