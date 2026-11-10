import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateStayPrice,
  calculateNights,
  validateBookingForm,
  ROOM_TYPES,
} from './bookingCalculator';

test('calculateStayPrice accurately computes base rate, cleaning, and tax', () => {
  // Standard twin for 2 nights with 2 guests
  const breakdown = calculateStayPrice('standard-twin', 2, 2);
  assert.equal(breakdown.nights, 2);
  assert.equal(breakdown.guests, 2);
  assert.equal(breakdown.baseRateTotal, 32000); // 16,000 * 2
  assert.equal(breakdown.extraGuestsTotal, 0); // 2 guests = 0 extra
  assert.equal(breakdown.cleaningFee, 4000);
  assert.equal(breakdown.subtotal, 36000); // 32000 + 4000
  assert.equal(breakdown.tax, 3600); // 10%
  assert.equal(breakdown.total, 39600);
  assert.equal(breakdown.averagePerNight, 19800);
});

test('calculateStayPrice computes extra guest fees correctly', () => {
  // Family suite for 3 nights with 4 guests (2 included, 2 extra)
  const breakdown = calculateStayPrice('family-suite', 3, 4);
  const extraGuests = 2;
  const expectedExtra = extraGuests * ROOM_TYPES['family-suite'].extraGuestFee * 3;
  assert.equal(breakdown.extraGuestsTotal, expectedExtra);
  assert.equal(breakdown.cleaningFee, 5000);
});

test('calculateNights correctly computes difference in calendar days', () => {
  assert.equal(calculateNights('2026-12-01', '2026-12-04'), 3);
  assert.equal(calculateNights('2026-12-01', '2026-12-01'), 1); // fallback min 1
  assert.equal(calculateNights('', ''), 1);
});

test('validateBookingForm flags missing fields and invalid dates', () => {
  const invalidResult = validateBookingForm({
    fullName: '',
    email: 'bad-email',
    phone: '123',
    checkInDate: '2026-12-05',
    checkOutDate: '2026-12-03',
  });
  assert.equal(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.fullName);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.phone);
  assert.ok(invalidResult.errors.checkOutDate);

  const validResult = validateBookingForm({
    fullName: 'Kenji Sato',
    email: 'kenji@example.com',
    phone: '+81-90-1234-5678',
    checkInDate: '2026-12-05',
    checkOutDate: '2026-12-08',
  });
  assert.equal(validResult.isValid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});
