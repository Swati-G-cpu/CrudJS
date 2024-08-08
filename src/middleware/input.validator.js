import Logger from "../utils/logger.js";
import * as Constants from "../constants/index.js";

class InputValidator {
  static validateObjectSchema = (data, schema, convert = false) => {
    const result = schema.validate(data, { abortEarly: false, convert });
    if (result.error) {
      const errorDetails = result.error.details.map((value) => ({
        error: value.message,
        path: value.path,
      }));
      return errorDetails;
    }
    return null;
  };

  static validateBody =
    (schema, convert = false) =>
    (req, res, next) => {
      const response = { ...Constants.defaultServerResponse };
      // console.log( " Request + body ", req.body)
      const error = this.validateObjectSchema(req.body, schema, convert);
      if (error) {
        Logger.error(
          `file: @middleware/input.validator, func:validateBody(), message: ${JSON.stringify(
            error
          )}`
        );
        response.body = error;
        response.message = Constants.requestValidationMessage.BAD_REQUEST;
        return res.status(response.status).send(response);
      }
      return next();
    };

  static validateRawBody =
    (schema, convert = false) =>
    (req, res, next) => {
      const response = { ...Constants.defaultServerResponse };
      // console.log( " Request + body ", req.body)
      const jsonBody = JSON.parse(req.body.toString("utf8"));
      const error = this.validateObjectSchema(jsonBody, schema, convert);
      if (error) {
        Logger.error(
          `file: @middleware/input.validator, func:validateRawBody(), message: ${JSON.stringify(
            error
          )}`
        );
        response.body = error;
        response.message = Constants.requestValidationMessage.BAD_REQUEST;
        return res.status(response.status).send(response);
      }
      req.body = jsonBody;
      return next();
    };

  static validateQueryParams =
    (schema, convert = false) =>
    (req, res, next) => {
      const response = { ...Constants.defaultServerResponse };
      const error = this.validateObjectSchema(req.query, schema, convert);
      if (error) {
        Logger.error(
          `file: @middleware/input.validator, func:validateQueryParams(), message: ${JSON.stringify(
            error
          )}`
        );
        response.body = error;
        response.message = Constants.requestValidationMessage.BAD_REQUEST;
        return res.status(response.status).send(response);
      }
      return next();
    };

  static validateParams =
    (schema, convert = false) =>
    (req, res, next) => {
      const response = { ...Constants.defaultServerResponse };
      const error = this.validateObjectSchema(req.params, schema, convert);
      if (error) {
        Logger.error(
          `file: @middleware/input.validator, func:validateParams(), message: ${JSON.stringify(
            error
          )}`
        );
        response.body = error;
        response.message = Constants.requestValidationMessage.BAD_REQUEST;
        return res.status(response.status).send(response);
      }
      return next();
    };
}

export default InputValidator;
