import "dotenv/config";
import fs from "fs";
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { connect } from "mongoose";
import { errorHandler } from "./utils/error.middleware";
import { mongoose } from "@typegoose/typegoose";

(async () => {

  const app: Application = express();

  app.use(cors({ origin: '*' }));
  app.use(helmet());
  app.use(express.json());


  /* Mongoose database connection */
  mongoose.set('debug', false);
  await mongoose.connect(process.env.DB_CONNECTION_STRING!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(() => {
    console.log("Connected to database!");
  }).catch(() => {
    console.log("Connection failed!");
  });
  /* Mongoose database connection END*/


  app.use('/status', (req, res, next) => {
    res.send({ message: 'Success' });
  });

  //Set all routes from routes folder
  // const routes = fs.readdirSync("./src/routes");
  // routes.forEach(file => app.use("/api/", require("./routes/" + file)));

  // app.use("/api", mainRoutes);

  app.use(errorHandler);

  const port = process.env.PORT || 4000;
  try { app.listen(port, () => console.log(`API server started at http://localhost:${port}`)); }
  catch (err) { console.log(err) }

})()
