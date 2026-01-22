require("dotenv").config();

const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const { createClient } = require("redis");
const path = require("path");

const shopRoutes = require("./routes/shop");

const app = express();

// Redis Client
const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.connect().catch(console.error);

// Session Store
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "sess:"
});

// Express Config
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// Routes
app.use("/", shopRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
