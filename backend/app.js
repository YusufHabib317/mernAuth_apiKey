import AppError from "./utils/appError.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import globalErrorHandler from "./controllers/errorController.js";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import userRouter from "./routes/userRoutes.js";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// if (process.env.NODE_ENV === "production") {
//   const __dirname = path.resolve();

//   app.use(path.join(__dirname, "frontend/dist"));
// } else {
//   // handle unhandled routes error
//   app.get("/", (req, res) => res.send("Server is ready"));
// }
// app.all("*", (req, res, next) => {
//   // next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
//   res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// routes
app.use("/api/users", userRouter);

// handle global error
// app.use(globalErrorHandler);
export default app;
