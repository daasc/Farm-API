import { z } from 'zod';

export const pastureSchema = z.object({
  farmId: z.string().uuid('farmId deve ser um UUID'),
  name: z.string().min(1, 'Nome é obrigatório'),
  cattleCount: z.number().min(0, 'cattleCount deve ser numérico'),
  avgWeightKg: z.number().min(0, 'avgWeightKg deve ser numérico'),
  category: z.string().min(1, 'Categoria é obrigatória'),
});

export type PastureInput = z.infer<typeof pastureSchema>;
