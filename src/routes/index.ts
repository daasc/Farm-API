import { Router } from 'express';
import login from './login/index.js';
import admin from './admin/index.js';
import farm from './farms/index.js';
import pasture from './pastures/index.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

router.use('/auth', login);
router.use('/admin', admin);
router.use('/farm', farm);
router.use('/pasture', pasture);

// Adicione outros router.use conforme necessário

export default router;
