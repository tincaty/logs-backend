import { app } from "./app";
import { port } from "./config/config";
import debug  from "debug";

const log:any =debug("app:server")

// now start the server
app.listen(port,"0.0.0.0", () => {
  log(`Server is running at the port no ${port} ! Enjoy`);
});
