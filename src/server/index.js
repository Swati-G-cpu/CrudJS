import express from "express";
import Routes from "../routes/index.js";
// import * as MovieRoutes from "./movie/routes";

const app = express();

const port = process.env.PORT || 3000;

app.use(Routes);
app.get("*", (req, res) => res.send("Hello World!"));

// Start the express server on the relevant port
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

// export default app;
