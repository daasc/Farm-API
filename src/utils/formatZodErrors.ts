// Função utilitária para formatar erros do Zod para API
import type { ZodError } from 'zod';

export function formatZodErrors(error: ZodError): Array<{ path: string; message: string }> {
  return error._zod.def.map((err) => ({
    path: err.path.join('.'),
    message: err.message,
  }));
}
