import jwt from "jsonwebtoken";

import UserController from "../controllers/user";

export default (app) => {
  const config = app.config;
  const userController = new UserController(app.datasource.models.user);

  app.post("/login", (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      userController
        .auth(email, password)
        .then(({ data }) => {
          const token = jwt.sign({ id: data.id }, config.jwtSecret, {
            expiresIn: "1h",
          });
          res.json({ auth: true, token });
        })
        .catch((error) => {
          console.log(error);
          res.sendStatus(HttpStatus.UNAUTHORIZED);
        });
    } else {
      res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
  });
  app.post("/logoff", (req, res) => {
    res.status(200).send({ auth: false, token: null });
  });
};
