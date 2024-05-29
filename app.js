import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import path from "path";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./src/config/passport.config.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

import productsRouter from "./src/routes/products.router.js";
import cartsRouter from "./src/routes/carts.router.js";
import sessionsRouter from "./src/routes/sessions.router.js";
import viewsRouter from "./src/routes/views.router.js";
import usersRouter from "./src/routes/users.router.js";

import socketChat from "./src/socket/chat.contection.js";
import socketP from "./src/socket/realTimeP.conection.js";

import config from "./src/config/config.js";
import errorHandler from "./src/middlewares/errors/index.js";
import { addLogger } from "./src/utils/logger.js";
import notFound from "./src/utils/notFound.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join("src/public")));

app.use(addLogger);

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongoURL,
    }),
    secret: "CoderSecret",
    resave: false,
    saveUninitialized: false,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: "CRUD Productos y Carritos",
    },
  },
  apis: [`./src/docs/**/*.yaml`],
};

const specs = swaggerJsdoc(swaggerOptions);

app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use("/", viewsRouter);
app.use("/", productsRouter);
app.use("/", cartsRouter);
app.use("/", sessionsRouter);
app.use("/", usersRouter);
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "src/views");
app.use(errorHandler);
app.use("*", notFound);

const httpServer = app.listen(config.port, () => console.log("server started"));

mongoose
  .connect(config.mongoURL)
  .then(() => {
    console.log("Conectado a la db...");
  })
  .catch(() => {
    console.log("No conectado a la db...");
  });

const socketServer = new Server(httpServer);
socketP(socketServer);
socketChat(socketServer);
