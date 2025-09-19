import { Router } from 'express';
import type { Request, Response } from 'express';
import FeedingRecordController from '../../controllers/feedingRecordController.js';
import { feedingRecordSchema } from '../../validators/feedingRecord.js';
import { formatZodErrors } from '../../utils/formatZodErrors.js';
import { authenticateToken } from '../../middlewares/auth.js';
import { requireRole } from '../../middlewares/roles.js';
import { handleError } from '../../utils/errorUtils.js';

const router = Router();
const feedingRecordController = new FeedingRecordController();

router.use(authenticateToken);

router.post('/', requireRole('admin'), async (req: Request, res: Response) => {
  const parsed = feedingRecordSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: 'Payload inválido', errors: formatZodErrors(parsed.error) });
  }
  try {
    const record = await feedingRecordController.createFeedingRecord(req.body);
    res.status(201).json(record);
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

router.get('/', requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const records = await feedingRecordController.getAllFeedingRecords(req.query);
    res.json(records);
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

router.get('/:id', requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Missing feedingRecord id parameter' });
    const record = await feedingRecordController.getFeedingRecordById(id);
    res.json(record);
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

router.put('/:id', requireRole('admin'), async (req: Request, res: Response) => {
  const parsed = feedingRecordSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: 'Payload inválido', errors: formatZodErrors(parsed.error) });
  }
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Missing feedingRecord id parameter' });
    const record = await feedingRecordController.updateFeedingRecord(id, req.body);
    res.json(record);
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

router.delete('/:id', requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Missing feedingRecord id parameter' });
    const result = await feedingRecordController.deleteFeedingRecord(id);
    res.json(result);
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

export default router;
