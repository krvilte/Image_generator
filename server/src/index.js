import "dotenv/config";
import express from "express";
import cors from "cors";
import connectMongoDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";

export const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

// Import routes
import postRoutes from "./routes/post.routes.js";
import dalleRoutes from "./routes/dalle.routes.js";

// Router declaration
app.use("/api/v1/dalle", dalleRoutes);
app.use("/api/v1/post", postRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("<h1>Hello from CAPE.AI</h1>");
});

// Database connection and server start
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
