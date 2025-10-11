import prisma from '../config/prisma.js';
import type { ListQuery, FarmInput } from '../types/index.js';
import { handleError } from '../utils/errorUtils.js';
import { hashPassword } from '../utils/password.js';

class FarmController {
  async createFarm(data: FarmInput) {
    try {
      const { password, email, ...farmDataWithoutAdmin } = data;
      const existingFarm = await prisma.farm.findUnique({ where: { email } });
      if (existingFarm) {
        throw { status: 400, message: 'Já existe uma fazenda cadastrada com este email.' };
      }

      const passwordHash = await hashPassword(password);

      const newFarm = await prisma.farm.create({
        data: { ...farmDataWithoutAdmin, email, passwordHash },
      });

      const { passwordHash: _, ...farmWithoutPassword } = newFarm;

      return { message: 'Farm created successfully', data: farmWithoutPassword };
    } catch (error) {
      throw handleError(error);
    }
  }

  async getFarmWithPasturesAndFeedingRecords(farmId: string) {
    try {
      const farm = await prisma.farm.findUnique({
        where: { id: farmId },
        include: {
          pastures: {
            include: {
              feedingRecords: true,
            },
          },
        },
      });
      if (!farm) throw { status: 404, message: 'Farm not found' };
      return { message: 'Farm, pastures e feedingRecords encontrados', data: farm };
    } catch (error) {
      throw handleError(error);
    }
  }

  async getAllFarms(query: ListQuery) {
    try {
      const {
        page = 1,
        pageSize = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        search = '',
      } = query;

      const skip = (Number(page) - 1) * Number(pageSize);
      const take = Number(pageSize);

      const where = search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {};

      const [farms, total] = await Promise.all([
        prisma.farm.findMany({
          where,
          skip,
          take,
          orderBy: { [sortBy]: sortOrder },
          select: {
            id: true,
            name: true,
            email: true,
            location: true,
            role: true,
            types: true,
            active: true,

            // add other fields you want to return
            createdAt: true,
            updatedAt: true,
          },
        }),
        prisma.farm.count({ where }),
      ]);

      return {
        message: 'Farms retrieved successfully',
        data: farms,
        pagination: {
          total,
          page: Number(page),
          pageSize: Number(pageSize),
          totalPages: Math.ceil(total / Number(pageSize)),
        },
      };
    } catch (error) {
      console.log(error);
      throw handleError(error);
    }
  }

  async getFarmById(id: string) {
    try {
      const farm = await prisma.farm.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          // adicione outros campos necessários aqui
        },
      });

      if (!farm) {
        throw { status: 404, message: 'Farm not found' };
      }

      return { message: 'Farm retrieved successfully', data: farm };
    } catch (error) {
      throw handleError(error);
    }
  }

  async updateFarm(id: string, data: FarmData) {
    try {
      const { password, ...updateData } = data;

      // If password is provided, hash it and include in update
      if (password) {
        updateData.passwordHash = await hashPassword(password);
      }

      // Remove fields that should not be updated directly
      delete updateData.admin;

      const updatedFarm = await prisma.farm.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          // add other fields as needed
        },
      });

      return { message: 'Farm updated successfully', data: updatedFarm };
    } catch (error) {
      throw handleError(error);
    }
  }

  async deleteFarm(id: string) {
    try {
      const farm = await prisma.farm.findUnique({ where: { id } });
      if (!farm) {
        throw { status: 404, message: 'Farm not found' };
      }

      await prisma.farm.delete({ where: { id } });

      return { message: 'Farm deleted successfully' };
    } catch (error) {
      throw handleError(error);
    }
  }
}

export default FarmController;
