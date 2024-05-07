import productsService from "../services/productService.js";
import cartsService from "../services/cartService.js";
import SessionDTO from "../dao/DTOs/session.dto.js";
import { generateProduct } from "../utils.js";

async function getRoot(req, res) {
  let products = await productsService.getProducts(req);
  let status = "error";
  if (products.docs) {
    status = "success";
  }
  res.send({
    status: status,
    payload: products.docs,
    totalPages: products.totalPages,
    prevPage: products.prevPage,
    nextPage: products.nextPage,
    page: products.page,
    hasPrevPage: products.hasPrevPage,
    hasNextPage: products.hasNextPage,
    prevLink: products.prevLink,
    nextLink: products.nextLink,
  });
}

async function getProducts(req, res) {
  let session = new SessionDTO(req.session.user);
  let products = await productsService.getProducts(req);

  if (products.isValid) {
    res.render("products", {
      layout: "main",
      title: "products",
      product: products,
      style: "products.css",
      user: session,
    });
  } else {
    req.logger.info(`la pagina ${req.query.page} no existe`);
    res.send(`la pagina ${req.query.page} no existe`);
  }
}

async function getCart(req, res) {
  let cId = req.params.cid;
  const cart = await cartsService.cartById(cId);

  if (cart._id.toString() != req.session.user.cart) {
    res.send(`${cId} no es tu carrito`);
  } else if (cart._id) {
    res.render("cart", {
      layout: "main",
      title: "cart",
      cart: cart,
      style: "cart.css",
    });
  } else {
    req.logger.info(`${cId} no existe`);
    res.send(`${cId} no existe`);
  }
}
function getRtProducts(req, res) {
  res.render("realTimeProducts", {
    layout: "main",
    title: "realtimeproducts",
  });
}
function getChat(req, res) {
  res.render("chat"),
    {
      layout: "main",
      title: "LatinChat",
    };
}
function getMockingProducts(req, res) {
  const productos = [];
  for (let index = 0; index < 100; index++) {
    productos.push(generateProduct());
  }
  res.send(productos);
}
function getLogger(req, res) {
  const date = new Date();
  const formattedDateTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  req.logger.fatal(`Error fatal en: ${formattedDateTime}`);
  req.logger.error(`Error en: ${formattedDateTime}`);
  req.logger.warning(`Warinig en: ${formattedDateTime}`);
  req.logger.info(`Mensaje info desde: ${formattedDateTime}`);
  req.logger.http(`Error en: ${formattedDateTime}`);
  req.logger.debug(`Error debug en: ${formattedDateTime}`);
  res.send("Puedes revisar la consola o el archivo error.log dentro de ./src/errors");
}
function notFound(req, res, next) {
  req.logger.http(`La ruta: ${req.url} no existe`);
  res.status(404).send("La ruta solicitada no fue encontrada en este router.");
  next();
}

export default {
  getRoot,
  getProducts,
  getCart,
  getRtProducts,
  getChat,
  getMockingProducts,
  getLogger,
  notFound,
};
