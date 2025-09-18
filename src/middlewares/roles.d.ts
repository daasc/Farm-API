import type { Response, NextFunction } from 'express';
import type { AuthRequest } from './auth.js';
export declare function requireRole(role: string): (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=roles.d.ts.map