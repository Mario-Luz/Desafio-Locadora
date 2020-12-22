export default (app, controller, route) => {
  app
    .route(`/${route}`)
    .all(app.auth)
    .get((req, res) => {
      controller.getAll(req.query).then((result) => {
        res.header("X-Total", result.count);
        res.status(result.statusCode);
        res.json(result.data);
      });
    })
    .post((req, res) => {
      controller.create(req.body).then((result) => {
        res.status(result.statusCode);
        res.json(result.data);
      });
    });
  app
    .route(`/${route}/:id`)
    .all(app.auth)
    .get((req, res) => {
      controller.getById(req.params).then((result) => {
        res.status(result.statusCode);
        res.json(result.data);
      });
    })
    .put((req, res) => {
      controller.update(req.body, req.params).then((result) => {
        res.status(result.statusCode);
        res.json(result.data);
      });
    })
    .delete((req, res) => {
      controller.delete(req.params).then((result) => {
        res.sendStatus(result.statusCode);
      });
    });
};
