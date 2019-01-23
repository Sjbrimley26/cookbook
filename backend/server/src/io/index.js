const { Recipe } = require("../models");

module.exports = io => {
  io.on("connection", socket => {
    socket.emit("success", "connected successfully!");

    socket.on("upload recipe", async data => {
      const newRecipe = new Recipe(data);
      try {
        await newRecipe.save();
        io.emit("new recipe", data);
      } 
      catch (err) {
        socket.emit("error", "Error saving recipe");
        console.log("Error saving recipe", err);
      }
    });

  });
};
