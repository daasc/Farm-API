import type { Farm, FeedingRecord } from '@prisma/client';

export interface Pasture {
  id: string;
  farmId: string;
  name: string;
  cattleCount: number;
  avgWeightKg: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  farm?: Farm;
  feedingRecords?: FeedingRecord[];
}

export interface PastureInput {
  farmId: string;
  name: string;
  cattleCount: number;
  avgWeightKg: number;
  category: string;
}
