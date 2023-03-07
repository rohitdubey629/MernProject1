const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/e-commerce", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });
