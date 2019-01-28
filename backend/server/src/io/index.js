const { Recipe, User } = require("../models");

module.exports = io => {
  io.on("connection", socket => {
    socket.emit("success", "connected successfully!");

    socket.on("upload recipe", async data => {
      const { author } = data;
      const newRecipe = new Recipe(data);
      try {
        await newRecipe.save();
        io.emit("new recipe", data);
        const user = await User.findOneAndUpdate({ _id: author }, {
          $push: { recipes: newRecipe.id }
        });
      } 
      catch (err) {
        socket.emit("error", "Error saving recipe");
        console.log("Error saving recipe", err);
      }
    });

    socket.on("get user recipes", async id => {
      const user = await User.findById(id);
      const recipes = await Recipe.find({ author: id });
      socket.emit("user recipes", recipes.map(i => i.name));
    })

  });
};
