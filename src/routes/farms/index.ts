import { Router } from 'express';
import type { Request, Response } from 'express';

import FarmController from '../../controllers/farmController.js';
import { handleError } from '../../utils/errorUtils.js';
import { authenticateToken } from '../../middlewares/auth.js';
import { requireRole } from '../../middlewares/roles.js';
import { farmSchema } from '../../validators/farm.js'
import { formatZodErrors } from '../../utils/formatZodErrors.js';

const router = Router();
const farmController = new FarmController();

router.use(authenticateToken);

router.post('/', requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const parsed = farmSchema.safeParse(body);
    if (!parsed.success) {
      return res.status(400).json({ message: 'Payload inválido', errors: formatZodErrors(parsed.error) });
    }
    const farm = await farmController.createFarm(body);
    res.json({ status: 200, data: farm });
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

router.get('/', requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const { query } = req;
    
    const farms = await farmController.getAllFarms(query);
    res.json({ status: 200, data: farms });
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

router.get('/:id', requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Missing farm id parameter' });
    }
    const farm = await farmController.getFarmById(id);
    res.json({ status: 200, data: farm });
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

router.put('/:id', requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    if (!id) {
      return res.status(400).json({ message: 'Missing farm id parameter' });
    }
    const farm = await farmController.updateFarm(id, body);
    res.json({ status: 201, data: farm });
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

router.delete('/:id', requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Missing farm id parameter' });
    }
    await farmController.deleteFarm(id);
    res.json({ status: 204, message: 'Farm deleted successfully' });
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

export default router;