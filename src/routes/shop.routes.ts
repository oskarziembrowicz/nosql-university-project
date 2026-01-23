import { Router, Request, Response } from 'express';
import { products } from '../data/products';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  if (!req.session.initialized) {
    req.session.initialized = true;
  }

  res.render('index', {
    products,
  });
});

export default router;
