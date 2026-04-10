import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brush, Check } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────
   Onboarding.jsx
   Multi-step interest picker → saves to localStorage → /dashboard
───────────────────────────────────────────────────────────────── */

/* ── Onboarding step data ─────────────────────────────────────── */
const steps = [
  {
    title: 'Visual & Artistic Creation',
    domains: [
      { id: 'graphic-design',   label: 'Graphic Design',  emoji: '🎨' },
      { id: 'illustration',     label: 'Illustration',    emoji: '✏️' },
      { id: 'digital-art',      label: 'Digital Art',     emoji: '🖥️' },
      { id: 'photography',      label: 'Photography',     emoji: '📸' },
      { id: 'handmade-crafts',  label: 'Handmade Crafts', emoji: '🧶' },
      { id: 'animation',        label: 'Animation',       emoji: '🎬' },
      { id: 'uiux-design',      label: 'UI/UX Design',    emoji: '🔷' },
      { id: 'character-design', label: 'Character Design',emoji: '🧑‍🎨' },
      { id: 'concept-art',      label: 'Concept Art',     emoji: '🐉' },
    ],
  },
  {
    title: 'Digital Content, Media & Growth',
    domains: [
      { id: 'writing',          label: 'Writing & Storytelling', emoji: '📝' },
      { id: 'content-creation', label: 'Content Creation',       emoji: '🎙️' },
      { id: 'video-editing',    label: 'Video Editing',          emoji: '🎞️' },
      { id: 'music-production', label: 'Music Production',       emoji: '🎵' },
      { id: 'web-dev',          label: 'Web Development',        emoji: '💻' },
      { id: 'marketing',        label: 'Marketing & Branding',   emoji: '📣' },
      { id: 'social-media',     label: 'Social Media',           emoji: '📱' },
    ],
  },
];

const TOTAL_STEPS = steps.length;

