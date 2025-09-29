import type { Pasture } from '@prisma/client';

export interface HistoryPasture {
  id: string;
  pastureId: string;
  updatedAt: Date;
  // All Pasture fields
  AEF: number;
  animalsTotal: number;
  UA: number;
  stockingRate: number;
  feedBunkOffer: number;
  occupation: boolean;
  UAExtra: number;
  stockingRateExtra: number;
  deficit: number;
  name: string;
  area: number;
  percentAEF: number;
  vacas: number;
  vacasWeight: number;
  bezerros: number;
  bezerrosWeight: number;
  novilha: number;
  novilhaWeight: number;
  touro: number;
  touroWeight: number;
  gabarro: number;
  gabarroWeight: number;
  tropa: number;
  tropaWeight: number;
  bois: number;
  boisWeight: number;
  animals: number;
  weight: number;
  cocho: number;
  demand: number;
  observation?: string;
  pesoCat?: number;
  category: string;
  createdAt: Date;
  changes: Record<string, { old: any; new: any }>;
  pasture?: Pasture;
}
