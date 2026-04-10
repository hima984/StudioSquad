import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Check, Star, Brush, Users, Zap,
  ChevronRight, Play, Award, TrendingUp, Heart
} from 'lucide-react';

/* ── Utility: fade-in-up on scroll ─────────────────────────── */
const useScrollReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* ── Gallery images (Unsplash – placeholder until user adds own) */
const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80', span: 'row-span-2', label: 'Portrait Study' },
  { url: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=400&q=80', span: '', label: 'Abstract Flow' },
  { url: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=400&q=80', span: '', label: 'Light & Shadow' },
  { url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80', span: 'col-span-2', label: 'Cityscape Sketch' },
  { url: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=500&q=80', span: 'row-span-2', label: 'Digital Surreal' },
  { url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80', span: '', label: 'Color Study' },
];

/* ── Pricing Plans ─────────────────────────────────────────── */
const plans = [
  {
    name: 'Basic Artist',
    emoji: '🎨',
    price: '₹49',
    period: '/month',
    color: 'from-amber-50 to-orange-50',
    border: 'border-orange-200',
    btn: 'bg-[#4e342e] text-white hover:bg-[#3e2723]',
    features: [
      'Access to 20+ beginner tutorials',
      'Community forum access',
      'Monthly live Q&A session',
      'Basic feedback on 2 works/month',
    ],
  },
  {
    name: 'Pro Artist',
    emoji: '✨',
    price: '₹149',
    period: '/month',
    popular: true,
    color: 'from-[#4e342e] to-[#3e2723]',
    border: 'border-transparent',
    textDark: true,
    btn: 'bg-[#d35400] text-white hover:bg-[#c04e00]',
    features: [
      'Unlimited tutorial access',
      'Priority mentor feedback',
      '2 live critique sessions/month',
      'Portfolio hosting included',
      'Artist badge on profile',
    ],
  },
  {
    name: 'Squad Leader',
    emoji: '🚀',
    price: '₹399',
    period: '/month',
    color: 'from-amber-50 to-orange-50',
    border: 'border-orange-200',
    btn: 'bg-[#4e342e] text-white hover:bg-[#3e2723]',
    features: [
      'Everything in Pro Artist',
      'Host your own studio group',
      'Revenue sharing on workshops',
      '1:1 coach session / month',
      'Verified Creator badge',
    ],
  },
];

/* ── Testimonials ───────────────────────────────────────────── */
const testimonials = [
  { name: 'Aisha R.', tag: 'Illustrator · Mumbai', text: "StudioSquad completely changed how I think about my art. The feedback I got in week 1 alone was worth 10x the subscription.", rating: 5, avatar: 'AR' },
  { name: 'Kiran M.', tag: 'UI Designer · Bangalore', text: "I lurked for years on other platforms. Here I actually post and get real responses. The community is warm and incredibly talented.", rating: 5, avatar: 'KM' },
  { name: 'Dev P.', tag: 'Concept Artist · Pune', text: "Mentor feedback is gold. My portfolio quality jumped and I landed my first freelance client within two months!", rating: 5, avatar: 'DP' },
  { name: 'Neha S.', tag: 'Watercolor Artist · Delhi', text: "Music, dance, painting — my friends finally have a space. StudioSquad is what the internet needed for Indian creatives.", rating: 5, avatar: 'NS' },
  { name: 'Tanmay V.', tag: 'Photographer · Hyderabad', text: "The gallery feature is stunning. I've had my work featured twice on the home page and my Instagram grew by 3K followers because of it.", rating: 5, avatar: 'TV' },
  { name: 'Priya K.', tag: 'Sculptor · Chennai', text: "I almost gave up on art after college. This community reminded me why I fell in love with it. Truly life-changing.", rating: 5, avatar: 'PK' },
];

/* ── Brand logos (simple text logos for now) ─────────────────── */
const brandLogos = [
  { name: 'Adobe', icon: '🅰' },
  { name: 'Behance', icon: '🅱' },
  { name: 'Procreate', icon: '✏' },
  { name: 'Canva', icon: '🎨' },
  { name: 'Figma', icon: '🔷' },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/*  MAIN COMPONENT                                              */
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const Home = () => {
  return (
    <div className="w-full overflow-x-hidden bg-[#faf7f2]">

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image + gradient overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&q=85"
            alt="Artists collaborating"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2c1a12]/80 via-[#4e342e]/60 to-[#3e2723]/85" />
          {/* Subtle noise texture film */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '256px 256px' }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white/80 text-xs font-medium mb-8"
            style={{ animation: 'fadeInDown 0.8s ease forwards' }}
          >
            <Zap size={12} className="text-yellow-300" />
            Join 12,000+ artists already in the squad
          </div>

          <h1
            className="text-5xl md:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6"
            style={{ animation: 'fadeInUp 0.9s ease 0.1s both' }}
          >
            Turn your passion into a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-200">
              paycheck
            </span>
            {' '}— without selling your soul.
          </h1>

          <p
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ animation: 'fadeInUp 0.9s ease 0.25s both' }}
          >
            StudioSquad is where Indian artists level up — through community mentorship, real feedback, and a squad that actually gets it.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ animation: 'fadeInUp 0.9s ease 0.4s both' }}
          >
            <Link
              to="/signup"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#d35400] text-white font-semibold text-sm hover:bg-[#c04e00] transition-all duration-300 hover:shadow-lg hover:shadow-[#d35400]/30 hover:-translate-y-0.5"
            >
              Join the Community
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white font-semibold text-sm hover:bg-white/25 transition-all duration-300"
            >
              <Play size={14} fill="white" />
              See how it works
            </Link>
          </div>

          {/* Social proof row */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-1.5">
              <Users size={14} />
              <span>12K+ Members</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-1.5">
              <Star size={14} className="text-yellow-300 fill-yellow-300" />
              <span>4.9 / 5 Rating</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-1.5">
              <Award size={14} />
              <span>Officially partnered</span>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40 text-xs" style={{ animation: 'bounce 2s infinite' }}>
          <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/50 rounded-full" style={{ animation: 'scrollDot 1.5s infinite' }} />
          </div>
          Scroll
        </div>
      </section>

      {/* ── 2. COMMUNITY FEATURE ────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#4e342e] via-[#5d3a2e] to-[#3e2723] py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <Reveal delay={0}>
            <p className="text-orange-300 text-sm font-semibold uppercase tracking-widest mb-4">For creators, by creators</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Affordable art communities built by students, for students.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Premier membership: Get access to live sessions, mentor critiques, peer feedback loops, and a squad that hustles alongside you — all at chai prices.
            </p>
            <div className="flex flex-col gap-3 mb-10">
              {[
                { icon: <Users size={16} />, text: 'Connect with 500+ active creatives every week' },
                { icon: <TrendingUp size={16} />, text: 'Grow your portfolio with structured challenges' },
                { icon: <Heart size={16} />, text: 'Get real, warm feedback — not generic comments' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-white/70 text-sm">
                  <span className="text-orange-300 flex-shrink-0">{icon}</span>
                  {text}
                </div>
              ))}
            </div>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d35400] text-white font-semibold text-sm hover:bg-[#c04e00] transition-all duration-300 hover:-translate-y-0.5"
            >
              Join Now <ChevronRight size={16} />
            </Link>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=700&q=80"
                  alt="Art community session"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3e2723]/60 to-transparent" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Brush size={18} className="text-[#d35400]" />
                </div>
                <div>
                  <p className="text-xs text-[#4e342e]/60 font-medium">This week</p>
                  <p className="text-sm font-bold text-[#4e342e]">247 artworks shared</p>
                </div>
              </div>
              {/* Avatar stack */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['🎨', '✏️', '🖌️', '📸'].map((emoji, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-200 to-amber-100 border-2 border-white flex items-center justify-center text-xs">{emoji}</div>
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#4e342e]">+12K</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. GALLERY ──────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#faf7f2]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="mb-12">
              <p className="text-[#d35400] text-sm font-semibold uppercase tracking-widest mb-2">Community showcase</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#4e342e]">Works that made us go <span className="italic text-[#d35400]">"damn"</span></h2>
              <p className="text-[#4e342e]/60 mt-3 text-base">Real art. Real students. Real effort.</p>
            </div>
          </Reveal>

          {/* Grid */}
          <div className="grid grid-cols-3 grid-rows-3 gap-3 h-[600px]">
            {galleryImages.map((img, i) => (
              <Reveal key={i} delay={i * 80} className={`${img.span} overflow-hidden rounded-2xl group relative`}>
                <img
                  src={img.url}
                  alt={img.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-semibold">{img.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PRICING ──────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#faf7f2] to-[#f4ede4]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-[#d35400] text-sm font-semibold uppercase tracking-widest mb-2">Pricing</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#4e342e] mb-4">Invest in your craft</h2>
              <p className="text-[#4e342e]/60 text-lg max-w-lg mx-auto">Plans that grow with you — from curious beginner to full-time creator.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100}>
                <div
                  className={`relative rounded-3xl p-8 border-2 ${plan.border} bg-gradient-to-br ${plan.color} h-full flex flex-col ${plan.popular ? 'shadow-2xl scale-[1.025]' : 'shadow-md hover:shadow-xl'} transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d35400] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <span className="text-3xl">{plan.emoji}</span>
                    <h3 className={`text-xl font-bold mt-3 ${plan.popular ? 'text-white' : 'text-[#4e342e]'}`}>{plan.name}</h3>
                    <div className="flex items-end gap-1 mt-2">
                      <span className={`text-4xl font-extrabold ${plan.popular ? 'text-white' : 'text-[#4e342e]'}`}>{plan.price}</span>
                      <span className={`text-sm mb-1.5 ${plan.popular ? 'text-white/60' : 'text-[#4e342e]/50'}`}>{plan.period}</span>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${plan.popular ? 'bg-white/20' : 'bg-[#d35400]/15'}`}>
                          <Check size={10} className={plan.popular ? 'text-white' : 'text-[#d35400]'} />
                        </div>
                        <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-[#4e342e]/70'}`}>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/signup"
                    className={`w-full text-center py-3 rounded-2xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 ${plan.btn}`}
                  >
                    Start for {plan.price}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="text-center text-[#4e342e]/40 text-sm mt-8">No contracts. Cancel anytime. 7-day free trial on Pro.</p>
          </Reveal>
        </div>
      </section>

      {/* ── 5. TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#4e342e]/5">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-[#d35400] text-sm font-semibold uppercase tracking-widest mb-2">Testimonials</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#4e342e]">Real students, real words</h2>
              <div className="flex items-center justify-center gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
                <span className="ml-2 text-[#4e342e]/60 text-sm font-medium">Rated 4.9 by 2,400+ members</span>
              </div>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 70}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-[#4e342e]/8 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-200 to-amber-100 flex items-center justify-center font-bold text-[#4e342e] text-sm flex-shrink-0">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-[#4e342e] text-sm">{t.name}</p>
                      <p className="text-[#4e342e]/50 text-xs">{t.tag}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={11} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[#4e342e]/70 text-sm leading-relaxed flex-1">"{t.text}"</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA BANNER ───────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#4e342e] to-[#3e2723] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #d35400 0%, transparent 50%), radial-gradient(circle at 80% 20%, #ffd700 0%, transparent 50%)' }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Your next chapter as an artist starts <span className="text-orange-300">now.</span>
            </h2>
            <p className="text-white/60 text-lg mb-10">Join thousands of Indian creatives who stopped waiting and started creating.</p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#d35400] text-white font-bold text-base hover:bg-[#c04e00] transition-all duration-300 hover:shadow-xl hover:shadow-[#d35400]/30 hover:-translate-y-1"
            >
              Create Your Free Account
              <ArrowRight size={18} />
            </Link>
            <p className="text-white/30 text-sm mt-5">Free 7-day trial · No credit card required</p>
          </Reveal>
        </div>
      </section>

      {/* ── 7. FOOTER LOGOS ─────────────────────────────────────── */}
      <section className="py-10 px-6 bg-[#faf7f2] border-t border-[#4e342e]/8">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-[#4e342e]/40 text-xs uppercase tracking-widest mb-6">Trusted and used by members at</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {brandLogos.map((brand) => (
              <div key={brand.name} className="flex items-center gap-2 text-[#4e342e]/30 hover:text-[#4e342e]/60 transition-colors duration-200">
                <span className="text-2xl grayscale opacity-50">{brand.icon}</span>
                <span className="font-semibold text-sm">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

/* ── Global keyframes (injected via a style tag) ────────────── */
const styles = `
  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50%       { transform: translateX(-50%) translateY(6px); }
  }
  @keyframes scrollDot {
    0%   { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(8px); }
  }
`;

const HomeWithStyles = () => (
  <>
    <style>{styles}</style>
    <Home />
  </>
);

export default HomeWithStyles;
