/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Navbar } from './components/Navbar';
import { ScrollWalkthrough } from './components/ScrollWalkthrough';
import { ArchitecturalPhilosophy } from './components/ArchitecturalPhilosophy';
import { SuitesShowcase } from './components/SuitesShowcase';
import { NeighborhoodTransit } from './components/NeighborhoodTransit';
import { RateCalculatorSection } from './components/RateCalculatorSection';
import { Footer } from './components/Footer';

export default function App() {
  const bookingRef = useRef<HTMLDivElement>(null);

  const scrollToTour = () => {
    const el = document.getElementById('tour');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSuites = () => {
    const el = document.getElementById('suites');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBooking = () => {
    const el = document.getElementById('rates');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D12] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenBooking={scrollToBooking}
        onNavigateToTour={scrollToTour}
      />

      {/* Main Continuous One-Pager Experience */}
      <main className="flex-1">
        {/* Continuous Scroll-Driven Architectural Walking Tour (Starts at Exterior Facade, transits to Main Gate, Lobby Corridor, Room & Bath) */}
        <ScrollWalkthrough
          onOpenBooking={scrollToBooking}
          onExploreSuites={scrollToSuites}
        />

        {/* Architectural Philosophy & Materials */}
        <ArchitecturalPhilosophy />

        {/* Suites & Floor Plans Showcase */}
        <SuitesShowcase
          onSelectRoomForBooking={scrollToBooking}
        />

        {/* Neighborhood & Disney Transit */}
        <NeighborhoodTransit />

        {/* Live Rate Calculator & Reservation Form */}
        <div ref={bookingRef}>
          <RateCalculatorSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
