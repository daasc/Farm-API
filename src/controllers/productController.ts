import prisma from '../config/prisma.js';
import { handleError } from '../utils/errorUtils.js';
import type { ProductInput } from '../types/product.js';

class ProductController {
  async createProduct(data: ProductInput) {
    try {
      const product = await prisma.product.create({ data });
      return { message: 'Product created successfully', data: product };
    } catch (error) {
      throw handleError(error);
    }
  }

  async getAllProducts({
    page = 1,
    pageSize = 10,
    search = '',
    sortBy = 'name',
    sortOrder = 'asc',
  }: {
    page?: number;
    pageSize?: number;
    search?: string;
    sortBy?: keyof ProductInput;
    sortOrder?: 'asc' | 'desc';
  } = {}) {
    try {
      const skip = (page - 1) * pageSize;
      const where = search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { category: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {};

      console.log('search:', search, 'where:', where);

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          orderBy: { [sortBy]: sortOrder },
          skip,
          take: pageSize,
        }),
        prisma.product.count({ where }),
      ]);

      return {
        message: 'Products retrieved successfully',
        data: products,
        pagination: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
      };
    } catch (error) {
      throw handleError(error);
    }
  }

  async getProductById(id: string) {
    try {
      const product = await prisma.product.findUnique({ where: { id } });
      if (!product) throw { status: 404, message: 'Product not found' };
      return { message: 'Product retrieved successfully', data: product };
    } catch (error) {
      throw handleError(error);
    }
  }

  async updateProduct(id: string, data: Partial<ProductInput>) {
    try {
      const product = await prisma.product.update({ where: { id }, data });
      return { message: 'Product updated successfully', data: product };
    } catch (error) {
      throw handleError(error);
    }
  }

  async deleteProduct(id: string) {
    try {
      await prisma.product.delete({ where: { id } });
      return { message: 'Product deleted successfully' };
    } catch (error) {
      throw handleError(error);
    }
  }
}

export default ProductController;
