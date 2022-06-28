/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// import models
const User = require("../models/userModel");
const cartModel = require("../models/cartModel");

// logger
const logger = require("../log/winston");

// import mailSender
const mailSender = require("../notifications/mail");

module.exports = (passport) => {
  // authenticate user
  const authenticateUser = async (email, password, done) => {
    try {
      if (!(await User.exists({ email }))) {
        logger.error("Mail doesn't exists");
        return done(null, false, { message: "User doesn't exists" });
      }
      const user = await User.findOne({ email: email });

      user.password = await bcrypt.hash(user.password, 10);
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return done(null, false, { message: "Incorrect password" });
      }
      done(null, user);
    } catch (err) {
      done(err);
    }
  };

  // register user
  const registerUser = async (req, email, password, done) => {
    const { confirmPassword, firstName, lastName, userName, phone, adress } = req.body;

    try {
      if (await User.exists({ email })) {
        logger.error("This mail already exists");
        return done(null, false, {
          message: "This mail already exists, login"
        });
      }

      const user = await User.create({
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        userName,
        phone,
        adress
      });

      done(null, {
        ...user,
        id: user._id
      });

      const cart = await cartModel.create({ user: user._id.toString() });
      logger.info(`CARRO CREADO CON EXITO: ${cart}`);

      const template = `
        <div>
        <h1 style="color: blue;"> 
          Un usuario se a registrado en Ecoderce:
        </h1>
        <li>Nombre: ${user.firstName} ${user.lastName}</li>
        <li>Mail: ${user.email}</li>
        <li>Telefono: ${user.phone}</li>
        </div>
      `;
      await mailSender.aNewUserMail(template);
      logger.info("se registro un nuevo usuario");
    } catch (err) {
      logger.error(err);
      done(err);
    }
  };

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );
  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      registerUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    done(null, await User.findById(id));
  });
};
