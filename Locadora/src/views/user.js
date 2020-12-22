import setDefaultRoutes from "../classes/routes";
import UserController from "../controllers/user";

export default (app) => {
  const userController = new UserController(app.datasource.models.user);

  setDefaultRoutes(app, userController, "usuarios");
};
