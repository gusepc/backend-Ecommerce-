import dotenv from "dotenv";

dotenv.config();
export default {
  port: process.env.PORT,
  mongoURL: process.env.MONGOURL,
  adminName: process.env.ADMINNAME,
  adminPassword: process.env.ADMINPASSWORD,
  env: process.env.ENV,
  service: process.env.MAILING_SERVICE,
  host: process.env.MAILING_HOST,
  mail: process.env.MAILING_USER,
  password: process.env.MAILING_PASSWORD,
  secret: process.env.JWT_SECRET,
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
};
