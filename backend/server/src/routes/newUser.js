const router = require("express").Router(),
      bcrypt = require("bcryptjs"),
      { User } = require("../models")


router.post("/", async (req, res, next) => {
  const { email, password, ...details } = req.body;
  
  if (!username || !password) {
    return next(new Error("Email or password missing!"));
  }

  try {
    const existing = await User.find({ email });
    if (existing) {
      return next(new Error("Email already registered!"));
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) return next(err);

      const newUser = new User({
        email,
        password: hash,
        ...details
      });

      await newUser.save();

      res.status(200).json({
        email,
        message: "Account registered successfully!"
      });
    });
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;
