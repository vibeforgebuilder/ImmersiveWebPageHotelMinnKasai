import React, { useState } from 'react';
import { ArrowDown, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

interface HeroSectionProps {
  onStartTour: () => void;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartTour, onOpenBooking }) => {
  const [portalGlow, setPortalGlow] = useState<'radiant' | 'subtle' | 'dusk'>('radiant');

  const glowShadows = {
    radiant: 'shadow-[0_0_90px_rgba(245,158,11,0.55),_inset_0_0_30px_rgba(245,158,11,0.4)] border-amber-300/80',
    subtle: 'shadow-[0_0_45px_rgba(245,158,11,0.3),_inset_0_0_15px_rgba(245,158,11,0.2)] border-amber-400/50',
    dusk: 'shadow-[0_0_20px_rgba(217,119,6,0.2)] border-amber-500/30',
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#0D0F12] text-white">
      {/* Background Architectural Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src={getAssetUrl('/assets/aistudio/1_d12b4430.webp')}
          alt="Minn Kasai illuminated entrance portal with geometric light gates at dusk"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.72] contrast-[1.08] transition-all duration-1000"
        />
        {/* Measured dark scrim for WCAG AA typography readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-[#0D0F12]/60 to-black/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0D0F12]/40 to-[#0D0F12]/90" />
      </div>

      {/* Top Architectural Subtitle & Status */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-12 md:pt-16">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-amber-300/90 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span>Tokyo, Edogawa-ku</span>
            <span aria-hidden="true">·</span>
            <span>Est. 2021 by SQUEEZE</span>
            <span aria-hidden="true">·</span>
            <span>Japandi Apartment Hotel</span>
          </div>

          {/* Interactive Portal Light Control */}
          <div className="flex items-center gap-1.5 p-1 bg-black/60 backdrop-blur-md rounded-md border border-white/10 text-[11px] font-sans">
            <span className="text-slate-400 px-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Portal Aura:
            </span>
            {(['radiant', 'subtle', 'dusk'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setPortalGlow(mode)}
                className={`px-2.5 py-1 rounded capitalize transition-all cursor-pointer ${
                  portalGlow === mode
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Center Cinematic Title & Light Gate Frame */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-8 md:py-16 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-2xl space-y-6">
          <p className="text-sm font-semibold tracking-wider text-amber-400 uppercase flex items-center gap-2">
            <span className="w-8 h-px bg-amber-400" />
            Your Second Home in Tokyo
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-display leading-[1.1] text-balance">
            Where Modern Architectural Light Meets Residential Serenity.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
            Step through the luminous nested Torii gates of Minn Kasai. Designed for extended stays,
            families, and Disney explorers seeking the spacious freedom of a private Tokyo apartment
            with refined boutique hotel hospitality.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onStartTour}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-semibold rounded-md transition-all shadow-[0_0_25px_rgba(251,191,36,0.4)] hover:shadow-[0_0_35px_rgba(251,191,36,0.6)] flex items-center gap-2.5 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-slate-950" />
              <span>Step Inside · Start Tour</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-md backdrop-blur-md border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Reserve Suite</span>
            </button>
          </div>
        </div>

        {/* Interactive Glowing Architectural Portal Visualizer */}
        <div className="relative shrink-0 w-72 h-80 sm:w-80 sm:h-96 rounded-xl overflow-hidden border border-white/20 bg-black/40 backdrop-blur-md p-4 flex flex-col justify-between group shadow-2xl">
          {/* Outer glowing portal simulation */}
          <div
            className={`absolute inset-4 rounded-lg border-2 transition-all duration-700 pointer-events-none ${glowShadows[portalGlow]}`}
          />
          {/* Inner concentric portal simulation */}
          <div
            className={`absolute inset-10 rounded-md border-2 transition-all duration-700 pointer-events-none opacity-85 ${glowShadows[portalGlow]}`}
          />

          <div className="relative z-10 flex justify-between items-start text-xs font-mono text-amber-200">
            <span>PORTAL GATE 01</span>
            <span className="text-[10px] bg-black/70 px-2 py-0.5 rounded text-amber-400 border border-amber-400/30">
              3000K WARM LED
            </span>
          </div>

          <div className="relative z-10 space-y-2 bg-black/80 backdrop-blur-md p-3.5 rounded-lg border border-white/10">
            <p className="text-xs font-semibold text-white">The Threshold Experience</p>
            <p className="text-[11px] text-slate-300 leading-snug">
              Twin rectangular light gates inspire mindfulness, transitioning travelers from transit to tranquil rest.
            </p>
            <button
              onClick={onStartTour}
              className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer pt-1"
            >
              <span>Explore architectural blueprints</span> →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Quantitative Rigor & Transit strip (Zero-Pill discipline) */}
      <div className="relative z-10 w-full bg-[#12151A]/85 backdrop-blur-lg border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-slate-300">
            <div>
              <p className="text-2xl font-bold font-display text-white tabular-nums">3 Min</p>
              <p className="text-xs text-slate-400 mt-0.5">Tozai Line Kasai Station</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-white tabular-nums">18 Min</p>
              <p className="text-xs text-slate-400 mt-0.5">Direct Disney Shuttle Bus</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-white tabular-nums">100%</p>
              <p className="text-xs text-slate-400 mt-0.5">Suites with IH Kitchens</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-white tabular-nums">1 Min</p>
              <p className="text-xs text-slate-400 mt-0.5">Supermarket & Dining Downstairs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
