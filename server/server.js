import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import jobsRoutes from "./routes/jobs.js";
import applicationsRoutes from "./routes/applications.js";

dotenv.config();

const app = express();


const allowedOrigins = [
  "http://localhost:5173",       
  process.env.FRONTEND_URL,       
];

app.use(
  cors({
    origin: function (origin, callback) {
      
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());


app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Career Finder API is running");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.use("/api/auth", authRoutes);
    app.use("/api/jobs", jobsRoutes);
    app.use("/api/applications", applicationsRoutes);

    app.listen(PORT, () => console.log("Server running on", PORT));
  })
  .catch((err) => console.log(err));
