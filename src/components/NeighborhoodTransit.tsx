import React, { useState } from 'react';
import { TRANSIT_ROUTES } from '../data/hotelData';
import { Train, Clock, ShoppingBag, Sparkles, Navigation } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

export const NeighborhoodTransit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'transit' | 'local'>('transit');

  return (
    <section id="location" className="py-24 bg-[#101319] text-white border-t border-white/10 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              04 · Tokyo Connectivity
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white">
              The Kasai Advantage: Direct to Disney & Tokyo Station
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Nestled in a peaceful residential district with zero subway transfers to Tokyo Station, and direct shuttle express buses straight to the gates of Tokyo Disney Resort.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1 p-1 bg-[#181D26] rounded-lg border border-white/10 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('transit')}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeTab === 'transit'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Transit Matrix
            </button>
            <button
              onClick={() => setActiveTab('local')}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeTab === 'local'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Local Conveniences
            </button>
          </div>
        </div>

        {activeTab === 'transit' ? (
          /* Transit Routes Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRANSIT_ROUTES.map((route, idx) => (
              <div
                key={idx}
                className="bg-[#151922] border border-white/10 rounded-xl p-6 space-y-4 hover:border-amber-400/40 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-amber-400 tracking-wider font-semibold">
                    {route.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-bold text-white tabular-nums font-mono">
                      {route.time}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-amber-300 transition-colors">
                    {route.destination}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    {route.japanese}
                  </p>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                  <div className="flex items-center gap-1.5 text-amber-300/90 font-medium mb-1">
                    <Train className="w-3.5 h-3.5 shrink-0" />
                    <span>{route.mode}</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{route.detail}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Neighborhood Local Exploration Bento */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tobu Store Card */}
            <div className="bg-[#151922] border border-white/10 rounded-2xl overflow-hidden group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={getAssetUrl('/assets/aistudio/10_6c59ab88.webp')}
                  alt="Tobu Store supermarket and Sushiro restaurant adjacent to hotel"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] text-amber-300 font-mono">
                  0 Min · Right Next Door
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-base font-bold font-display text-white">
                  Tobu Store & Sushiro
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A massive 2-story supermarket stocked with fresh Wagyu, seasonal fruit, ready-to-eat bento boxes, and popular conveyor sushi right above it.
                </p>
              </div>
            </div>

            {/* Kasai Station Entrance */}
            <div className="bg-[#151922] border border-white/10 rounded-2xl overflow-hidden group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={getAssetUrl('/assets/aistudio/11_8d8d3ccd.webp')}
                  alt="Kasai Station on Tokyo Metro Tozai Line"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] text-amber-300 font-mono">
                  3 Min Walk
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-base font-bold font-display text-white">
                  Kasai Station (Tozai Line)
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Subway entrance connecting directly to Nihombashi, Otemachi, and Nakano. Terminal 7 outside offers direct express buses to Tokyo Disneyland.
                </p>
              </div>
            </div>

            {/* Metro Center Arcade */}
            <div className="bg-[#151922] border border-white/10 rounded-2xl overflow-hidden group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={getAssetUrl('/assets/aistudio/14_b08fcf0c.webp')}
                  alt="Metro Center Kasai covered shopping arcade"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] text-amber-300 font-mono">
                  Covered Arcade
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-base font-bold font-display text-white">
                  Metro Center Kasai
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Weatherproof shopping gallery filled with traditional Japanese bakeries, ramen shops, Lotteria burgers, 24h FamilyMart, and everyday necessities.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Airport & Station Navigation Strip */}
        <div className="mt-10 bg-[#161B24] border border-white/10 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <Navigation className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                Getting to Minn Kasai from Airports
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Take the direct Keisei/Limousine airport coach to Kasai Station. Stroll 300 meters along a flat pedestrian sidewalk.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>No Subway Stairs with Heavy Bags</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
