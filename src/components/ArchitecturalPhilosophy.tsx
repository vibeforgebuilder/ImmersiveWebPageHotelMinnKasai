import React from 'react';
import { ARCHITECTURAL_PILLARS } from '../data/hotelData';
import { Compass, Sparkles, Feather, KeyRound } from 'lucide-react';

export const ArchitecturalPhilosophy: React.FC = () => {
  const icons = [Compass, Sparkles, Feather, KeyRound];

  return (
    <section id="concept" className="py-24 bg-[#11141A] text-white border-t border-white/10 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-16 space-y-4">
          <p className="text-xs font-mono uppercase tracking-widest text-amber-400">
            02 · Architectural Manifesto
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-white leading-tight">
            Designed as an Urban Sanctuary: The Psychology of Space & Light.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            In Tokyo's dense cityscape, conventional hotel rooms can feel claustrophobic. Minn Kasai was conceived by hospitality architects SQUEEZE to rethink the short-and-extended stay experience. By fusing the spatial generosity of a residential apartment with modern Japanese aesthetics, every corner encourages decompression and shared living.
          </p>
        </div>

        {/* 4 Pillars Grid (Clean human editorial numbering, no '//' comments) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {ARCHITECTURAL_PILLARS.map((pillar, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={pillar.number}
                className="bg-[#171B24] border border-white/10 rounded-2xl p-8 space-y-4 hover:border-amber-400/40 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-amber-400 font-semibold tracking-wider">
                      {pillar.number}. {pillar.subtitle}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold font-display text-white">
                  {pillar.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>

                <div className="pt-3 border-t border-white/10 text-xs font-mono text-slate-400">
                  <span className="text-amber-300/80">Materials: </span>
                  <span>{pillar.materials}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tactile Material Gallery Bento Strip */}
        <div className="bg-[#151921] border border-white/10 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <h3 className="text-xl font-bold font-display text-white">
                The Tactile Material Palette
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Authentic textures sourced to create sensory calm and enduring beauty.
              </p>
            </div>
            <div className="text-xs font-mono text-amber-400">
              JAPANDI MATERIAL SPECS
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#1C212B] p-4 rounded-xl border border-white/5 space-y-2">
              <div className="w-full h-16 rounded-lg bg-[#2E333D] border border-white/10 flex items-center justify-center text-xs text-slate-300 font-mono">
                Volcanic Basalt
              </div>
              <p className="text-xs font-bold text-white">Charcoal Basalt</p>
              <p className="text-[11px] text-slate-400 leading-tight">
                Exterior foundation stone grounding the building facade.
              </p>
            </div>

            <div className="bg-[#1C212B] p-4 rounded-xl border border-white/5 space-y-2">
              <div className="w-full h-16 rounded-lg bg-[#D4B58A] text-slate-950 font-bold flex items-center justify-center text-xs font-mono">
                Natural Oak
              </div>
              <p className="text-xs font-bold text-white">White Oak & Bamboo</p>
              <p className="text-[11px] text-slate-400 leading-tight">
                Warm joinery and acoustic batten walls throughout lobby and suites.
              </p>
            </div>

            <div className="bg-[#1C212B] p-4 rounded-xl border border-white/5 space-y-2">
              <div className="w-full h-16 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center text-xs font-mono">
                Edo Indigo
              </div>
              <p className="text-xs font-bold text-white">Indigo Aizome</p>
              <p className="text-[11px] text-slate-400 leading-tight">
                Textile bed runners and cobalt mosaic tiles in the bathrooms.
              </p>
            </div>

            <div className="bg-[#1C212B] p-4 rounded-xl border border-white/5 space-y-2">
              <div className="w-full h-16 rounded-lg bg-amber-400/90 text-slate-950 font-bold flex items-center justify-center text-xs font-mono shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                3000K Diffuse
              </div>
              <p className="text-xs font-bold text-white">Cove Luminaires</p>
              <p className="text-[11px] text-slate-400 leading-tight">
                Concealed indirect lighting with zero glare for soothing night rest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
