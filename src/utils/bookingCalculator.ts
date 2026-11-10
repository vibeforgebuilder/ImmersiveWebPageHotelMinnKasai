/**
 * Pure calculation logic for Minn Kasai booking inquiries & rate estimation
 */

export interface RoomRateConfig {
  id: string;
  name: string;
  basePricePerNight: number; // in JPY
  maxGuests: number;
  extraGuestFee: number;
  cleaningFee: number;
}

export const ROOM_TYPES: Record<string, RoomRateConfig> = {
  'standard-twin': {
    id: 'standard-twin',
    name: 'Standard Twin Suite',
    basePricePerNight: 16000,
    maxGuests: 3,
    extraGuestFee: 3000,
    cleaningFee: 4000,
  },
  'family-suite': {
    id: 'family-suite',
    name: 'Family Suite with Dining Lounge',
    basePricePerNight: 24000,
    maxGuests: 5,
    extraGuestFee: 3500,
    cleaningFee: 5000,
  },
  'deluxe-residence': {
    id: 'deluxe-residence',
    name: 'Deluxe Multi-Bed Residence',
    basePricePerNight: 32000,
    maxGuests: 6,
    extraGuestFee: 4000,
    cleaningFee: 6000,
  },
};

export interface PriceBreakdown {
  nights: number;
  guests: number;
  baseRateTotal: number;
  extraGuestsTotal: number;
  cleaningFee: number;
  subtotal: number;
  tax: number;
  total: number;
  averagePerNight: number;
  currency: string;
}

export function calculateStayPrice(
  roomId: string,
  nights: number,
  guests: number
): PriceBreakdown {
  const room = ROOM_TYPES[roomId] || ROOM_TYPES['standard-twin'];
  const safeNights = Math.max(1, Math.min(60, nights || 1));
  const safeGuests = Math.max(1, Math.min(room.maxGuests, guests || 2));

  // Base rate covers 2 guests
  const extraGuestsCount = Math.max(0, safeGuests - 2);
  const extraGuestsTotal = extraGuestsCount * room.extraGuestFee * safeNights;
  const baseRateTotal = room.basePricePerNight * safeNights;
  const cleaningFee = room.cleaningFee;

  const subtotal = baseRateTotal + extraGuestsTotal + cleaningFee;
  // Japanese consumption tax 10%
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;
  const averagePerNight = Math.round(total / safeNights);

  return {
    nights: safeNights,
    guests: safeGuests,
    baseRateTotal,
    extraGuestsTotal,
    cleaningFee,
    subtotal,
    tax,
    total,
    averagePerNight,
    currency: 'JPY',
  };
}

export function formatYen(amount: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0,
  }).format(amount);
}

export interface BookingFormValues {
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  roomType: string;
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateBookingForm(values: Partial<BookingFormValues>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!values.fullName || values.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (minimum 2 characters)';
  }

  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please provide a valid email address';
  }

  if (!values.phone || values.phone.replace(/[\s+-]/g, '').length < 8) {
    errors.phone = 'Please provide a valid telephone number';
  }

  if (!values.checkInDate) {
    errors.checkInDate = 'Please select check-in date';
  }

  if (!values.checkOutDate) {
    errors.checkOutDate = 'Please select check-out date';
  } else if (values.checkInDate && values.checkOutDate <= values.checkInDate) {
    errors.checkOutDate = 'Check-out date must be after check-in date';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const diffTime = outDate.getTime() - inDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}
