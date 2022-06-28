const path = require("path");
const { engine } = require("express-handlebars");

module.exports = (app) => {
  app.set("views", path.join(__dirname, "/../views"));
  app.engine(
    "handlebars",
    engine({
      layoutsDir: path.resolve(__dirname, "../views/layout"),
      partialsDir: path.resolve(__dirname, "../views/partials"),
      defaultLayout: "index"
    })
  );
  app.set("view engine", "handlebars");
};
