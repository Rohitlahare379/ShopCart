import mongoose from "mongoose";
import Customer from "../models/customer.model.js";
import Product from "../models/product.model.js";

export async function addToCart(req, res) {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const customer = await Customer.findById(req.user._id);

    const cartItemIndex = customer.cart.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (cartItemIndex > -1) {
      // Product already in cart
      const currentQuantity = customer.cart[cartItemIndex].quantity;
      const newQuantity = currentQuantity + 1;

      if (newQuantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: "Cannot exceed product stock",
        });
      }

      customer.cart[cartItemIndex].quantity = newQuantity;
    } else {
      // Product not in cart
      if (1 > product.stock) {
        return res.status(400).json({
          success: false,
          message: "Product is out of stock",
        });
      }

      customer.cart.push({
        product: productId,
        quantity: 1,
      });
    }

    await customer.save();
    
    // Return populated cart
    await customer.populate("cart.product");

    return res.status(200).json({
      success: true,
      message: "Cart updated",
      cart: customer.cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add to cart",
    });
  }
}

export async function getCart(req, res) {
  try {
    const customer = await Customer.findById(req.user._id).populate("cart.product");

    return res.status(200).json({
      success: true,
      cart: customer.cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
    });
  }
}

export async function updateCartQuantity(req, res) {
  try {
    const { productId } = req.params;
    const { quantity } = req.body ?? {};

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    if (typeof quantity !== "number" || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a number and at least 1",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: "Quantity cannot exceed product stock",
      });
    }

    const customer = await Customer.findById(req.user._id);

    const cartItemIndex = customer.cart.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not in cart",
      });
    }

    customer.cart[cartItemIndex].quantity = quantity;
    await customer.save();

    await customer.populate("cart.product");

    return res.status(200).json({
      success: true,
      message: "Cart quantity updated",
      cart: customer.cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update cart quantity",
    });
  }
}

export async function removeFromCart(req, res) {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const customer = await Customer.findById(req.user._id);

    const cartItemIndex = customer.cart.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not in cart",
      });
    }

    customer.cart.splice(cartItemIndex, 1);
    await customer.save();

    await customer.populate("cart.product");

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart: customer.cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to remove product from cart",
    });
  }
}
