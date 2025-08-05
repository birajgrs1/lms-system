import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./src/middlewares/errorHandler.js";
import userRoutes from "./src/routes/authRoutes/authRoutes.js";
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
console.log("CORS Origin Allowed:", process.env.CLIENT_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api/auth", userRoutes);

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use(errorHandler);

export default app;


// https://mockbin.io/