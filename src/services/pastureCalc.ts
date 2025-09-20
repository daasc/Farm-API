// Funções utilitárias para cálculos dos campos derivados do Pasture
// Funções utilitárias para cálculos dos campos derivados do Pasture
import type { PastureInput } from '../types/pasture.js';

export function calculateAEF(area: number, percentAEF: number): number {
  return (area * percentAEF) / 100;
}

export function calculateAnimalsTotal(input: PastureInput): number {
  return (
    input.vacas +
    input.bezerros +
    input.novilha +
    input.touro +
    input.gabarro +
    input.tropa +
    input.bois
  );
}

export function calculateUA(input: PastureInput): number {
  return (
    ((input.vacas * input.vacasWeight +
      input.bezerros * input.bezerrosWeight +
      input.novilha * input.novilhaWeight +
      input.touro * input.touroWeight +
      input.gabarro * input.gabarroWeight +
      input.tropa * input.tropaWeight +
      input.bois * input.boisWeight) *
      30) /
    450
  );
}

export function calculateStockingRate(UA: number, AEF: number): number {
  return AEF > 0 ? UA / AEF : 0;
}

export function calculateFeedBunkOffer(cocho: number, animalsTotal: number): number {
  return animalsTotal > 0 ? cocho / animalsTotal : 0;
}

export function calculateOccupation(animalsTotal: number): boolean {
  return animalsTotal > 0;
}

export function calculateUAExtra(animals: number, weight: number): number {
  return (animals * weight) / 450;
}

export function calculateStockingRateExtra(UAExtra: number, AEF: number): number {
  return AEF > 0 ? UAExtra / AEF : 0;
}

export function calculateDeficit(demand: number, cocho: number): number {
  return demand - cocho;
}

export function calculatePastureDerivedFields(input: PastureInput) {
  const AEF = calculateAEF(input.area, input.percentAEF);
  const animalsTotal = calculateAnimalsTotal(input);
  const UA = calculateUA(input);
  const stockingRate = calculateStockingRate(UA, AEF);
  const feedBunkOffer = calculateFeedBunkOffer(input.cocho, animalsTotal);
  const occupation = calculateOccupation(animalsTotal);
  const UAExtra = calculateUAExtra(input.animals, input.weight);
  const stockingRateExtra = calculateStockingRateExtra(UAExtra, AEF);
  const deficit = calculateDeficit(input.demand ?? 0.05, input.cocho);

  return {
    AEF,
    animalsTotal,
    UA,
    stockingRate,
    feedBunkOffer,
    occupation,
    UAExtra,
    stockingRateExtra,
    deficit,
  };
}
