import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ArrowDown,
  Compass,
  Sparkles,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Layers,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Eye,
  BookOpen,
  Video,
  Clapperboard,
  Timer,
} from 'lucide-react';
import { TOUR_STOPS, TourStop, Hotspot } from '../data/hotelData';
import { tourAudio } from '../utils/audioAmbience';

export type PaceMode = 'slow' | 'grand' | 'standard';

interface ScrollWalkthroughProps {
  onOpenBooking: () => void;
  onExploreSuites: () => void;
}

export const ScrollWalkthrough: React.FC<ScrollWalkthroughProps> = ({
  onOpenBooking,
  onExploreSuites,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [stepLocalProgress, setStepLocalProgress] = useState<number>(0); // 0 to 1 inside current stop
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [activeSubImage, setActiveSubImage] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [portalGlow, setPortalGlow] = useState<'radiant' | 'subtle' | 'dusk'>('radiant');
  const [manualCaptionVisible, setManualCaptionVisible] = useState<boolean | null>(null);
  const [cameraMotionEnabled, setCameraMotionEnabled] = useState<boolean>(true);
  const [paceMode, setPaceMode] = useState<PaceMode>('slow'); // Slower, luxurious transition timing by default

  const totalSteps = TOUR_STOPS.length;
  const currentStop: TourStop = TOUR_STOPS[activeStep];
  const displayImage = activeSubImage || currentStop.heroImage;

  // Track overall scroll & calculate per-stop sub-progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrollOffset = -rect.top;
      const maxScroll = containerHeight - windowHeight;

      if (maxScroll <= 0) return;

      const progress = Math.max(0, Math.min(1, scrollOffset / maxScroll));
      // Calculate continuous step position
      const exactStep = progress * (totalSteps - 1);
      const stepIndex = Math.min(totalSteps - 1, Math.floor(exactStep));
      const localProg = exactStep - stepIndex; // 0 to 1 within this step

      setStepLocalProgress(localProg);

      setActiveStep((prev) => {
        if (prev !== stepIndex) {
          setActiveSubImage(null);
          setSelectedHotspot(null);
          setManualCaptionVisible(null); // Reset manual override on space change
          return stepIndex;
        }
        return prev;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalSteps]);

  // Two-action scroll threshold math with extended, relaxed pacing:
  // - Phase 1 (0.0 to 0.28): Pure photograph, completely unobstructed, vibrant and clear
  // - Phase 2 (0.28 to 0.48): Caption gently and gradually slides up into view with smooth cosine curve
  // - Phase 3 (0.48 to 0.82): Caption remains fully legible throughout the central space explore
  // - Phase 4 (0.82 to 1.0): Caption softly dissolves out as the space prepares for the next transition
  const captionOpacity = useMemo(() => {
    if (manualCaptionVisible !== null) {
      return manualCaptionVisible ? 1 : 0;
    }
    const isLastStep = activeStep === totalSteps - 1;

    if (stepLocalProgress < 0.28) {
      // Phase 1: Pure picture focus
      return 0;
    } else if (stepLocalProgress >= 0.28 && stepLocalProgress < 0.48) {
      // Slower, graceful fade-in
      const fadeProgress = (stepLocalProgress - 0.28) / 0.20;
      return 0.5 * (1 - Math.cos(fadeProgress * Math.PI));
    } else if (stepLocalProgress >= 0.48 && stepLocalProgress <= (isLastStep ? 0.98 : 0.82)) {
      // Fully visible throughout the central stay
      return 1;
    } else {
      // Gentle fade out before next space
      const fadeProgress = Math.min(1, (stepLocalProgress - 0.82) / 0.18);
      return 0.5 * (1 + Math.cos(fadeProgress * Math.PI));
    }
  }, [stepLocalProgress, manualCaptionVisible, activeStep, totalSteps]);

  const isCaptionVisible = captionOpacity > 0.05;

  // Programmatic smooth scroll with customizable duration and easing for slow, luxurious cinematic transition
  const smoothScrollTo = (targetY: number, duration: number) => {
    const startY = window.scrollY;
    const difference = targetY - startY;
    if (Math.abs(difference) < 2) return;

    const startTime = performance.now();

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY + difference * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const getScrollDuration = () => {
    return paceMode === 'grand' ? 2200 : paceMode === 'slow' ? 1600 : 1000;
  };

  // Jump to specific step and set scroll position with slow, deliberate glide
  const scrollToStep = (index: number, subAction: 'photo' | 'caption' = 'photo') => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const maxScroll = containerHeight - windowHeight;

    const offsetFraction = subAction === 'caption' ? 0.56 : 0.05;
    const targetExactStep = Math.min(totalSteps - 1, index + offsetFraction);
    const targetScrollY = containerTop + (targetExactStep / (totalSteps - 1)) * maxScroll;

    smoothScrollTo(targetScrollY, getScrollDuration());
  };

  const nextStep = () => {
    if (activeStep < totalSteps - 1) {
      scrollToStep(activeStep + 1, 'photo');
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      scrollToStep(activeStep - 1, 'photo');
    }
  };

  const handleAudioToggle = () => {
    const playing = tourAudio.toggle();
    setIsPlayingAudio(playing);
  };

  const toggleCaptionManual = () => {
    if (manualCaptionVisible !== null) {
      setManualCaptionVisible(!manualCaptionVisible);
    } else {
      setManualCaptionVisible(!isCaptionVisible);
    }
  };

  // Compute cinematic physical camera transform based on current stop, incoming stop, and scroll progress
  // Now uses wide 50% optical dissolve overlap and generous damping for slower, longer transition feel
  const getCameraStyle = (index: number) => {
    const isCurrent = index === activeStep;
    const isNext = index === activeStep + 1;
    const p = stepLocalProgress; // 0 to 1

    if (!cameraMotionEnabled) {
      if (isCurrent) {
        const fadeOutProgress = p > 0.52 ? Math.min(1, (p - 0.52) / 0.48) : 0;
        const opacity = p > 0.52 ? 0.5 * (1 + Math.cos(fadeOutProgress * Math.PI)) : 1;
        return {
          transform: 'none',
          opacity,
          transition: 'opacity 0.9s cubic-bezier(0.25, 1, 0.5, 1)',
        };
      } else if (isNext && p > 0.50) {
        const enterProgress = Math.max(0, Math.min(1, (p - 0.50) / 0.50));
        const enterOpacity = 0.5 * (1 - Math.cos(enterProgress * Math.PI));
        return {
          transform: 'none',
          opacity: enterOpacity,
          transition: 'opacity 0.9s cubic-bezier(0.25, 1, 0.5, 1)',
        };
      }
      return {
        transform: 'none',
        opacity: 0,
        pointerEvents: 'none' as const,
      };
    }

    if (isCurrent) {
      // Current active image: as local progress approaches 1, apply specific exit camera choreography
      let scale = 1.0;
      let tx = 0;
      let ty = 0;

      switch (index) {
        case 0: // Stop 01: Exterior Slate Tower -> approaching ground gate (Pedestal Down & Push)
          scale = 1.0 + p * 0.10;
          ty = p * 4; // tilt down towards street entrance
          break;
        case 1: // Stop 02: Luminous Torii Gates -> dolly in through the light portals
          scale = 1.02 + p * 0.16; // strong push-in through the Torii arches
          break;
        case 2: // Stop 03: Lobby Reception -> pan right into corridor towards elevator
          scale = 1.02 + p * 0.06;
          tx = -p * 5; // pan right (image shifts left)
          break;
        case 3: // Stop 04: Japandi Suite -> turn toward in-room kitchenette
          scale = 1.0 + p * 0.07;
          tx = p * 4; // pan left toward kitchen
          ty = p * 2;
          break;
        case 4: // Stop 05: Resident's Kitchenette -> move toward private bath
          scale = 1.02 + p * 0.06;
          tx = p * 5; // pan toward bathroom door
          break;
        case 5: // Stop 06: Japanese Bathhouse -> step out to neighborhood
          scale = Math.max(0.94, 1.02 - p * 0.08); // dolly out
          ty = -p * 3; // crane up
          break;
        case 6: // Stop 07: Kasai Neighborhood
          scale = 1.0 + p * 0.04;
          break;
        default:
          scale = 1.0 + p * 0.06;
      }

      // Smooth cosine crossfade out over the entire second half of the stop (0.52 to 1.0)
      const fadeOutProgress = p > 0.52 ? Math.min(1, (p - 0.52) / 0.48) : 0;
      const opacity = p > 0.52 ? 0.5 * (1 + Math.cos(fadeOutProgress * Math.PI)) : 1;

      return {
        transform: `scale(${scale}) translate3d(${tx}%, ${ty}%, 0)`,
        opacity,
        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
      };
    } else if (isNext && stepLocalProgress > 0.50) {
      // Incoming next image: start dissolving in from 0.50 with wide, gradual optical blend (50% runway)
      const enterP = Math.max(0, Math.min(1, (stepLocalProgress - 0.50) / 0.50));
      const enterOpacity = 0.5 * (1 - Math.cos(enterP * Math.PI));
      let startScale = 1.12;
      let startTx = 0;
      let startTy = 0;

      switch (index) {
        case 1: // Gate entering: dolly-in arrival
          startScale = 1.18;
          startTy = 2;
          break;
        case 2: // Lobby entering: corridor reveal
          startScale = 1.10;
          startTx = 4;
          break;
        case 3: // Suite entering: elevator ascent landing
          startScale = 1.10;
          startTy = -4; // arrives as if rising from below
          break;
        case 4: // Kitchen entering: macro close-up landing
          startScale = 1.14;
          startTy = -2;
          break;
        case 5: // Bath entering: sliding door pan
          startScale = 1.08;
          startTx = -3;
          break;
        case 6: // Neighborhood entering: wide expansion
          startScale = 0.94;
          startTy = 2;
          break;
      }

      const currentScale = startScale - (startScale - 1.0) * enterP;
      const currentTx = startTx * (1 - enterP);
      const currentTy = startTy * (1 - enterP);

      return {
        transform: `scale(${currentScale}) translate3d(${currentTx}%, ${currentTy}%, 0)`,
        opacity: enterOpacity,
        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      };
    } else {
      return {
        transform: 'scale(1.05)',
        opacity: 0,
        pointerEvents: 'none' as const,
      };
    }
  };

  const heightFactor = paceMode === 'grand' ? 300 : paceMode === 'slow' ? 240 : 160;

  return (
    <div
      ref={containerRef}
      id="tour"
      className="relative bg-[#07090D] text-white"
      style={{ height: `${totalSteps * heightFactor}vh` }}
    >
      {/* Sticky Fullscreen Tour Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Full-bleed Photo Backdrop with Directional Camera Choreography */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {TOUR_STOPS.map((stop, index) => {
            const isCurrent = index === activeStep;
            const imgSrc = isCurrent && activeSubImage ? activeSubImage : stop.heroImage;
            const style = getCameraStyle(index);

            return (
              <div
                key={stop.id}
                className={`absolute inset-0 w-full h-full ${
                  isCurrent && !isCaptionVisible && cameraMotionEnabled
                    ? 'camera-cinematic-breathe'
                    : ''
                }`}
                style={style}
              >
                <img
                  src={imgSrc}
                  alt={stop.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover object-center transition-all duration-1000 ease-in-out ${
                    isCaptionVisible
                      ? 'brightness-[0.88] contrast-[1.04]'
                      : 'brightness-[1.0] contrast-[1.02]'
                  }`}
                />
              </div>
            );
          })}

          {/* Minimal top and bottom vignetting for UI control legibility without dimming the photo */}
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/80 via-black/35 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

          {/* Localized scrim behind caption area: slowly dissolves in/out with extended 1000ms duration */}
          <div
            className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none transition-opacity duration-1000 ease-in-out"
            style={{ opacity: captionOpacity * 0.95 }}
          />

          {/* Interactive Light Gate Aura (Only active on Step 02 - Entrance Portal) */}
          {currentStop.id === 'entrance-portal' && (
            <div
              className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
                portalGlow === 'radiant'
                  ? 'bg-amber-500/15 mix-blend-screen'
                  : portalGlow === 'subtle'
                  ? 'bg-amber-500/08 mix-blend-screen'
                  : 'bg-transparent'
              }`}
            />
          )}
        </div>

        {/* Top HUD Bar: Space Coordinate, Camera Move Badge, Pacing & Controls */}
        <div className="relative z-30 max-w-7xl mx-auto w-full px-6 pt-5 flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Space coordinate tag */}
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-xs font-mono text-amber-300 shadow-lg">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-white">{currentStop.floor}</span>
              <span className="text-white/40">·</span>
              <span className="text-amber-300">{currentStop.zone}</span>
            </span>

            {/* Cinematic Camera Move Indicator Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-amber-400/35 text-[11px] font-mono text-slate-200 shadow-lg">
              <Clapperboard className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-400 font-semibold">{currentStop.cameraTransition.label}</span>
              <span className="text-white/30">|</span>
              <span className="text-slate-300">{currentStop.cameraTransition.lensSpec}</span>
            </div>

            {/* Transition Pacing Speed Selector */}
            <div className="hidden lg:flex items-center gap-1 p-1 bg-black/75 backdrop-blur-md rounded-full border border-white/20 text-xs shadow-lg">
              <span className="text-amber-400 pl-2.5 pr-1 flex items-center gap-1 font-mono text-[11px]">
                <Timer className="w-3.5 h-3.5 text-amber-400" /> Pacing:
              </span>
              {(['slow', 'grand', 'standard'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setPaceMode(m)}
                  className={`px-2.5 py-0.5 rounded-full capitalize text-[11px] font-medium transition-all cursor-pointer ${
                    paceMode === m
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-[0_0_8px_rgba(251,191,36,0.3)]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title={
                    m === 'slow'
                      ? 'Cinematic slow: 240vh scroll runway with 1.6s smooth glide'
                      : m === 'grand'
                      ? 'Grand architectural tour: 300vh extended runway with 2.2s glide'
                      : 'Standard pace: 160vh runway'
                  }
                >
                  {m === 'slow' ? 'Slow (1.5x)' : m === 'grand' ? 'Grand (2.0x)' : 'Brisk'}
                </button>
              ))}
            </div>

            {/* Portal Light Control when on Step 02 */}
            {currentStop.id === 'entrance-portal' && (
              <div className="hidden sm:flex items-center gap-1 p-1 bg-black/70 backdrop-blur-md rounded-lg border border-amber-400/40 text-xs shadow-lg">
                <span className="text-amber-400 px-2 flex items-center gap-1 font-mono text-[11px]">
                  <Sparkles className="w-3 h-3" /> Gate Aura:
                </span>
                {(['radiant', 'subtle', 'dusk'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setPortalGlow(mode)}
                    className={`px-2 py-0.5 rounded capitalize text-[11px] font-medium transition-all cursor-pointer ${
                      portalGlow === mode
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tour Controls (Toggle Mode, Camera Motion, Soundscape, Fullscreen) */}
          <div className="flex items-center gap-2">
            {/* Mobile/Compact Pacing Toggle */}
            <button
              onClick={() => setPaceMode((p) => (p === 'slow' ? 'grand' : p === 'grand' ? 'standard' : 'slow'))}
              className="lg:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border bg-black/60 text-amber-300 border-amber-400/40 cursor-pointer shadow-lg"
              title="Cycle transition pacing speed"
            >
              <Timer className="w-3 h-3 text-amber-400" />
              <span className="font-mono text-[10px] capitalize">{paceMode}</span>
            </button>

            {/* Camera Motion Toggle */}
            <button
              onClick={() => setCameraMotionEnabled(!cameraMotionEnabled)}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border transition-all cursor-pointer shadow-lg ${
                cameraMotionEnabled
                  ? 'bg-amber-400/15 text-amber-300 border-amber-400/40'
                  : 'bg-black/60 text-slate-400 border-white/15'
              }`}
              title="Toggle cinematic camera pans, tilts, and dolly motions"
            >
              <Video className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono text-[11px]">{cameraMotionEnabled ? 'Camera: Cinematic' : 'Camera: Static'}</span>
            </button>

            {/* Action 1 vs Action 2 Toggle Button */}
            <button
              onClick={toggleCaptionManual}
              className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border transition-all flex items-center gap-1.5 cursor-pointer shadow-lg ${
                isCaptionVisible
                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                  : 'bg-black/60 text-amber-300 border-amber-400/50 hover:bg-black/80'
              }`}
              title="Toggle between clear photo view and architectural story"
            >
              {isCaptionVisible ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Photo Only</span>
                </>
              ) : (
                <>
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Reveal Story</span>
                </>
              )}
            </button>

            {/* Ambient Soundscape */}
            <button
              onClick={handleAudioToggle}
              className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border transition-all flex items-center gap-1.5 cursor-pointer ${
                isPlayingAudio
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                  : 'bg-black/60 text-slate-300 border-white/20 hover:text-white'
              }`}
              title="Toggle simulated evening architectural sanctuary hum"
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span className="hidden sm:inline font-mono text-[11px]">Audio: On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline font-mono text-[11px]">Audio</span>
                </>
              )}
            </button>

            {/* Fullscreen Photo Modal */}
            <button
              onClick={() => setIsImageModalOpen(true)}
              className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white border border-white/20 backdrop-blur-md transition-colors cursor-pointer"
              title="View full-resolution photograph"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Phase 1: Clean Unobstructed Photo Prompt (When Caption is Hidden) */}
        {!isCaptionVisible && (
          <div className="relative z-20 max-w-7xl mx-auto w-full px-6 flex items-end justify-between pointer-events-none pb-4 animate-fade-in">
            <div className="bg-black/70 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              <div>
                <p className="text-sm font-bold font-display text-white">
                  {currentStop.title}
                </p>
                <p className="text-[11px] text-amber-300/90 font-mono flex items-center gap-1.5">
                  <span>{currentStop.subtitle}</span>
                  <span className="text-white/30">·</span>
                  <span className="text-slate-400 italic">{currentStop.cameraTransition.sublabel}</span>
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-black/70 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-lg text-xs font-mono text-slate-200 shadow-xl">
              <ArrowDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>Scroll down to reveal architectural story & specs</span>
            </div>
          </div>
        )}

        {/* Interactive Hotspot Pins on the Active Photographic View */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="relative w-full h-full max-w-7xl mx-auto">
            {currentStop.hotspots.map((hs) => {
              const isSelected = selectedHotspot?.id === hs.id;
              return (
                <div
                  key={hs.id}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2"
                >
                  <button
                    onClick={() => {
                      setSelectedHotspot(isSelected ? null : hs);
                      if (!isCaptionVisible) setManualCaptionVisible(true);
                    }}
                    aria-label={`Inspect ${hs.title}`}
                    className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 scale-125 shadow-[0_0_25px_rgba(251,191,36,0.95)] ring-4 ring-amber-400/40'
                        : 'bg-black/85 text-amber-300 hover:bg-amber-400 hover:text-slate-950 border border-amber-400/70 shadow-xl'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-current" />
                    <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-35" />
                  </button>

                  {/* Tooltip Label */}
                  <span className="hidden md:block absolute left-1/2 -bottom-7 -translate-x-1/2 bg-black/90 text-[11px] font-medium text-amber-200 px-2.5 py-0.5 rounded whitespace-nowrap border border-white/10 pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                    {hs.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Phase 2: Action 2 - The Caption Transits In Smoothly Based on Scroll Position */}
        <div
          className="relative z-20 max-w-7xl mx-auto w-full px-6 py-4 flex flex-col lg:flex-row items-end lg:items-center justify-between gap-8 pointer-events-none transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)"
          style={{
            opacity: captionOpacity,
            transform: `translateY(${(1 - captionOpacity) * 36}px)`,
            pointerEvents: isCaptionVisible ? 'auto' : 'none',
          }}
        >
          {/* Narrative Glass Card */}
          <div className="max-w-xl w-full bg-[#0F1217]/92 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-4">
            {/* Step kicker & camera shot details */}
            <div className="flex items-center justify-between text-xs font-mono text-amber-400">
              <span className="tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                Chapter {currentStop.stepNumber} of 07
              </span>
              <span className="text-slate-400">{currentStop.floor}</span>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight text-white leading-tight">
                {currentStop.title}
              </h2>
              <p className="text-xs sm:text-sm font-medium text-amber-300/90 mt-1">
                {currentStop.subtitle}
              </p>
            </div>

            {/* Camera movement director's note */}
            <div className="p-2.5 rounded-lg bg-black/50 border border-white/10 text-xs text-slate-300 flex items-start gap-2">
              <Clapperboard className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-amber-400 font-mono text-[11px] font-semibold">{currentStop.cameraTransition.label}: </span>
                <span className="text-[11px] text-slate-300">{currentStop.cameraTransition.cinematicNarrative}</span>
              </div>
            </div>

            {/* Prose description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {currentStop.description}
            </p>

            {/* Architectural Highlights Pill Badges */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Key Design Elements (Tap to inspect)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {currentStop.hotspots.map((hs) => {
                  const isHotspotActive = selectedHotspot?.id === hs.id;
                  return (
                    <button
                      key={hs.id}
                      onClick={() => setSelectedHotspot(isHotspotActive ? null : hs)}
                      className={`flex items-center gap-1.5 text-left p-1.5 rounded transition-all cursor-pointer group ${
                        isHotspotActive
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="truncate group-hover:text-amber-300">{hs.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Camera angle switcher if stop has secondary perspectives */}
            {currentStop.alternateImages && currentStop.alternateImages.length > 0 && (
              <div className="pt-2 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-1">
                <span className="text-[11px] font-mono text-slate-400 shrink-0">Vantage:</span>
                <button
                  onClick={() => setActiveSubImage(null)}
                  className={`text-[11px] px-2.5 py-1 rounded transition-all cursor-pointer ${
                    activeSubImage === null
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-black/40 text-slate-300 hover:text-white border border-white/10'
                  }`}
                >
                  Main View
                </button>
                {currentStop.alternateImages.map((alt) => (
                  <button
                    key={alt.url}
                    onClick={() => setActiveSubImage(alt.url)}
                    className={`text-[11px] px-2.5 py-1 rounded transition-all cursor-pointer whitespace-nowrap ${
                      activeSubImage === alt.url
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-black/40 text-slate-300 hover:text-white border border-white/10'
                    }`}
                  >
                    {alt.label}
                  </button>
                ))}
              </div>
            )}

            {/* Action buttons inside card */}
            <div className="pt-2 flex items-center gap-3">
              {activeStep < totalSteps - 1 ? (
                <button
                  onClick={nextStep}
                  className="flex-1 py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Walk to Next Space</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onOpenBooking}
                  className="flex-1 py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  <span>Reserve Suite at Minn Kasai</span>
                </button>
              )}

              {currentStop.id.includes('suite') && (
                <button
                  onClick={onExploreSuites}
                  className="py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg border border-white/20 transition-colors whitespace-nowrap cursor-pointer"
                >
                  View Floor Plans
                </button>
              )}
            </div>
          </div>

          {/* Floating Hotspot Detail Popover (if active) */}
          {selectedHotspot && (
            <div className="w-full lg:max-w-sm bg-[#161B24]/95 backdrop-blur-2xl border border-amber-400/50 p-5 rounded-2xl shadow-2xl space-y-2.5 pointer-events-auto animate-fade-in">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
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
                <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-amber-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 shrink-0" />
                  <span>Spec: {selectedHotspot.materialSpec}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Scrubber & Floor Navigation HUD */}
        <div className="relative z-30 w-full bg-[#090C10]/95 backdrop-blur-md border-t border-white/10 py-3 px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Scroll State Status Tag & Camera Movement */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Compass className="w-3.5 h-3.5" />
                <span className="font-semibold">{currentStop.title}</span>
              </span>
              <span className="text-white/30" aria-hidden="true">·</span>
              <span className="text-slate-300">
                {isCaptionVisible ? (
                  <span className="text-amber-300 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> Story & Specs View
                  </span>
                ) : (
                  <span className="text-slate-400 flex items-center gap-1">
                    <Eye className="w-3 h-3 text-amber-400" /> Photo View (Scroll down for story ↓)
                  </span>
                )}
              </span>
              <span className="hidden xl:inline text-white/30" aria-hidden="true">·</span>
              <span className="hidden xl:flex items-center gap-1 text-[11px] text-slate-400">
                <Timer className="w-3 h-3 text-amber-400" />
                <span>Transition: {paceMode === 'slow' ? 'Slow (1.5x)' : paceMode === 'grand' ? 'Grand (2.0x)' : 'Brisk'}</span>
              </span>
            </div>

            {/* Chapter Stepper Buttons with dual indicator */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
              {TOUR_STOPS.map((stop, idx) => {
                const isActive = idx === activeStep;
                return (
                  <button
                    key={stop.id}
                    onClick={() => scrollToStep(idx, 'photo')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(251,191,36,0.35)]'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                    }`}
                  >
                    <span className="font-mono text-[10px]">{stop.stepNumber}</span>
                    <span className="hidden md:inline">{stop.title.split(' ')[1] || stop.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Manual Direction Arrows */}
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <button
                onClick={prevStep}
                disabled={activeStep === 0}
                aria-label="Previous tour space"
                className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextStep}
                disabled={activeStep === totalSteps - 1}
                aria-label="Next tour space"
                className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen High-Res Photo Modal */}
      {isImageModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full-size architectural photograph"
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
            src={displayImage}
            alt={currentStop.title}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
