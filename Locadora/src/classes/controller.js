import HttpStatus from "http-status";
import { defaultResponse, errorResponse } from "./responses";

class ControllerBase {
  constructor(model) {
    this.model = model;
  }

  getAll(where = {}) {
    return this.model
      .findAndCountAll({ where })
      .then((result) =>
        defaultResponse(result.rows, HttpStatus.OK, result.count)
      )
      .catch((error) => errorResponse(error.message));
  }

  getById(params) {
    return this.model
      .findOne({ where: params })
      .then((result) => defaultResponse(result))
      .catch((error) => errorResponse(error.message));
  }

  create(data) {
    return this.model
      .create(data)
      .then((result) => defaultResponse(result, HttpStatus.CREATED))
      .catch((error) =>
        errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
      );
  }

  update(data, params) {
    return this.model
      .update(data, { where: params })
      .then((result) => defaultResponse(result))
      .catch((error) =>
        errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
      );
  }

  delete(params) {
    return this.model
      .destroy({ where: params })
      .then((result) => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch((error) =>
        errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
      );
  }
}

export default ControllerBase;
