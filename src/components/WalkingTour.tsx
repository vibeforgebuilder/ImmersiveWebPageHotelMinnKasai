import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Info,
  Layers,
  Volume2,
  VolumeX,
  Play,
  Pause,
  MapPin,
  CheckCircle2,
  Maximize2,
  X,
} from 'lucide-react';
import { TOUR_STOPS, TourStop, Hotspot } from '../data/hotelData';
import { tourAudio } from '../utils/audioAmbience';

interface WalkingTourProps {
  onSelectSuiteBooking?: () => void;
}

export const WalkingTour: React.FC<WalkingTourProps> = ({ onSelectSuiteBooking }) => {
  const [currentStopIndex, setCurrentStopIndex] = useState<number>(0);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [activeImage, setActiveImage] = useState<string>(TOUR_STOPS[0].heroImage);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);

  const currentStop: TourStop = TOUR_STOPS[currentStopIndex];
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync image when current stop changes
  useEffect(() => {
    setActiveImage(currentStop.heroImage);
    setSelectedHotspot(null);
  }, [currentStopIndex, currentStop]);

  // Keyboard navigation (Left / Right arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextStop();
      } else if (e.key === 'ArrowLeft') {
        goToPrevStop();
      } else if (e.key === 'Escape') {
        setSelectedHotspot(null);
        setIsImageModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStopIndex]);

  // Auto-tour progression timer
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentStopIndex((prev) => (prev + 1) % TOUR_STOPS.length);
      }, 7000);
    } else if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying]);

  const goToNextStop = () => {
    setCurrentStopIndex((prev) => (prev + 1) % TOUR_STOPS.length);
  };

  const goToPrevStop = () => {
    setCurrentStopIndex((prev) => (prev - 1 + TOUR_STOPS.length) % TOUR_STOPS.length);
  };

  const handleAudioToggle = () => {
    const playing = tourAudio.toggle();
    setIsPlayingAudio(playing);
  };

  return (
    <section id="tour" className="relative py-20 bg-[#0E1116] text-white overflow-hidden scroll-mt-12">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 tracking-wider uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Interactive Walking Tour</span>
              <span aria-hidden="true">·</span>
              <span>Architectural Exploration</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white">
              Walk Through Minn Kasai
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Navigate floor by floor. Tap architectural hotspots to inspect material choices, spatial acoustics, and residential design features.
            </p>
          </div>

          {/* Tour Controls Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Auto Play toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                isAutoPlaying
                  ? 'bg-amber-400 text-slate-950 font-semibold'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoPlaying ? 'Pause Walk' : 'Auto Walk'}</span>
            </button>

            {/* Ambient Soundscape */}
            <button
              onClick={handleAudioToggle}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                isPlayingAudio
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
              title="Toggle simulated evening sanctuary ambient audio"
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>Sanctuary Audio: On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  <span>Ambience Sound</span>
                </>
              )}
            </button>

            {/* Toggle Hotspot Markers */}
            <button
              onClick={() => setShowHotspots(!showHotspots)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                showHotspots
                  ? 'bg-white/15 text-white border border-white/20'
                  : 'bg-white/5 text-slate-400 border border-white/10'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>Hotspots {showHotspots ? 'Visible' : 'Hidden'}</span>
            </button>
          </div>
        </div>

        {/* Step-by-Step Spatial Navigator Strip */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {TOUR_STOPS.map((stop, idx) => {
              const isActive = idx === currentStopIndex;
              return (
                <button
                  key={stop.id}
                  onClick={() => setCurrentStopIndex(idx)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2.5 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-semibold shadow-[0_0_15px_rgba(251,191,36,0.25)]'
                      : 'bg-[#181C24] hover:bg-[#202632] text-slate-300 border border-white/5'
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] ${
                      isActive ? 'text-slate-950 font-bold' : 'text-amber-400/80'
                    }`}
                  >
                    {stop.stepNumber}
                  </span>
                  <span>{stop.title}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Central Tour Viewport & Architectural Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Tour Canvas (8 Columns) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl group min-h-[460px] sm:min-h-[540px] flex items-center justify-center">
              {/* Tour Photograph */}
              <img
                src={activeImage}
                alt={currentStop.title}
                referrerPolicy="no-referrer"
                className="w-full h-full max-h-[620px] object-cover object-center select-none transition-all duration-700"
              />

              {/* Architectural Portal Aura Overlay when on Portal Step */}
              {currentStop.id === 'entrance-portal' && (
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-amber-950/20 via-transparent to-transparent mix-blend-screen" />
              )}

              {/* Space Tag Watermark overlay */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/15 text-xs text-white">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold">{currentStop.floor}</span>
                <span className="text-slate-400">·</span>
                <span className="text-amber-300">{currentStop.zone}</span>
              </div>

              {/* Expand Fullscreen Button */}
              <button
                onClick={() => setIsImageModalOpen(true)}
                className="absolute top-4 right-4 z-20 p-2 rounded-md bg-black/65 hover:bg-black/90 text-slate-300 hover:text-white border border-white/15 backdrop-blur-md transition-colors cursor-pointer"
                title="View full resolution photograph"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Interactive Hotspot Pins on Photo */}
              {showHotspots &&
                currentStop.hotspots.map((hs) => {
                  const isSelected = selectedHotspot?.id === hs.id;
                  return (
                    <div
                      key={hs.id}
                      style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                    >
                      <button
                        onClick={() => setSelectedHotspot(isSelected ? null : hs)}
                        aria-label={`Inspect ${hs.title}`}
                        className={`relative group/btn flex items-center justify-center w-8 h-8 rounded-full transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 scale-125 shadow-[0_0_20px_rgba(251,191,36,0.9)] ring-4 ring-amber-400/40'
                            : 'bg-black/80 text-amber-300 hover:bg-amber-400 hover:text-slate-950 border border-amber-400/70 shadow-lg'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-current" />
                        {/* Radar Pulse */}
                        <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-35" />
                      </button>

                      {/* Floating Tooltip Label */}
                      <span className="hidden sm:block absolute left-1/2 -bottom-7 -translate-x-1/2 bg-black/90 text-[11px] font-medium text-amber-200 px-2.5 py-0.5 rounded whitespace-nowrap border border-white/10 pointer-events-none opacity-0 group-hover/btn:opacity-100 transition-opacity">
                        {hs.title}
                      </span>
                    </div>
                  );
                })}

              {/* Floating Hotspot Detail Modal / Popover on Canvas */}
              {selectedHotspot && (
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-30 bg-[#161A22]/95 backdrop-blur-xl border border-amber-400/40 p-4 rounded-xl shadow-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                      {selectedHotspot.category}
                    </span>
                    <button
                      onClick={() => setSelectedHotspot(null)}
                      className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="text-base font-bold text-white font-display">
                    {selectedHotspot.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedHotspot.description}
                  </p>
                  {selectedHotspot.materialSpec && (
                    <div className="pt-1.5 border-t border-white/10 text-[11px] font-mono text-amber-300 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 shrink-0" />
                      <span>Spec: {selectedHotspot.materialSpec}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Previous / Next Walking Arrows Overlay */}
              <div className="absolute inset-y-0 left-3 flex items-center z-10">
                <button
                  onClick={goToPrevStop}
                  aria-label="Step back to previous space"
                  className="p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105 cursor-pointer shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute inset-y-0 right-3 flex items-center z-10">
                <button
                  onClick={goToNextStop}
                  aria-label="Walk forward to next space"
                  className="p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105 cursor-pointer shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Perspective / Alternate Angle Switcher */}
            {currentStop.alternateImages && currentStop.alternateImages.length > 0 && (
              <div className="bg-[#141820] border border-white/10 p-3 rounded-xl flex items-center gap-3 overflow-x-auto">
                <span className="text-xs font-mono text-slate-400 shrink-0 pl-1">
                  Camera Angles:
                </span>
                <button
                  onClick={() => setActiveImage(currentStop.heroImage)}
                  className={`text-xs px-3 py-1.5 rounded-md transition-all shrink-0 cursor-pointer ${
                    activeImage === currentStop.heroImage
                      ? 'bg-amber-400 text-slate-950 font-semibold'
                      : 'bg-black/40 text-slate-300 hover:text-white border border-white/10'
                  }`}
                >
                  Primary Vantage
                </button>
                {currentStop.alternateImages.map((alt) => (
                  <button
                    key={alt.url}
                    onClick={() => setActiveImage(alt.url)}
                    className={`text-xs px-3 py-1.5 rounded-md transition-all shrink-0 cursor-pointer ${
                      activeImage === alt.url
                        ? 'bg-amber-400 text-slate-950 font-semibold'
                        : 'bg-black/40 text-slate-300 hover:text-white border border-white/10'
                    }`}
                  >
                    {alt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Architectural Inspector & Narrative Card (4 Columns) */}
          <div className="lg:col-span-4 bg-[#141820] border border-white/15 rounded-2xl p-6 space-y-6 shadow-xl">
            {/* Step Index & Title */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-2">
                <span>STOP {currentStop.stepNumber} OF {TOUR_STOPS.length}</span>
                <span className="text-slate-400">{currentStop.floor}</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-white">
                {currentStop.title}
              </h3>
              <p className="text-xs font-medium text-amber-300/90 mt-1">
                {currentStop.subtitle}
              </p>
            </div>

            {/* Design Prose */}
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed border-t border-b border-white/10 py-4">
              <p>{currentStop.description}</p>
              <p className="text-xs text-slate-400 italic">
                "{currentStop.designNarrative}"
              </p>
            </div>

            {/* Architectural Highlights & Hotspot Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-white tracking-wide uppercase font-mono">
                  Inspect Design Elements
                </p>
                <span className="text-[10px] text-amber-400 font-mono">
                  Tap to view spec
                </span>
              </div>
              <div className="space-y-2">
                {currentStop.hotspots.map((hs) => {
                  const isSelected = selectedHotspot?.id === hs.id;
                  return (
                    <button
                      key={hs.id}
                      onClick={() => setSelectedHotspot(isSelected ? null : hs)}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-400/15 border-amber-400 text-white shadow-sm'
                          : 'bg-[#181D26] border-white/5 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${isSelected ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]' : 'bg-slate-500'}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold text-xs truncate ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                          {hs.title}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {hs.materialSpec || hs.category}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Walk Navigation CTA */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={goToNextStop}
                className="flex-1 py-3 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Walk to Next Space</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {onSelectSuiteBooking && currentStop.id.includes('suite') && (
                <button
                  onClick={onSelectSuiteBooking}
                  className="py-3 px-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg border border-white/20 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Book Room
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Photo Modal */}
      {isImageModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="High resolution photo view"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
        >
          <button
            onClick={() => setIsImageModalOpen(false)}
            aria-label="Close photo view"
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activeImage}
            alt={currentStop.title}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </section>
  );
};
