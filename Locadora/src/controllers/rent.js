import HttpStatus from "http-status";

import ControllerBase from "../classes/controller";

import { defaultResponse, errorResponse } from "../classes/responses";

class RentController extends ControllerBase {
  return(id) {
    return this.model
      .findByPk(id)
      .then((rent) => {
        if (!rent) {
          throw new Error("Register not Found!");
        }
        if (rent.get("return")) {
          throw new Error("returned film!");
        }
        let movies = this.model.sequelize.models.movie;
        movies.findByPk(rent.get("movieId")).then((movie) => {
          movie.increment("stock");

          rent.update({ return: Date.now() });

          return defaultResponse(
            "successfully returned film!",
            HttpStatus.UNPROCESSABLE_ENTITY
          );
        });
      })
      .catch((error) => errorResponse(error.message));
  }
}

export default RentController;
