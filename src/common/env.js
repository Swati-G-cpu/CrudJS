import Debug from "debug";
import dotenv from "dotenv";

const debug = Debug("deseo:server");

dotenv.config();
if (!process.env.PORT) {
  debug("Environment is not initlialized");
  process.exit(1);
}
