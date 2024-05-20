import jwt from "jsonwebtoken";
import config from "./config.js";
const secret = config.secret;

function generateResetToken(email) {
  return jwt.sign({ email }, secret, { expiresIn: "1h" });
}

function verifyResetToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

export default {
  generateResetToken,
  verifyResetToken,
};
