import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';
import { comparePassword, hashPassword } from '../utils/password.js';
import { JWT_SECRET, REFRESH_TOKEN_SECRET } from '../config/index.js';
import { handleError } from '../utils/errorUtils.js'


class AuthController {
  static tokenHandler(user: any) {
    const role = user.role || 'farm';
    const payload = { id: user.id, role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return { token, refreshToken };
  }

   async login(body: { email: string; password: string }) {
    try {
      const { email, password } = body;
      const user = await prisma.admin.findUnique({ where: { email } }) || await prisma.farm.findUnique({ where: { email } });
      if (!user) throw { status: 401, message: 'Invalid credentials' };
      const valid = await comparePassword(password, user.passwordHash);
      if (!valid) throw { status: 401, message: 'Invalid credentials' };
      return AuthController.tokenHandler(user);
    } catch (error) {
      throw handleError(error);
    }
  }

  static async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;
    if (!refreshToken) return { status: 400, message: 'Refresh token required' };
    try {
      const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as any;
      const token = jwt.sign({ id: payload.id, role: payload.role }, JWT_SECRET, { expiresIn: '15m' });
      return { token };
    } catch (error) {
       throw handleError(error);
    }
  }
}


export default AuthController;
