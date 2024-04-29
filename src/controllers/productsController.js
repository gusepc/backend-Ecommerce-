import productsService from "../services/productService.js";
import CustomError from "../services/errors/CustomErrors.js";
import { generateErrorInfo } from "../services/errors/info.js";
import EErrors from "../services/errors/enums.js";

async function addProduct(req, res, next) {
  try {
    const newProduct = req.body;
    const { title, description, price, stock, status, category, code } = newProduct;
    if (!title || !description || !price || !stock || !status || !category || !code) {
      CustomError.createError({
        name: "Error al crear el producto",
        cause: generateErrorInfo({ title, description, price, stock, status, category, code }),
        message: "No se puedo crear el producto",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }
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

    productsService.updateProduct(pId, updatedProdduct);
    res.send("se actualizo tu producto");
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

    productsService.deleteProduct(pId);
    res.send(`se elimino el producto`);
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
