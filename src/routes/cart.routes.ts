import { Router, Request, Response } from 'express';
import { redisClient } from '../redis/client';
import { products } from '../data/products';
import { catchAsync } from '../utils/catchAsync';

const router = Router();

const CART_TTL = 60 * 30; // 30 minutes

const getCartKey = (req: Request) => `cart:${req.sessionID}`;

// Add to Cart
router.post(
  '/',
  catchAsync(async (req: Request, res: Response) => {
    console.log('Reached add to cart');
    const { productId } = req.body;
    console.log('Product id: ', productId);
    const cartKey = getCartKey(req);

    await redisClient.hIncrBy(cartKey, productId, 1);
    await redisClient.expire(cartKey, CART_TTL);

    res.redirect('/cart');
  })
);

// Remove from Cart
router.delete(
  '/:productId',
  catchAsync(async (req: Request, res: Response) => {
    const { productId } = req.params;
    const cartKey = getCartKey(req);

    await redisClient.hDel(cartKey, productId);
    await redisClient.expire(cartKey, CART_TTL);

    res.redirect('/cart');
  })
);

// View Cart
router.get(
  '/',
  catchAsync(async (req: Request, res: Response) => {
    const cartKey = getCartKey(req);
    const cartData = await redisClient.hGetAll(cartKey);

    console.log('Cart Data: ', cartData);

    const cartItems = Object.entries(cartData).map(([productId, quantity]) => {
      const product = products.find((p) => p.id === productId);
      return {
        product,
        quantity: Number(quantity),
        total: product ? product.price * Number(quantity) : 0,
      };
    });

    console.log('Cart Items: ', cartItems);

    const cartTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

    res.render('cart', {
      cartItems,
      cartTotal,
    });
  })
);

// Clear Cart
router.get(
  '/clear',
  catchAsync(async (req: Request, res: Response) => {
    const cartKey = getCartKey(req);
    await redisClient.del(cartKey);
    res.redirect('/cart');
  })
);

export default router;
