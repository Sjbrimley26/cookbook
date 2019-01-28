const passport = require("passport"),
      addStrategies = require("./auth");

addStrategies(passport);

const app = require("express")(),
      server = require("http").Server(app),
      io = require("socket.io")(server),
      addSocketEvents = require("./io"),
      mongoose = require("mongoose"),
      { addMiddlewares, ...routes } = require("./routes")


require("dotenv").config();

// Server starts after mongoose connects

const startServer = () => {
  addMiddlewares(app);
  addSocketEvents(io);

  app.use(passport.initialize());
  app.get("/", (req, res) => res.status(200).send("connected!"));
  app.use("/newUser", routes.newUser);
  app.use("/login", routes.login);

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  server.listen(
    3000, 
    console.log.bind(console, "Now listening on port 3000")
  );
};

// Connect to Mongo

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on(
  "error", 
  console.log.bind(console, "connection error: ")
);

db.once("open", startServer);