/* ── Domain chip (selectable interest card) ───────────────────── */
const DomainChip = ({ label, emoji, selected, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className={`
      relative inline-flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-medium
      transition-all duration-200 hover:scale-[1.04] active:scale-95
      ${selected
        ? 'bg-[#f4ede4] border-[#f4ede4] text-[#4e342e] shadow-lg shadow-black/20'
        : 'bg-white/8 border-white/20 text-white/80 hover:border-white/40 hover:bg-white/15'
      }
    `}
  >
    <span className="text-base leading-none">{emoji}</span>
    {label}

    {/* Check badge on selected chips */}
    {selected && (
      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#d35400] rounded-full flex items-center justify-center">
        <Check size={9} className="text-white" />
      </span>
    )}
  </button>
);

/* ── Progress bar ─────────────────────────────────────────────── */
const ProgressBar = ({ current, total }) => (
  <div className="w-full h-[6px] bg-white/10 rounded-full overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-[#d35400] to-[#f4a261] rounded-full transition-all duration-700 ease-out"
      style={{ width: `${(current / total) * 100}%` }}
    />
  </div>
);

/* ── Welcome / completion screen ──────────────────────────────── */
const WelcomeScreen = ({ selections, onFinish }) => {
  // Flatten all selected domain IDs
  const allSelected = Object.values(selections).flat();

  useEffect(() => {
    // Auto-navigate to dashboard after 2.8 seconds
    const timer = setTimeout(onFinish, 2800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
      {/* Animated sparkle */}
      <div
        className="text-7xl mb-6 select-none"
        style={{ animation: 'popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both' }}
      >
        ✨
      </div>

      <h1
        className="text-4xl md:text-5xl font-extrabold text-[#f4ede4] leading-tight mb-4"
        style={{ animation: 'fadeUp 0.7s ease 0.2s both' }}
      >
        Welcome to your<br />creative tribe!
        <span className="inline-block ml-3 animate-bounce">✨</span>
      </h1>

      <p
        className="text-white/55 text-lg mb-10 max-w-sm"
        style={{ animation: 'fadeUp 0.7s ease 0.4s both' }}
      >
        We're curating your perfect squad based on your interests.
      </p>

      {/* Selected tags preview */}
      {allSelected.length > 0 && (
        <div
          className="flex flex-wrap justify-center gap-2 max-w-xl mb-10"
          style={{ animation: 'fadeUp 0.7s ease 0.55s both' }}
        >
          {allSelected.map((id) => {
            const domain = steps.flatMap(s => s.domains).find(d => d.id === id);
            return domain ? (
              <span
                key={id}
                className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/70 text-xs font-medium"
              >
                {domain.emoji} {domain.label}
              </span>
            ) : null;
          })}
        </div>
      )}

      {/* Loading bar animation */}
      <div
        className="w-48 h-1 bg-white/10 rounded-full overflow-hidden"
        style={{ animation: 'fadeUp 0.7s ease 0.7s both' }}
      >
        <div
          className="h-full bg-[#d35400] rounded-full"
          style={{ animation: 'loadBar 2.5s ease forwards 0.3s' }}
        />
      </div>
      <p className="text-white/30 text-xs mt-2" style={{ animation: 'fadeUp 0.7s ease 0.8s both' }}>
        Setting up your dashboard…
      </p>
    </div>
  );
};

/* ─── MAIN ONBOARDING COMPONENT ───────────────────────────────── */
const Onboarding = () => {
  const navigate = useNavigate();

  // step: 0 = step 1, 1 = step 2, TOTAL_STEPS = welcome screen
  const [step, setStep] = useState(0);

  // selections: { 0: Set<id>, 1: Set<id> }
  const [selections, setSelections] = useState({ 0: new Set(), 1: new Set() });

  /* ── Toggle interest selection ── */
  const toggle = (id) => {
    if (step >= TOTAL_STEPS) return;
    setSelections(prev => {
      const next = new Set(prev[step]);
      next.has(id) ? next.delete(id) : next.add(id);
      return { ...prev, [step]: next };
    });
  };

  /* ── Move to next step or welcome screen ── */
  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(s => s + 1);
    } else {
      // Save interests to localStorage before showing welcome
      const flatInterests = [
        ...selections[0],
        ...selections[1],
      ];
      localStorage.setItem('userInterests', JSON.stringify(flatInterests));
      setStep(TOTAL_STEPS); // show the welcome / completion screen
    }
  };

  /* ── Skip current step ── */
  const handleSkip = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(s => s + 1);
    } else {
      // Even on skip, save whatever was selected
      const flatInterests = [...selections[0], ...selections[1]];
      localStorage.setItem('userInterests', JSON.stringify(flatInterests));
      setStep(TOTAL_STEPS);
    }
  };

  /* ── Navigate to dashboard when done ── */
  const handleFinish = () => navigate('/dashboard');

  /* ── Derived values ── */
  const isWelcome = step === TOTAL_STEPS;
  const currentStep = isWelcome ? null : steps[step];

  // Progress: halfway through step 0, full at step 1
  const progressValue = isWelcome
    ? TOTAL_STEPS
    : step + (step === 0 ? 0.5 : 1);

  // Flatten selections for the WelcomeScreen preview
  const flatSelections = {
    0: [...selections[0]],
    1: [...selections[1]],
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#5c2e0e] via-[#8b4513] to-[#6b3410]">

      {/* ── Top nav bar ───────────────────────────────────── */}
      <div className="flex-shrink-0 px-6 pt-5 pb-3">
        <div className="max-w-xl mx-auto flex items-center justify-between bg-[#3e2723] rounded-2xl px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#d35400] flex items-center justify-center">
              <Brush size={14} className="text-white" />
            </div>
            <span className="text-white font-bold text-base">StudioSquad</span>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-white/50 hover:text-white/90 text-sm font-medium transition-colors"
          >
            Skip all →
          </button>
        </div>
      </div>

      {/* ── Progress bar ──────────────────────────────────── */}
      <div className="flex-shrink-0 px-6 pt-2 pb-1">
        <ProgressBar current={progressValue} total={TOTAL_STEPS} />
      </div>

      {/* ── Main content area ─────────────────────────────── */}
      {isWelcome ? (
        /* Welcome / completion screen */
        <WelcomeScreen
          selections={flatSelections}
          onFinish={handleFinish}
        />
      ) : (
        /* Interest selection step */
        <div
          key={step}
          className="flex-1 flex flex-col items-center justify-center px-6 py-8"
          style={{ animation: 'slideIn 0.4s ease both' }}
        >
          {/* Header text */}
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#f4ede4] mb-2 leading-snug">
              Let's find your people! What are you passionate about?
            </h1>
            <p className="text-white/55 text-sm md:text-base">
              Pick a few interests so we can show you the right communities
            </p>
          </div>

          {/* Step counter + category label */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#f4ede4]/50 text-lg font-bold tabular-nums">
              {step + 1} / {TOTAL_STEPS}
            </span>
            <span className="text-[#f4ede4] text-lg font-semibold">
              {currentStep.title}
            </span>
          </div>

          {/* Selectable domain chips */}
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mb-12">
            {currentStep.domains.map(({ id, label, emoji }) => (
              <DomainChip
                key={id}
                label={label}
                emoji={emoji}
                selected={selections[step].has(id)}
                onToggle={() => toggle(id)}
              />
            ))}
          </div>

          {/* Next / Finish button */}
          <button
            onClick={handleNext}
            className="px-16 py-4 rounded-full bg-[#f4ede4] text-[#4e342e] font-bold text-lg
              hover:bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30
              active:scale-95 active:translate-y-0"
          >
            {step < TOTAL_STEPS - 1 ? 'Next →' : 'Finish Setup ✓'}
          </button>

          {/* Skip link */}
          <button
            onClick={handleSkip}
            className="mt-5 text-white/30 hover:text-white/60 text-sm transition-colors"
          >
            Skip for now
          </button>
        </div>
      )}

      {/* ── Keyframe animations ───────────────────────────── */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.4) rotate(-15deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes loadBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Onboarding;
