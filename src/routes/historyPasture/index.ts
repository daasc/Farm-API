import { Router } from 'express';
import type { Request, Response } from 'express';
import HistoryPastureController from '../../controllers/historyPastureController.js';
import { authenticateToken } from '../../middlewares/auth.js';
import { requireRole } from '../../middlewares/roles.js';
import { handleError } from '../../utils/errorUtils.js';

const router = Router();
const controller = new HistoryPastureController();

// GET /history-pasture/pasture/:pastureId
router.get('/pasture/:pastureId', async (req: Request, res: Response) => {
  try {
    const pastureId = req.params.pastureId as string;
    if (!pastureId) return res.status(400).json({ message: 'Missing pastureId parameter' });
    const result = await controller.getByPastureId(pastureId, req.query);
    res.json(result);
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

router.use(authenticateToken);

// GET /history-pasture?pastureId=&startDate=&endDate=&page=&pageSize=
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await controller.getAll(req.query);
    res.json(result);
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

// GET /history-pasture/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) return res.status(400).json({ message: 'Missing id parameter' });
    const result = await controller.getById(id);
    res.json(result);
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

// DELETE /history-pasture/:id (admin only)
router.delete('/:id', requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) return res.status(400).json({ message: 'Missing id parameter' });
    const result = await controller.deleteById(id);
    res.json(result);
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

export default router;
