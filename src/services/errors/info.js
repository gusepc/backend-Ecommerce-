export const generateErrorInfo = (product) => {
  let mensaje = `Alguno de los inputs fue invalido, recibimos los siguientes datos: `;
  for (const key in product) {
    mensaje += `${key} : ${product[key]}, `;
  }
  return mensaje;
};
