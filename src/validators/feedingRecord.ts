import { z } from 'zod';

export const feedingRecordSchema = z.object({
  product: z.string().min(1, 'Produto é obrigatório'),
  daysUsed: z
    .number()
    .or(z.nan())
    .refine((val) => typeof val === 'number' && !isNaN(val), {
      message: 'daysUsed deve ser numérico',
    }),
  feedKg: z.number().refine((val) => typeof val === 'number' && !isNaN(val), {
    message: 'feedKg deve ser numérico',
  }),
  consumptionPercentPV: z.number().refine((val) => typeof val === 'number' && !isNaN(val), {
    message: 'consumptionPercentPV deve ser numérico',
  }),
  pastureId: z.string().uuid('pastureId deve ser um UUID'),
  recordedAt: z.preprocess(
    (val) => (typeof val === 'string' ? new Date(val) : val),
    z.date().refine((val) => val instanceof Date && !isNaN(val.getTime()), {
      message: 'recordedAt deve ser uma data válida',
    }),
  ),
  dataInicio: z.preprocess(
    (val) => (typeof val === 'string' ? new Date(val) : val),
    z.date().optional(),
  ),
  dataFim: z.preprocess(
    (val) => (typeof val === 'string' ? new Date(val) : val),
    z.date().optional(),
  ),
  categoria: z.string().optional(),
  abastecimentoKg: z.number().optional(),
});

export type FeedingRecordInput = z.infer<typeof feedingRecordSchema>;
