import prisma from '../config/prisma.js';
import { hashPassword } from '../utils/password.js';
import { JWT_SECRET, REFRESH_TOKEN_SECRET } from '../config/index.js';
import jwt from 'jsonwebtoken';
import { handleError } from '../utils/errorUtils.js';

class AdminController {
  async getAdminById(id: string) {
    try {
      const admin = await prisma.admin.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!admin) throw { status: 404, message: 'Admin not found' };
      return admin;
    } catch (error) {
      throw handleError(error);
    }
  }

  async updateAdmin(
    id: string,
    data: { name?: string; email?: string; password?: string; role?: string },
  ) {
    try {
      console.log('Updating admin:', id, data);
      const updateData: any = { ...data };
      if (data.password) {
        updateData.passwordHash = await hashPassword(data.password);
        delete updateData.password;
      }
      const admin = await prisma.admin.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return admin;
    } catch (error: any) {
      console.log('error:', error);
      console.error(error);
      if (error.code === 'P2025') {
        return { status: 404, message: 'Admin not found' };
      }
      throw error;
    }
  }
  static tokenHandler(user: any) {
    const role = user.role || 'farm';
    const payload = { id: user.id, role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    });
    return { token, refreshToken };
  }
  async createUser(body: { email: string; password: string; role?: string; name?: string }) {
    try {
      const { name, email, password, role } = body;
      const existingAdmin = await prisma.admin.findUnique({ where: { email } });
      if (existingAdmin) return { status: 409, message: 'Email already in use' };
      const passwordHash = await hashPassword(password);
      const user = await prisma.admin.create({
        data: { name: name ?? '', email, passwordHash, role: 'admin' },
      });
      return AdminController.tokenHandler(user);
    } catch (error) {
      throw handleError(error);
    }
  }
  /**
   * Lista admins com paginação, busca e ordenação.
   * @param params { page?: number, pageSize?: number, search?: string, orderBy?: string, order?: 'asc' | 'desc' }
   */
  async getAllAdmins(
    params: {
      page?: number;
      pageSize?: number;
      search?: string;
      orderBy?: string;
      order?: 'asc' | 'desc';
    } = {},
  ) {
    try {
      const {
        page = 1,
        pageSize = 10,
        search = '',
        orderBy = 'createdAt',
        order = 'desc',
      } = params;

      const where = search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' as const } },
              { email: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {};

      const admins = await prisma.admin.findMany({
        where,
        orderBy: { [orderBy]: order },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      const total = await prisma.admin.count({ where });
      return {
        data: admins,
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      };
    } catch (error) {
      throw handleError(error);
    }
  }
}

export default AdminController;
