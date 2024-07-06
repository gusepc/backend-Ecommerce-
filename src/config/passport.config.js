import passport from "passport";
import local from "passport-local";
import { createHash, isValidatePassword } from "../utils.js";
import GitHubStrategy from "passport-github2";
import cartsServices from "../services/cartService.js";
import userModel from "../dao/mongo/models/usser.model.js";
import UserDTO from "../dao/DTOs/user.dto.js";
import usersService from "../services/usersService.js";
import config from "./config.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL,
      },

      async (accesToken, refreshToken, profile, done) => {
        try {
          let user = await userModel.findOne({ email: profile._json.email || profile._json.login });
          if (user) {
            user = new UserDTO(user);
            setLastConection(user.email);

            return done(null, user);
          }
          let cart = await cartsServices.addCart();
          let result = await userModel.create({
            first_name: profile._json.name,
            last_name: "",
            email: profile._json.email || profile._json.login,
            age: "",
            password: "",
            cart: cart._id,
          });
          result = new UserDTO(result);
          return done(null, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
      try {
        let user = await userModel.findOne({ email: username });
        if (user) {
          let isValidate = isValidatePassword(user, password);
          user = new UserDTO(user);

          if (user && isValidate) {
            return done(null, user);
          }
        }
        return done(null, false);
      } catch (error) {
        console.log(error);
        return done(null, false);
      }
    })
  );

  passport.use(
    "register",
    new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
      const { first_name, last_name, email, age } = req.body;
      // let cart = await cartManager.addCart()
      let cart = await cartsServices.addCart();
      console.log(cart);
      try {
        let user = await userModel.findOne({ email: username });

        if (user) {
          return done(null, true);
        }

        let result = await userModel.create({
          first_name,
          last_name,
          email,
          age,
          password: createHash(password),
          cart: cart,
        });

        return done(null, result);
      } catch (error) {
        return done(error);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });
};
async function setLastConection(userEmail) {
  let user = await usersService.findOne({ email: userEmail });
  user.lastConnection = new Date();
  await user.save();
  console.log(user.lastConnection);
}

export default initializePassport;
