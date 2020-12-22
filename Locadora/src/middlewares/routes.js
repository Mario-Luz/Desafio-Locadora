import path from "path";
import fs from "fs";

export default (app) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, OPTIONS, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  const dir = path.join(__dirname, "../views");
  fs.readdirSync(dir).forEach((file) => {
    let rota = require(path.join(dir, file));
    rota.default(app);
  });
};
