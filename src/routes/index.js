import * as express from "express";
import * as MovieRoutes from "./movie/routes.js";

const router = express.Router();

router.use(
  `/${process.env.API_VERSION}/${MovieRoutes.path}`,
  MovieRoutes.router
);

export default router;
