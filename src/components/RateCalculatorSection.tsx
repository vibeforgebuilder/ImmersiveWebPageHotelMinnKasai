import React, { useState, useMemo } from 'react';
import {
  ROOM_TYPES,
  calculateStayPrice,
  calculateNights,
  formatYen,
  validateBookingForm,
  BookingFormValues,
} from '../utils/bookingCalculator';
import { Calendar, Users, Home, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface RateCalculatorSectionProps {
  initialRoomId?: string;
  onOpenBookingModalWithValues?: (values: BookingFormValues) => void;
}

export const RateCalculatorSection: React.FC<RateCalculatorSectionProps> = ({
  initialRoomId = 'standard-twin',
}) => {
  // Tomorrow and 3 days later as defaults
  const today = new Date();
  const defaultCheckIn = new Date(today);
  defaultCheckIn.setDate(today.getDate() + 1);
  const defaultCheckOut = new Date(today);
  defaultCheckOut.setDate(today.getDate() + 4);

  const formatDateStr = (d: Date) => d.toISOString().split('T')[0];

  const [roomId, setRoomId] = useState<string>(initialRoomId);
  const [checkIn, setCheckIn] = useState<string>(formatDateStr(defaultCheckIn));
  const [checkOut, setCheckOut] = useState<string>(formatDateStr(defaultCheckOut));
  const [guests, setGuests] = useState<number>(2);

  // Form submission state
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const nights = useMemo(() => calculateNights(checkIn, checkOut), [checkIn, checkOut]);

  const pricing = useMemo(() => {
    return calculateStayPrice(roomId, nights, guests);
  }, [roomId, nights, guests]);

  const currentRoom = ROOM_TYPES[roomId] || ROOM_TYPES['standard-twin'];

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateBookingForm({
      fullName: guestName,
      email: guestEmail,
      phone: guestPhone,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests,
      roomType: roomId,
    });

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  return (
    <section id="rates" className="py-24 bg-[#0F1217] text-white border-t border-white/10 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
            05 · Transparent Hospitality
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white">
            Live Rate Estimator & Direct Stay Reservation
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Calculate exact pricing for your dates with no hidden surcharge. All suites include free 1 Gbps WiFi, full kitchen access, and hotel amenities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Controls & Guest Information Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#141820] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold font-display text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Select Stay Dates & Suite</span>
            </h3>

            {/* Room Type Selector */}
            <div className="space-y-1.5">
              <label htmlFor="suite-select" className="text-xs font-mono text-slate-300">
                Suite Category:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {Object.values(ROOM_TYPES).map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setRoomId(r.id);
                      if (guests > r.maxGuests) setGuests(r.maxGuests);
                    }}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      roomId === r.id
                        ? 'bg-amber-400/10 border-amber-400 text-white'
                        : 'bg-[#181D26] border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <p className="text-xs font-bold leading-tight">{r.name}</p>
                    <p className="text-[11px] text-amber-400 font-mono mt-1 tabular-nums">
                      {formatYen(r.basePricePerNight)} / nt
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Dates & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="check-in-date" className="text-xs font-mono text-slate-300 flex items-center gap-1">
                  <span>Check-In Date</span>
                </label>
                <input
                  id="check-in-date"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-[#1A1F2B] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                />
                {errors.checkInDate && (
                  <p className="text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.checkInDate}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="check-out-date" className="text-xs font-mono text-slate-300 flex items-center gap-1">
                  <span>Check-Out Date</span>
                </label>
                <input
                  id="check-out-date"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-[#1A1F2B] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                />
                {errors.checkOutDate && (
                  <p className="text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.checkOutDate}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="guest-count-select" className="text-xs font-mono text-slate-300 flex items-center gap-1">
                  <Users className="w-3 h-3 text-amber-400" />
                  <span>Guests (Max {currentRoom.maxGuests})</span>
                </label>
                <select
                  id="guest-count-select"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-[#1A1F2B] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                >
                  {Array.from({ length: currentRoom.maxGuests }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n} className="bg-[#1A1F2B] text-white">
                      {n} {n === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guest Contact Details Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmitInquiry} className="space-y-4 pt-4 border-t border-white/10">
                <p className="text-xs font-bold text-white uppercase font-mono tracking-wide">
                  Guest Contact Information
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="guest-full-name" className="text-xs text-slate-300 font-medium">
                      Full Name *
                    </label>
                    <input
                      id="guest-full-name"
                      type="text"
                      placeholder="e.g. Kenji Sato"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-[#1A1F2B] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="guest-email-address" className="text-xs text-slate-300 font-medium">
                      Email Address *
                    </label>
                    <input
                      id="guest-email-address"
                      type="email"
                      placeholder="kenji@example.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full bg-[#1A1F2B] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="guest-phone-number" className="text-xs text-slate-300 font-medium">
                      Telephone / WhatsApp *
                    </label>
                    <input
                      id="guest-phone-number"
                      type="tel"
                      placeholder="+81-90-1234-5678"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-[#1A1F2B] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="special-requests-input" className="text-xs text-slate-300 font-medium">
                      Special Requests (Optional)
                    </label>
                    <input
                      id="special-requests-input"
                      type="text"
                      placeholder="Baby cot, late self-check-in, high floor"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full bg-[#1A1F2B] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  <span>Request Instant Reservation Confirmation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* Success Confirmation Banner */
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Reservation Request Registered</span>
                  </div>
                  <p className="text-xs text-emerald-200/90 leading-relaxed">
                    Thank you, <strong className="text-white">{guestName}</strong>! Your stay request for{' '}
                    <strong className="text-white">{currentRoom.name}</strong> ({nights} Nights, {checkIn} to {checkOut}) has been sent to Minn Kasai. Check-in instructions and your digital mobile key will be sent to <strong className="text-white">{guestEmail}</strong>.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-amber-400 hover:text-amber-300 underline font-mono cursor-pointer"
                >
                  Make another rate calculation or modify dates
                </button>
              </div>
            )}
          </div>

          {/* Right: Dynamic Price Breakdown Card (5 Cols) */}
          <div className="lg:col-span-5 bg-[#171B24] border border-white/15 rounded-2xl p-6 sm:p-8 space-y-6 sticky top-24 shadow-2xl">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest font-semibold">
                Transparent Rate Quotation
              </span>
              <h4 className="text-xl font-bold font-display text-white mt-1">
                {currentRoom.name}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {nights} {nights === 1 ? 'Night' : 'Nights'} · {guests} {guests === 1 ? 'Guest' : 'Guests'}
              </p>
            </div>

            {/* Line Items */}
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between items-center">
                <span>
                  Base Room Rate ({formatYen(currentRoom.basePricePerNight)} × {nights} nts)
                </span>
                <span className="font-mono text-white tabular-nums">
                  {formatYen(pricing.baseRateTotal)}
                </span>
              </div>

              {pricing.extraGuestsTotal > 0 && (
                <div className="flex justify-between items-center text-amber-300">
                  <span>
                    Additional Guest Surcharge ({guests - 2} extra × {nights} nts)
                  </span>
                  <span className="font-mono tabular-nums">
                    +{formatYen(pricing.extraGuestsTotal)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span>Professional Sanitization & Turnover</span>
                <span className="font-mono text-white tabular-nums">
                  {formatYen(pricing.cleaningFee)}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-400 border-t border-white/5 pt-2">
                <span>Japanese Consumption Tax (10%)</span>
                <span className="font-mono text-slate-300 tabular-nums">
                  {formatYen(pricing.tax)}
                </span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="border-t border-white/15 pt-4 flex items-baseline justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase font-mono">Total Estimated Stay</p>
                <p className="text-[11px] text-amber-300 font-mono mt-0.5">
                  Avg. {formatYen(pricing.averagePerNight)} / night
                </p>
              </div>
              <p className="text-3xl font-bold font-display text-amber-400 tabular-nums">
                {formatYen(pricing.total)}
              </p>
            </div>

            {/* Included Value Additions */}
            <div className="bg-[#12151C] p-4 rounded-xl border border-white/5 space-y-2 text-[11px] text-slate-300">
              <p className="font-semibold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Complimentary Inclusions:</span>
              </p>
              <ul className="space-y-1 text-slate-400 pl-5 list-disc">
                <li>Unlimited 1 Gbps fiber optic WiFi</li>
                <li>Full induction kitchenette & cookware</li>
                <li>Fresh Japanese linens, towels & bathrobes</li>
                <li>Free luggage hold before check-in & after checkout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
