import express from "express";
import * as Controller from "../../controllers/movie/index.js";
import InputSchema from "./inputschema/index.js";
import InputValidator from "../../middleware/input.validator.js";

const router = express.Router();
const jsonParser = express.json();

const path = "movie";
router.post(
  "/",
  jsonParser,
  InputValidator.validateBody(InputSchema.create),
  Controller.createMovie
);

router.get(
  "/:id",
  jsonParser,
  InputValidator.validateParams(InputSchema.requestParams),
  Controller.getMovie
);

router.get(
  "/",
  jsonParser,
  InputValidator.validateQueryParams(InputSchema.list, true),
  Controller.listMovies
);

router.put(
  "/:id",
  jsonParser,
  InputValidator.validateParams(InputSchema.requestParams),
  InputValidator.validateBody(InputSchema.update),
  Controller.updateMovie
);
router.delete(
  "/:id",
  jsonParser,
  InputValidator.validateParams(InputSchema.requestParams),
  Controller.deleteMovie
);

export { router, path };
