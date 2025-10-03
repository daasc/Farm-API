import { z } from 'zod';

export const pastureSchema = z.object({
  farmId: z.string().uuid('farmId deve ser um UUID'),
  name: z.string().min(1, 'Nome é obrigatório'),
  area: z.number().min(0, 'Área deve ser numérica'),
  percentAEF: z.number().min(0, 'percentAEF deve ser numérico'),
  vacas: z.number().min(0, 'vacas deve ser numérico'),
  vacasWeight: z.number().min(0, 'vacasWeight deve ser numérico'),
  bezerros: z.number().min(0, 'bezerros deve ser numérico'),
  bezerrosWeight: z.number().min(0, 'bezerrosWeight deve ser numérico'),
  novilha: z.number().min(0, 'novilha deve ser numérico'),
  novilhaWeight: z.number().min(0, 'novilhaWeight deve ser numérico'),
  touro: z.number().min(0, 'touro deve ser numérico'),
  touroWeight: z.number().min(0, 'touroWeight deve ser numérico'),
  gabarro: z.number().min(0, 'gabarro deve ser numérico'),
  gabarroWeight: z.number().min(0, 'gabarroWeight deve ser numérico'),
  tropa: z.number().min(0, 'tropa deve ser numérico'),
  tropaWeight: z.number().min(0, 'tropaWeight deve ser numérico'),
  bois: z.number().min(0, 'bois deve ser numérico'),
  boisWeight: z.number().min(0, 'boisWeight deve ser numérico'),
  animals: z.number().min(0, 'animals deve ser numérico'),
  weight: z.number().min(0, 'weight deve ser numérico'),
  cocho: z.number().min(0, 'cocho deve ser numérico'),
  demand: z.number().min(0, 'demand deve ser numérico').default(0.05),
  observation: z.string().optional(),
  pesoCat: z.number().optional(),
  category: z.array(z.object({
    name: z.string().min(1, 'Nome da categoria é obrigatório'),
    quantity: z.number().refine(val => val !== undefined && val !== null, {
      message: 'Quantidade é obrigatória',
    }),
  })).min(1, 'Ao menos uma categoria é obrigatória'),
});

export type PastureInput = z.infer<typeof pastureSchema>;
