import React, { useState } from 'react';
import { ROOM_CATALOG, RoomTypeData } from '../data/hotelData';
import { Users, Bed, Square, Utensils, Bath, Check, ArrowRight } from 'lucide-react';
import { formatYen } from '../utils/bookingCalculator';

interface SuitesShowcaseProps {
  onSelectRoomForBooking: (roomId: string) => void;
}

export const SuitesShowcase: React.FC<SuitesShowcaseProps> = ({ onSelectRoomForBooking }) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>(ROOM_CATALOG[0].id);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const currentRoom: RoomTypeData =
    ROOM_CATALOG.find((r) => r.id === selectedRoomId) || ROOM_CATALOG[0];

  const handleTabChange = (roomId: string) => {
    setSelectedRoomId(roomId);
    setActivePhotoIndex(0);
  };

  return (
    <section id="suites" className="py-24 bg-[#0D0F13] text-white border-t border-white/10 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              03 · Apartment Living
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white">
              Suites Crafted for Space & Independence
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Unlike small traditional hotel rooms, every Minn Kasai suite features Simmons bedding, in-room induction kitchenette, separate toilet & deep soaking bath, and spacious dining lounge.
            </p>
          </div>

          {/* Interactive Room Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#181D26] rounded-xl border border-white/10 self-start md:self-auto">
            {ROOM_CATALOG.map((room) => (
              <button
                key={room.id}
                onClick={() => handleTabChange(room.id)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedRoomId === room.id
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(251,191,36,0.25)]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {room.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Suite Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#141820] border border-white/10 rounded-2xl p-6 sm:p-8">
          {/* Photos & Thumbnails (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black aspect-[4/3] sm:aspect-[16/10] shadow-xl">
              <img
                src={currentRoom.gallery[activePhotoIndex] || currentRoom.image}
                alt={currentRoom.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {/* Price badge */}
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/15 text-xs">
                <span className="text-slate-400">From </span>
                <span className="text-amber-400 font-bold font-display text-sm tabular-nums">
                  {formatYen(currentRoom.basePrice)}
                </span>
                <span className="text-slate-400"> / night</span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {currentRoom.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`relative rounded-lg overflow-hidden aspect-[4/3] border-2 transition-all cursor-pointer ${
                    activePhotoIndex === idx
                      ? 'border-amber-400 scale-[1.03] shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Room Specs & Amenities (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-mono text-amber-400 font-medium">
                {currentRoom.japaneseName}
              </p>
              <h3 className="text-2xl font-bold font-display text-white mt-1">
                {currentRoom.name}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {currentRoom.description}
              </p>
            </div>

            {/* Key Dimensions & Bedding (Clean unboxed grid) */}
            <div className="grid grid-cols-3 gap-3 border-t border-b border-white/10 py-4 text-xs">
              <div className="flex items-center gap-2">
                <Square className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-mono">Floor Area</p>
                  <p className="font-semibold text-white">{currentRoom.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-mono">Max Capacity</p>
                  <p className="font-semibold text-white">{currentRoom.capacity}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-mono">Bed Layout</p>
                  <p className="font-semibold text-white truncate max-w-[100px]" title={currentRoom.bedConfig}>
                    {currentRoom.bedConfig}
                  </p>
                </div>
              </div>
            </div>

            {/* In-Suite Culinary & Sanitary Inclusions */}
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-white font-mono uppercase flex items-center gap-1.5 mb-2">
                  <Utensils className="w-3.5 h-3.5 text-amber-400" />
                  <span>Culinary Kitchen Inclusions</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {currentRoom.kitchenEquipment.slice(0, 4).map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-white font-mono uppercase flex items-center gap-1.5 mb-2">
                  <Bath className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sanitary & Deep Ofuro Bath</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {currentRoom.bathroomSpecs.slice(0, 4).map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA action */}
            <div className="pt-2">
              <button
                onClick={() => onSelectRoomForBooking(currentRoom.id)}
                className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Calculate Dates & Reserve This Suite</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
