import { Router } from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlist.controller.js";
import { authenticateCustomer } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/:productId", authenticateCustomer, addToWishlist);
router.get("/", authenticateCustomer, getWishlist);
router.delete("/:productId", authenticateCustomer, removeFromWishlist);

export default router;
