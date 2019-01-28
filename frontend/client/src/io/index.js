import io from "socket.io-client";
const socket = io("http://192.168.99.100:3000");

const addRecipe = recipe => {
  socket.emit("upload recipe", recipe);
};

const getUserRecipes = (id, cb) => {
  socket.on("user recipes", recipes => {
    socket.off("user recipes");
    cb(recipes);
  });
  socket.emit("get user recipes", id);
};

const subscribeToNewRecipes = 
  cb => socket.on("new recipe", cb);

const unsubscribeFromNewRecipes = 
  () => socket.off("new recipe");

export {
  addRecipe,
  subscribeToNewRecipes,
  unsubscribeFromNewRecipes,
  getUserRecipes
};
