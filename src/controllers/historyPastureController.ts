import prisma from '../config/prisma.js';
import { handleError } from '../utils/errorUtils.js';

class HistoryPastureController {
  async getByPastureId(pastureId: string, query: any = {}) {
    try {
      const { page = 1, pageSize = 10, startDate, endDate, ...filters } = query;

      const where: any = { pastureId, ...filters };
      if (startDate || endDate) {
        where.updatedAt = {};
        if (startDate) where.updatedAt.gte = new Date(startDate);
        if (endDate) where.updatedAt.lte = new Date(endDate);
      }

      const total = await prisma.historyPasture.count({ where });
      const records = await prisma.historyPasture.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { updatedAt: 'desc' },
      });

      return {
        message: 'HistoryPasture records for pastureId retrieved successfully',
        data: records,
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
  async getAll(query: any) {
    try {
      const { page = 1, pageSize = 10, pastureId, startDate, endDate, ...filters } = query;

      const where: any = { ...filters };
      if (pastureId) where.pastureId = pastureId;
      if (startDate || endDate) {
        where.updatedAt = {};
        if (startDate) where.updatedAt.gte = new Date(startDate);
        if (endDate) where.updatedAt.lte = new Date(endDate);
      }

      const total = await prisma.historyPasture.count({ where });
      const records = await prisma.historyPasture.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { updatedAt: 'desc' },
      });

      return {
        message: 'HistoryPasture records retrieved successfully',
        data: records,
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

  async getById(id: string) {
    try {
      const record = await prisma.historyPasture.findUnique({ where: { id } });
      if (!record) throw { status: 404, message: 'HistoryPasture not found' };
      return { message: 'HistoryPasture record retrieved successfully', data: record };
    } catch (error) {
      throw handleError(error);
    }
  }

  async deleteById(id: string) {
    try {
      await prisma.historyPasture.delete({ where: { id } });
      return { message: 'HistoryPasture record deleted successfully' };
    } catch (error) {
      throw handleError(error);
    }
  }
}

export default HistoryPastureController;
