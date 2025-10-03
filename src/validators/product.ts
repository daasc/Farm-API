import { z } from 'zod';

export const ProductInputSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  consumptionLevel: z.number().refine((val) => val !== undefined && val !== null, {
    message: 'Consumption level is required',
  }),
  feedBunkSpacing: z.number().refine((val) => val !== undefined && val !== null, {
    message: 'Feed bunk spacing is required',
  }),
});

export type ProductInput = z.infer<typeof ProductInputSchema>;
