import prisma from '../config/prisma.js';
import type { PastureInput, ListQuery } from '../types/index.js';
import { handleError } from '../utils/errorUtils.js';

class PastureController {
  async createPasture(data: PastureInput) {
    try {
      const pasture = await prisma.pasture.create({ data });
      return { message: 'Pasture created successfully', data: pasture };
    } catch (error) {
      throw handleError(error);
      // throw new Error('Error creating pasture'); --- IGNORE ---
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
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          // add other searchable fields here if needed
        ];
      }

      const total = await prisma.pasture.count({ where });
      const pastures = await prisma.pasture.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { [sortBy]: sortOrder },
      });

      return {
        message: 'Pastures retrieved successfully',
        data: pastures,
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
      return { message: 'Pasture retrieved successfully', data: pasture };
    } catch (error) {
      throw handleError(error);
    }
  }

  async updatePasture(id: string, data: Partial<PastureInput>) {
    try {
      const pasture = await prisma.pasture.update({ where: { id }, data });
      return { message: 'Pasture updated successfully', data: pasture };
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
