import { Router, Request, Response } from "express";

const router = Router();

interface Product {
  id: string;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: "1", name: "Apple", price: 1.5 },
  { id: "2", name: "Banana", price: 1.0 },
  { id: "3", name: "Orange", price: 2.0 }
];

router.get("/", (req: Request, res: Response) => {
  res.render("index", {
    products,
    sessionID: req.sessionID
  });
});

export default router;
