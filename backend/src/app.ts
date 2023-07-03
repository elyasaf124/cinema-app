import cookieParser from "cookie-parser";
import compression from "compression";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import { router as movieRouter } from "./routes/movieRoutes";
import { router as cinemaRouter } from "./routes/cinemaRoutes";
import { router as showTimesRouter } from "./routes/showTimesRoutes";
import { router as cinemaRoomRouter } from "./routes/cinemaRoomRoute";
import { router as stripeRouter } from "./routes/stripeRoute";
import { router as webhookRouter } from "./routes/webhookRoutes";
import { router as allRoutes } from "./routes/allRoutes";
import { router as authRoutes } from "./routes/authRoutes";
import { Request, Response, NextFunction } from "express";
import { globalErrorHandlerNew } from "./utilitis/appError";

dotenv.config({ path: __dirname + `./../config.env` });

export let webOrigin: Array<string> = [];
if (process.env.NODE_ENV === "development") {
  console.log("dev");
  webOrigin = [
    process.env.WEB_APP_URL_DEV as string,
    process.env.WEB_APP_URL_DEV_TWO as string,
  ];
} else if (process.env.NODE_ENV === "production") {
  console.log("prod!!");
  webOrigin = [
    process.env.WEB_APP_URL_PROD as string,
    process.env.WEB_APP_URL_PROD_ADMIN as string,
  ];
}

const corsOptions: any = {
  credentials: true,
  origin: function (origin: string, callback: any) {
    if (webOrigin.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
export const app = express();
app.use(compression());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Credentials', true);
  console.log("cookie", req.cookies);
  next();
});

app.use(helmet());
app.use(morgan("dev"));
app.use(
  express.json({
    verify: (req: any, res: Response, buffur) => (req["rawBody"] = buffur),
  })
);

app.use("/all", allRoutes);
app.use("/auth", authRoutes);
app.use("/movies", movieRouter);
app.use("/cinema", cinemaRouter);
app.use("/showtimes", showTimesRouter);
app.use("/cinemaRoom", cinemaRoomRouter);
app.use("/stripe", stripeRouter);
app.use("/webhook", webhookRouter);

app.use(globalErrorHandlerNew);
