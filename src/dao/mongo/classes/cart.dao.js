import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import productService from "../../../services/productService.js";

class CartManager {
  async addCart(cart) {
    try {
      return await cartModel.create(cart);
    } catch (error) {
      return { error: error.message };
    }
  }
  async cartById(cId) {
    try {
      return await cartModel.findById(cId).lean();
    } catch (error) {
      return { error: error.message };
    }
  }
  async addToCart(cId, products, user) {
    try {
      console.log(String(user._id));
      let cart = await cartModel.findById(cId);
      products.forEach(async (e) => {
        console.log(e);
        let pId = e._id;
        let enCarrito = cart.products.findIndex((p) => p.product._id.toString() === pId);
        if (String(user._id) != e.owner) {
          if (enCarrito !== -1) {
            cart.products[enCarrito].quantity += 1;
          } else {
            cart.products.push({ product: pId, quantity: 1 });
          }
          console.log("producto agragado");
        } else {
          console.log("no puedes agragar productos propios");
        }
      });
      await cart.save();
      return cart;
    } catch (error) {
      return { error: error.message };
    }
  }
  async updateCart(cId, pId, newQuantity, user) {
    try {
      let product = await productService.getProductById(pId);

      console.log(product.owner);
      console.log(user);
      console.log(product.owner == user);
      if (product.owner != user) {
        let cart = await cartModel.findById(cId);

        let enCarrito = cart.products.findIndex((p) => p.product._id.toString() === pId);

        if (enCarrito !== -1) {
          if (newQuantity) {
            cart.products[enCarrito].quantity = newQuantity;
          } else {
            cart.products[enCarrito].quantity += 1;
          }
        } else {
          cart.products.push({ product: pId, quantity: 1 });
        }

        await cart.save();
        return `se anadio ${product}`;
      } else {
        console.log("No puedes agregar tus propios productos a tu carrito");
        return "No puedes agregar tus propios productos al tu carrito";
      }
    } catch (error) {
      return { error: error.message };
    }
  }
  async deleteProduct(cId, pId) {
    try {
      let product = await productModel.findById(pId);
      let cart = await cartModel.findById(cId);
      let enCarrito = cart.products.findIndex((p) => p.product._id.toString() === pId);

      if (enCarrito !== -1) {
        console.log(enCarrito);
        cart.products.splice(enCarrito, 1);
        await cart.save();
        return `se elimino ${product}`;
      } else {
        console.log("no exite ese producto en el carrito");
        return "no exite ese producto en el carrito";
      }
    } catch (error) {
      return { error: error.message };
    }
  }
  async emptyCart(cId, products) {
    try {
      let cart = await cartModel.findById(cId);
      cart.products = [];
      if (products) {
        for (const product of products) {
          cart.products.push(product);
        }
      }
      await cart.save();
      return cart;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default CartManager;
