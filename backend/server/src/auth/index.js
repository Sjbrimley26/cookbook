const verifyPassword = require("./verifyPassword"),
      { Strategy: LocalStrategy } = require("passport-local"),
      { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt"),
      { User } = require("../models")

require("dotenv").config();

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      {
        session: false,
        usernameField: "email"
      },
      async function(email, password, next) {
        try {
          const user = await verifyPassword(email, password, next);
          if (!user) {
            return next(new Error("Invalid username or password!"));
          }
          return next(null, user, {
            message: "Logged in successfully!"
          });
        } catch (err) {
          next(err);
        }
      }
    )
  );
  
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
        session: false,
        usernameField: "email"
      },
      async (jwt, next) => {
        try {
          const user = await User.find({
            email: jwt.user
          });
          return next(null, user.public);
        } catch (err) {
          return next(err);
        }
      }
    )
  );
};
