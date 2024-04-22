import ticketService from "../services/ticketService.js";
import cartService from "../services/cartService.js";
import productService from "../services/productService.js";
import TicketDTO from "../dao/DTOs/ticket.dto.js";

async function addTicket(req, res) {
  try {
    // verificacion carrito y creacion de ticket
    if (req.params.cid != req.user.cart) {
      res.redirect("/products");
      return;
    }
    let cart = await cartService.cartById(req.user.cart);
    const products = await productService.getProducts();
    cart = cart.products;
    if (cart.length == 0) {
      res.send("agrega algo a tu carrito para completar la compra");
      return;
    }
    const acepted = [];
    const rejected = [];
    let totalAmount = 0;
    cart.forEach((cartProducts) => {
      const product = products.find((p) => p._id.toString() === cartProducts.product._id.toString());
      if (product.stock >= cartProducts.quantity) {
        acepted.push(cartProducts);
      } else {
        rejected.push(cartProducts);
      }
    });
    acepted.forEach((e) => {
      totalAmount += e.product.price * e.quantity;
    });

    if (acepted.length == 0) {
      res.send("lo sentimos, no pudimos completar tu compra debido a falta de stock");
      return;
    }
    const newTicket = new TicketDTO({
      code: req.user.cart,
      date: new Date(),
      amount: totalAmount,
      purchaser: req.user.email,
    });
    ticketService.addTicket(newTicket);
    // actualizacion de productsDB

    for (const element of acepted) {
      const product = products.find((p) => p._id.toString() === element.product._id.toString());
      product.stock -= element.quantity;
      console.log(product);
      await productService.updateProduct(product._id, product);
    }

    await cartService.emptyCart(req.user.cart.toString(), rejected);

    res.json({ "Los siguientes productos no pudieron agregarse por falta de stock:": rejected, "Tu ticket:": newTicket });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

export default {
  addTicket,
};
