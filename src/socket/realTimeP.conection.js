import productModel from "../dao/mongo/models/product.model.js";
import productService from "../services/productService.js";

const socketP = async (socketServer) => {
  socketServer.on("connection", async (socket) => {
    console.log("usuario conectado a los productos");
    try {
      let products = await productService.getProducts();

      socketServer.emit("envioProductos", products);
    } catch (error) {}

    socket.on("nuevoProducto", async (newProduct) => {
      try {
        let products = await productService.getProducts();

        let existe = products.find((p) => p.code === newProduct.code);
        if (existe) {
          console.log("ya existe un producto con ese codigo");
        } else {
          await productService.addProduct(newProduct);

          let products = await productService.getProducts();

          socketServer.emit("envioProductos", products);
        }
      } catch (error) {
        console.log(error, error);
      }
    });
  });
};
export default socketP;
