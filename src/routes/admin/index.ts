
import { Router } from 'express';
import type { Request, Response } from 'express';
import AdminController from '../../controllers/adminController.js';
import { handleError } from '../../utils/errorUtils.js';
import { authenticateToken } from '../../middlewares/auth.js';

const router = Router();
const adminController = new AdminController();

// Rota pública para criar admin
router.post('/create', async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const user = await adminController.createUser(body);
    res.json({ status: 200, data: user });
  } catch (error) {
    console.error(error);
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

// Middleware de autenticação para todas as rotas abaixo
router.use(authenticateToken);

router.get('/', async (req: Request, res: Response) => {
  try {
    console.log('Fetching all admins with query:', req.query);
    const { query } = req;
    const admins = await adminController.getAllAdmins(query);
    res.json({ status: 200, data: admins });
  } catch (error) {
    console.error(error);
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    console.log('Fetching admin with ID:', req.params.id);
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Missing admin id parameter' });
    }
    const admin = await adminController.getAdminById(id);
    res.json({ status: 200, data: admin });
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({ message });
  }
});

// router.put('/:id', async (req: Request, res: Response) => {
//   try {
//     console.log('Updating admin with data:');
//     const { id } = req.params;
//     const { body } = req;
//     if (!id) {
//       return res.status(400).json({ message: 'Missing admin id parameter' });
//     }
//     const admin = await adminController.updateAdmin(id, body);
//     res.json({ status: 200, data: admin });
//   } catch (error) {
//     console.error(error);
//     const { status, message } =  handleError(error);
//     res.status(status).json({ message });
//   }
// });

export default router;