import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onNavigateToTour: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onNavigateToTour }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#12151A]/90 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-xl font-bold tracking-tight text-white font-display hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] inline-block" />
          Minn Kasai
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={onNavigateToTour}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            The Tour
          </button>
          <a
            href="#concept"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            Architecture
          </a>
          <a
            href="#suites"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            Suites
          </a>
          <a
            href="#location"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            Transit
          </a>
          <a
            href="#rates"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            Rates
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenBooking}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_22px_rgba(251,191,36,0.5)] whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Reserve Stay</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-md transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#12151A] px-6 py-4 space-y-3">
          <button
            onClick={() => {
              onNavigateToTour();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-200 hover:text-amber-400 font-medium"
          >
            The Walking Tour
          </button>
          <a
            href="#concept"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-slate-200 hover:text-amber-400 font-medium"
          >
            Architectural Philosophy
          </a>
          <a
            href="#suites"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-slate-200 hover:text-amber-400 font-medium"
          >
            Suites & Amenities
          </a>
          <a
            href="#location"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-slate-200 hover:text-amber-400 font-medium"
          >
            Location & Disney Transit
          </a>
          <a
            href="#rates"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-slate-200 hover:text-amber-400 font-medium"
          >
            Live Rate Calculator
          </a>
        </div>
      )}
    </header>
  );
};
