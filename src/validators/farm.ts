import { z } from 'zod';

export const farmSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  location: z.string().min(1, 'Localização é obrigatória'),
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
  adminId: z.string().uuid('adminId deve ser um UUID'),
});

export type FarmInput = z.infer<typeof farmSchema>;
