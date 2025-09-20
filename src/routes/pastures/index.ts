import { Router } from 'express';
import type { Request, Response } from 'express';
import PastureController from '../../controllers/pastureController.js';
import { pastureSchema } from '../../validators/pasture.js';
import { formatZodErrors } from '../../utils/formatZodErrors.js';
import { authenticateToken } from '../../middlewares/auth.js';
import { requireRole } from '../../middlewares/roles.js';
import { handleError } from '../../utils/errorUtils.js';

const router = Router();
const pastureController = new PastureController();

router.use(authenticateToken);

// Nova rota para buscar feedingRecords de um pasture
router.get('/:id/feeding-records', requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Missing pasture id parameter' });
    }
    const result = await pastureController.getFeedingRecordsByPastureId(id);
    res.json(result);
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

router.post('/', requireRole('admin'), async (req: Request, res: Response) => {
  const parsed = pastureSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: 'Payload inválido', errors: formatZodErrors(parsed.error) });
  }
  try {
    const pasture = await pastureController.createPasture(req.body);
    res.status(201).json(pasture);
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

router.get('/', requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const pastures = await pastureController.getAllPastures(req.query);
    res.json(pastures);
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

router.get('/:id', requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Missing pasture id parameter' });
    }
    const pasture = await pastureController.getPastureById(id);
    res.json(pasture);
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

router.put('/:id', requireRole('admin'), async (req: Request, res: Response) => {
  const parsed = pastureSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: 'Payload inválido', errors: formatZodErrors(parsed.error) });
  }
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Missing pasture id parameter' });
    }
    const pasture = await pastureController.updatePasture(id, req.body);
    res.json(pasture);
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

router.delete('/:id', requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Missing pasture id parameter' });
    }
    const result = await pastureController.deletePasture(id);
    res.json(result);
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

export default router;
