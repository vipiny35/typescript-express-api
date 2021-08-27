import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./utils/error.middleware";
import { mongoose } from "@typegoose/typegoose";
import { Routes } from "./routes"
import { S3Client } from "./services/aws-s3-client";

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

  app.use(errorHandler);

  app.use("/api", Routes);


  //Common Upload
  app.get('/api/get-signed-url', async (req, res) => {

    const s3Client = new S3Client()
    const uploadPromise = await s3Client.getUploadSignedUrl('MicrosoftTeams-image.png');
    res.send({
      success: true,
      data: uploadPromise
    })
  })


  const port = process.env.PORT || 4000;
  try { app.listen(port, () => console.log(`API server started at http://localhost:${port}`)); }
  catch (err) { console.log(err) }

})()
