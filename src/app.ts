import dotenv from 'dotenv';
dotenv.config();

// import './types/session';
import express from 'express';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import path from 'path';

import shopRoutes from './routes/shop.routes';
import cartRoutes from './routes/cart.routes';

const app = express();

// Redis Client
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.connect().catch(console.error);

console.log('Connected to redis client');
console.log('\nYou can access Redis Insight at: http://localhost:5540');

// Session Store
const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'sess:',
});

// Serve static JavaScript
app.use(express.static(path.join(__dirname, 'public')));
// Express Config
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
  })
);

// Routes
app.use('/', shopRoutes);
app.use('/cart', cartRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
