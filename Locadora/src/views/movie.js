import setDefaultRoutes from "../classes/routes";
import MovieController from "../controllers/movie";

import HttpStatus from "http-status";

export default (app) => {
  const movieController = new MovieController(app.datasource.models.movie);

  setDefaultRoutes(app, movieController, "filmes");

  app
    .route(`/filmes/:id/alugar`)
    .all(app.auth)
    .post((req, res) => {
      if (!req.body.hasOwnProperty("userId")) {
        res.status(HttpStatus.BAD_REQUEST);
        res.json('Parâmetro "userId" é obrigatório!');
      }
      movieController.rent(req.params.id, req.body.userId).then((result) => {
        res.status(result.statusCode);
        res.json(result.data);
      });
    });
};
