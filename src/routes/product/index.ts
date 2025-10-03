import { Router } from 'express';
import type { Request, Response } from 'express';
import ProductController from '../../controllers/productController.js';
import { ProductInputSchema } from '../../validators/product.js';
import { handleError } from '../../utils/errorUtils.js';
import { formatZodErrors } from '../../utils/formatZodErrors.js';

const router = Router();
const controller = new ProductController();

// CREATE
router.post('/', async (req: Request, res: Response) => {
  try {
    const parsed = ProductInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: 'Payload inválido', errors: formatZodErrors(parsed.error) });
    }
    const result = await controller.createProduct(parsed.data);
    res.json(result);
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

// GET ALL
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await controller.getAllProducts();
    res.json(result);
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

// GET BY ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) return res.status(400).json({ message: 'Missing id parameter' });
    const result = await controller.getProductById(id);
    res.json(result);
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

// UPDATE
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) return res.status(400).json({ message: 'Missing id parameter' });
    const result = await controller.updateProduct(id, req.body);
    res.json(result);
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

// DELETE
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) return res.status(400).json({ message: 'Missing id parameter' });
    const result = await controller.deleteProduct(id);
    res.json(result);
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

export default router;
