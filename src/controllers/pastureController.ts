import prisma from '../config/prisma.js';
import type { PastureInput, ListQuery } from '../types/index.js';
import { handleError } from '../utils/errorUtils.js';
import { calculatePastureDerivedFields } from '../services/pastureCalc.js';

class PastureController {
  async createPasture(payload: PastureInput) {
    try {
      const derived = calculatePastureDerivedFields(payload);

      console.log('Derived fields:', derived);
      console.log('Payload fields:', payload);

      const pasture = await prisma.pasture.create({ data: { ...payload, ...derived } });

      return { message: 'Pasture created successfully', data: pasture };
    } catch (error) {
      throw handleError(error);
    }
  }

  async getFeedingRecordsByPastureId(pastureId: string) {
    try {
      const pasture = await prisma.pasture.findUnique({
        where: { id: pastureId },
        include: { feedingRecords: true },
      });

      if (!pasture) throw { status: 404, message: 'Pasture not found' };
      return { message: 'FeedingRecords retrieved successfully', data: pasture };
    } catch (error) {
      throw handleError(error);
    }
  }

  async getAllPastures(query: ListQuery) {
    try {
      const {
        page = 1,
        pageSize = 10,
        search,
        sortBy = 'name',
        sortOrder = 'asc',
        ...filters
      } = query;

      const where: any = { ...filters };
      if (search) {
        where.OR = [{ name: { contains: search, mode: 'insensitive' } }];
      }

      const total = await prisma.pasture.count({ where });
      const pastures = await prisma.pasture.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { [sortBy]: sortOrder },
      });

      // Calcular campos derivados para cada pasture
      const data = pastures.map((p) => ({
        ...p,
        ...calculatePastureDerivedFields(p as any),
      }));

      return {
        message: 'Pastures retrieved successfully',
        data,
        pagination: {
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      };
    } catch (error) {
      throw handleError(error);
    }
  }

  async getPastureById(id: string) {
    try {
      const pasture = await prisma.pasture.findUnique({ where: { id } });
      if (!pasture) throw { status: 404, message: 'Pasture not found' };
      const derived = calculatePastureDerivedFields(pasture as any);
      return { message: 'Pasture retrieved successfully', data: { ...pasture, ...derived } };
    } catch (error) {
      throw handleError(error);
    }
  }

  async updatePasture(id: string, data: Partial<PastureInput>) {
    try {
      const pasture = await prisma.pasture.update({ where: { id }, data });
      const derived = calculatePastureDerivedFields({ ...pasture, ...data } as any);
      return { message: 'Pasture updated successfully', data: { ...pasture, ...derived } };
    } catch (error) {
      throw handleError(error);
    }
  }

  async deletePasture(id: string) {
    try {
      await prisma.pasture.delete({ where: { id } });
      return { message: 'Pasture deleted successfully' };
    } catch (error) {
      throw handleError(error);
    }
  }
}

export default PastureController;
