// Lib
import express from "express";
import cors from "cors";
// Mine
import store from "./store/index.js";
import config from "./config/config.js";
import connect from "./db/connect.js";
import router from "./routes/products.router.js";

const { appConfig } = config;
const app = express();
// MiddleWares
app.use(express.json()); // Sending json data
app.use(express.urlencoded({ extended: true })); // Sending FormData
app.use(cors({ origin: appConfig.client_url, credentials: true })); // Allowing access for client url
app.use("/api", router); // Switching Routes by /api

// App Configuration
setInterval(store.sync, appConfig.sync_interval);
(async () => {
  try {
    await connect(); // Connecting Mongo before store
    await store.sync(); // Connecting Store before listen app
    app.listen(appConfig.port, () =>
      console.log(`Server has been listened on port ${appConfig.port}`)
    );
  } catch (err) {
    throw new Error(err);
  }
})();
