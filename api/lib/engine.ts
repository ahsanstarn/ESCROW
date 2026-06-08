import { prisma } from './prisma';

export type EscrowState =
  | 'CREATED' | 'DEPOSITED' | 'SHIPPED' | 'IN_TRANSIT'
  | 'DELIVERED' | 'CONFIRMED' | 'RELEASED'
  | 'DISPUTED' | 'REFUNDED' | 'CANCELLED';

export const VALID_TRANSITIONS: Record<EscrowState, EscrowState[]> = {
  CREATED:      ['DEPOSITED', 'CANCELLED'],
  DEPOSITED:    ['SHIPPED', 'DISPUTED', 'CANCELLED'],
  SHIPPED:      ['IN_TRANSIT', 'DELIVERED', 'DISPUTED'],
  IN_TRANSIT:   ['DELIVERED', 'DISPUTED'],
  DELIVERED:    ['CONFIRMED', 'DISPUTED'],
  CONFIRMED:    ['RELEASED'],
  RELEASED:     [],
  DISPUTED:     ['REFUNDED', 'RELEASED', 'CONFIRMED', 'CANCELLED'],
  REFUNDED:     [],
  CANCELLED:    [],
};

export async function transitionEscrow(
  escrowId: string,
  toState: EscrowState,
  triggeredBy?: string,
  reason?: string,
  metadata?: Record<string, unknown>
) {
  const escrow = await prisma.escrow.findUnique({ where: { id: escrowId } });
  if (!escrow) throw new Error('Escrow not found');

  const fromState = escrow.status as EscrowState;
  const allowed = VALID_TRANSITIONS[fromState];
  if (!allowed.includes(toState)) {
    throw new Error(`Invalid transition: ${fromState} → ${toState}`);
  }

  const updates: Record<string, unknown> = { status: toState };
  const now = new Date();

  if (toState === 'SHIPPED') updates.shipmentDate = now;
  else if (toState === 'DELIVERED') {
    updates.deliveryDate = now;
    if (!escrow.disputeDeadline) {
      updates.disputeDeadline = new Date(now.getTime() + escrow.confirmationWindowHours * 3600000);
    }
  } else if (toState === 'CONFIRMED') updates.confirmedAt = now;
  else if (toState === 'RELEASED') updates.releasedAt = now;

  await prisma.$transaction([
    prisma.escrow.update({ where: { id: escrowId }, data: updates }),
    prisma.stateTransition.create({
      data: {
        escrowId, fromState, toState, triggeredBy, reason,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    }),
  ]);

  return { fromState, toState, escrowId };
}

export function calcFee(amount: number, bp: number = 250): number {
  return Math.round((amount * bp) / 10000 * 100) / 100;
}
