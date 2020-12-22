import setDefaultRoutes from "../classes/routes";
import RentController from "../controllers/rent";

export default (app) => {
  const rentController = new RentController(app.datasource.models.rent);

  setDefaultRoutes(app, rentController, "alugueis");

  app
    .route(`/alugueis/:id/devolver`)
    .all(app.auth)
    .patch((req, res) => {
      rentController.return(req.params.id).then((result) => {
        res.status(result.statusCode);
        res.json(result.data);
      });
    });
};
