import express from "express";
import bodyParser from "body-parser";
import config from "./config/config";
import datasource from "./config/datasource";
import setRoutes from "./middlewares/routes";
import autorization from "./middlewares/auth";

const app = express();

app.config = config;
app.datasource = datasource(app);

app.set("port", 8080);
app.use(bodyParser.json());

app.auth = autorization(app);

setRoutes(app);

export default app;
