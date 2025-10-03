import { z } from 'zod';

export const FarmTypeEnum = z.enum(['CRIA', 'RECRIA', 'ENGORDA', 'CICLO_COMPLETO']);

export const FarmInputSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  location: z.string().min(1, 'Localização é obrigatória'),
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
  adminId: z.string().uuid('adminId deve ser um UUID'),
  types: z.array(FarmTypeEnum).min(1, 'At least one type is required'),
});

export type FarmInput = z.infer<typeof FarmInputSchema>;
