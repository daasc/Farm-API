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

  async getAllProducts() {
    try {
      const products = await prisma.product.findMany({ orderBy: { name: 'asc' } });
      return { message: 'Products retrieved successfully', data: products };
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
