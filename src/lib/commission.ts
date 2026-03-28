// Platform commission rate (10%)
export const COMMISSION_RATE = 0.10;

export function calculateCommission(amountCents: number): number {
  return Math.round(amountCents * COMMISSION_RATE);
}
