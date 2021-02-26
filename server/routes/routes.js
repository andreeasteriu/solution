const app = require("express")();

const postsRoute = require(__dirname + "/./api/posts");

app.use("/posts", postsRoute);


module.exports = app;
