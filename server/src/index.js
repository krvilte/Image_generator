import "dotenv/config";
import express from "express";
import cors from "cors";
import connectMongoDB from "./config/db.js";

export const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello");
});

connectMongoDB()
  .then(() => {
    app.listen(port, () =>
      console.log("Server startedL:/\nhttp://localhost:" + port)
    );
  })
  .catch((error) => {
    console.error("Mongodb Error:", error);
    process.exit(1);
  });
