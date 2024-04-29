import bcrypt, { genSaltSync } from "bcrypt";
import { faker } from "@faker-js/faker";

export const createHash = (password) => bcrypt.hashSync(password, genSaltSync(10));
export const isValidatePassword = (user, password) => bcrypt.compareSync(password, user.password);

export const generateProduct = () => {
  return {
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    stock: faker.number.int({ max: 100 }),
    status: faker.datatype.boolean(),
    category: faker.commerce.productAdjective(),
    thumbnails: faker.image.url(),
    code: faker.commerce.isbn(),
  };
};
