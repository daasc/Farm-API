import prisma from '../config/prisma.js';
import type { FeedingRecordInput } from '../types/feedingRecord.js';
import type { ListQuery } from '../types/index.js';
import { handleError } from '../utils/errorUtils.js';

class FeedingRecordController {
  async createFeedingRecord(data: FeedingRecordInput) {
    try {
      const record = await prisma.feedingRecord.create({ data });
      return { message: 'FeedingRecord created successfully', data: record };
    } catch (error) {
      throw handleError(error);
    }
  }

  async getAllFeedingRecords(query: ListQuery) {
    try {
      const {
        page = 1,
        pageSize = 10,
        search = '',
        sortBy = 'createdAt',
        sortOrder = 'desc',
        ...filters
      } = query;
      const where: any = { ...filters };
      if (search) {
        where.OR = [
          { description: { contains: search, mode: 'insensitive' } },
          // Add more searchable fields as needed
        ];
      }

      const total = await prisma.feedingRecord.count({ where });

      const records = await prisma.feedingRecord.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      return {
        message: 'FeedingRecords retrieved successfully',
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

  async getFeedingRecordById(id: string) {
    try {
      const record = await prisma.feedingRecord.findUnique({ where: { id } });
      if (!record) throw { status: 404, message: 'FeedingRecord not found' };
      return { message: 'FeedingRecord retrieved successfully', data: record };
    } catch (error) {
      throw handleError(error);
    }
  }

  async updateFeedingRecord(id: string, data: Partial<FeedingRecordInput>) {
    try {
      const record = await prisma.feedingRecord.update({ where: { id }, data });
      if (!record) throw { status: 404, message: 'FeedingRecord not found' };
      return { message: 'FeedingRecord updated successfully', data: record };
    } catch (error) {
      throw handleError(error);
    }
  }

  async deleteFeedingRecord(id: string) {
    try {
      await prisma.feedingRecord.delete({ where: { id } });
      return { message: 'FeedingRecord deleted successfully' };
    } catch (error) {
      throw handleError(error);
    }
  }
}

export default FeedingRecordController;
