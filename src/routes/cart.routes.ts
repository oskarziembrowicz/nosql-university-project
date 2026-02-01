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
    const { productId } = req.body;
    const cartKey = getCartKey(req);

    if (!productId) throw new Error('Missing productId');

    await redisClient.hIncrBy(cartKey, productId, 1);
    await redisClient.expire(cartKey, CART_TTL);

    res.sendStatus(200);
  })
);

// Buy cart
router.post(
  '/buy',
  catchAsync(async (req: Request, res: Response) => {
    const cartKey = getCartKey(req);
    const cartData = await redisClient.hGetAll(cartKey);

    let total = 0;

    for (const [productId, quantity] of Object.entries(cartData)) {
      const product = products.find((p) => p.id === productId);
      if (product) {
        total += product.price * Number(quantity);
      }
    }

    // Clear cart
    await redisClient.del(cartKey);

    // Store success message in session
    req.session.purchaseMessage = `You bought items from the cart for ${total.toFixed(
      2
    )}zł`;

    res.redirect('/cart');
  })
);

// Remove from Cart
router.post(
  '/:productId',
  catchAsync(async (req: Request, res: Response) => {
    const { productId } = req.params;
    const cartKey = getCartKey(req);
    const productCount = await redisClient.hGet(cartKey, productId);

    if (productCount === '1') {
      await redisClient.hDel(cartKey, productId);
      await redisClient.expire(cartKey, CART_TTL);
    } else {
      await redisClient.hIncrBy(cartKey, productId, -1);
    }

    res.redirect('/cart');
  })
);

// View Cart
router.get(
  '/',
  catchAsync(async (req: Request, res: Response) => {
    const cartKey = getCartKey(req);
    const cartData = await redisClient.hGetAll(cartKey);

    const cartItems = Object.entries(cartData).map(([productId, quantity]) => {
      const product = products.find((p) => p.id === productId);
      return {
        product,
        quantity: Number(quantity),
        total: product ? product.price * Number(quantity) : 0,
      };
    });

    const cartTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

    // Read & clear flash message
    const successMessage = req.session.purchaseMessage;
    delete req.session.purchaseMessage;

    res.render('cart', {
      cartItems,
      cartTotal,
      successMessage,
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
