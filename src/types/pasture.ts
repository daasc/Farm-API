export interface Pasture {
  id: string;
  farmId: string;
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
  updatedAt: Date;
  // Calculated fields
  AEF: number;
  animalsTotal: number;
  UA: number;
  stockingRate: number;
  feedBunkOffer: number;
  occupation: boolean;
  UAExtra: number;
  stockingRateExtra: number;
  deficit: number;
}

export interface PastureInput {
  farmId: string;
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
  demand?: number;
  observation?: string;
  pesoCat?: number;
  category: string;
}
