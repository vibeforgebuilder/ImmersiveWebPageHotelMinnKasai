import React from 'react';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0C0F] text-slate-400 text-xs border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#"
              className="text-2xl font-bold font-display text-white tracking-tight flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] inline-block" />
              Minn Kasai
            </a>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              An architectural apartment hotel designed by SQUEEZE. Providing the spaciousness and autonomy of a Tokyo second home with the tranquility of Japanese minimalist design.
            </p>
            <div className="pt-2 text-[11px] font-mono text-slate-500">
              Licensed Ryokan & Hotel Business Act (Tokyo Edogawa Public Health Center)
            </div>
          </div>

          {/* Hotel Location & Contacts (4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Location & Contact
            </p>
            <div className="space-y-2 text-xs">
              <p className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>6-4-10 Higashikasai, Edogawa-ku, Tokyo 134-0084, Japan</span>
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+81 (0)3 6869 1234</span>
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>stay.kasai@minn.style</span>
              </p>
            </div>
          </div>

          {/* Navigation Links (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Quick Navigation
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#tour" className="hover:text-amber-400 transition-colors">
                  Architectural Walking Tour
                </a>
              </li>
              <li>
                <a href="#concept" className="hover:text-amber-400 transition-colors">
                  Design Philosophy & Materials
                </a>
              </li>
              <li>
                <a href="#suites" className="hover:text-amber-400 transition-colors">
                  Suites & Floor Plans
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition-colors">
                  Disney Shuttle & Metro Transit
                </a>
              </li>
              <li>
                <a href="#rates" className="hover:text-amber-400 transition-colors">
                  Rate Calculator & Booking
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Minn Kasai. Operated by SQUEEZE Inc. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
