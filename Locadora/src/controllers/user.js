import crypto from "crypto";
import { defaultResponse, errorResponse } from "../classes/responses";

import ControllerBase from "../classes/controller";

class UserController extends ControllerBase {
  auth(email, password) {
    return this.model
      .findOne({ where: { email } })
      .then((user) => {
        if (
          user.get("password") ===
          crypto.createHash("md5").update(password).digest("hex")
        ) {
          return defaultResponse(user);
        }
        return errorResponse("User not Found!");
      })
      .catch((error) => errorResponse(error.message));
  }

  getByEmail(email) {
    return this.Aplicativos.findOne({ where: { email } })
      .then((result) => defaultResponse(result))
      .catch((error) => errorResponse(error.message));
  }
}

export default UserController;
