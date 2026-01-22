const express = require("express");
const router = express.Router();

// Temporary product list (in-memory)
const products = [
  { id: "1", name: "Apple", price: 1.5 },
  { id: "2", name: "Banana", price: 1.0 },
  { id: "3", name: "Orange", price: 2.0 }
];

router.get("/", (req, res) => {
  res.render("index", {
    products,
    sessionID: req.session.id
  });
});

module.exports = router;
