import { Router } from 'express';
import type { Request, Response } from 'express';
import AuthController from '../../controllers/authController.js';
import { handleError } from '../../utils/errorUtils.js';

const router = Router();
const authController = new AuthController();

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const user = await authController.login(body);
    res.json(user);
  } catch (error) {
    console.error('route', error);
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const result = await AuthController.refresh(req, res);
    if ('status' in result) {
      res.status(result.status).json({ message: result.message });
    } else {
      res.json(result);
    }
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

export default router;
