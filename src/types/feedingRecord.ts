import type { Pasture } from '@prisma/client';

export interface FeedingRecord {
  id: string;
  product: string;
  daysUsed: number;
  feedKg: number;
  consumptionPercentPV: number;
  pastureId: string;
  createdAt: Date;
  updatedAt: Date;
  recordedAt: Date;
  pasture?: Pasture;
}

export interface FeedingRecordInput {
  product: string;
  daysUsed: number;
  feedKg: number;
  consumptionPercentPV: number;
  pastureId: string;
  recordedAt: Date;
}
