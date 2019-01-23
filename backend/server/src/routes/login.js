const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

const router = express.Router();

router.post("/", (req, res, next) => {
  passport.authenticate(
    "local",
    {
      session: false
    },
    (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return next(new Error("Invalid email!"));
      }
      req.login(user, err => {
        if (err) return next(err);
        const token = jwt.sign(
          { user },
          process.env.JWT_SECRET, 
          { expiresIn: "1d" }
        );
        return res.json({
          email: user,
          token
        });
      });
    }
  )(req, res, next);
});

module.exports = router;
