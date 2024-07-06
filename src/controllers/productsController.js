import productsService from "../services/productService.js";
import CustomError from "../services/errors/CustomErrors.js";
import { generateErrorInfo } from "../services/errors/info.js";
import EErrors from "../services/errors/enums.js";
import mailsController from "./mailsController.js";
import userServices from "../services/usersService.js";

async function addProduct(req, res, next) {
  try {
    const newProduct = req.body;

    const { title, description, price, stock, status, category, thumbnail, code } = req.body;

    if (!title || !description || !price || !stock || !status || !category || !code) {
      CustomError.createError({
        name: "Error al crear el producto",
        cause: generateErrorInfo({ title, description, price, stock, status, category, code }),
        message: "No se puedo crear el producto",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }
    newProduct.owner = String(req.session.passport.user);
    console.log(newProduct);
    let result = await productsService.addProduct(newProduct);
    res.send({ result: "succes", payload: result });
  } catch (error) {
    next(error);
  }
}
async function getProducts(req, res) {
  try {
    const products = await productsService.getProducts(req);
    res.json(products);
  } catch (error) {
    res.send("no se pudo completar tu petición");
  }
}
async function getProductById(req, res, next) {
  try {
    let pId = req.params.id;
    let productById = await productsService.getProductById(pId);

    if (!productById || productById.error) {
      CustomError.createError({
        name: "Error al encontrar el producto",
        cause: "El ID ingresado, no esta relacionado a ningun producto",
        message: `No se puedo obtener el producto, el id '${pId}' no es valido`,
        code: EErrors.INVALID_ID_ERROR,
      });
    }

    res.send(productById);
  } catch (error) {
    next(error);
  }
}
async function updateProduct(req, res, next) {
  try {
    let pId = req.params.id;
    const updatedProdduct = req.body;
    let productById = await productsService.getProductById(pId);

    if (!productById || productById.error) {
      CustomError.createError({
        name: "Error al actualizar el producto",
        cause: "El ID ingresado, no esta relacionado a ningun producto",
        message: `No se puedo actualizar el producto, el id '${pId}' no es valido`,
        code: EErrors.INVALID_ID_ERROR,
      });
    }

    let result = await productsService.updateProduct(pId, updatedProdduct);
    res.send(`se actualizo tu producto: ${result}`);
  } catch (error) {
    next(error);
  }
}
async function deleteProduct(req, res, next) {
  try {
    let pId = req.params.id;
    let productById = await productsService.getProductById(pId);

    if (!productById || productById.error) {
      CustomError.createError({
        name: "Error al eliminar el producto",
        cause: "El ID ingresado, no esta relacionado a ningun producto",
        message: `No se puedo eliminar el producto, el id '${pId}' no es valido`,
        code: EErrors.INVALID_ID_ERROR,
      });
    }

    if (productById.owner == String(req.session.passport.user) || String(req.session.user.role) == "admin") {
      let result = await productsService.deleteProduct(pId);
      if (productById.owner) {
        let owner = await userServices.findById(productById.owner);
        console.log(owner.email);
        if (owner.email.includes("@")) {
          mailsController.sendMailDeletedProduct(owner.email, req, res, productById);
        }
      }
      res.send(`se elimino el producto ${result}`);
    } else {
      res.send("el producto no te pertenece, no lo puedes eliminar");
    }
  } catch (error) {
    next(error);
  }
}

export default {
  getProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
