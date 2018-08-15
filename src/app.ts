import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import lusca from "lusca";
import webpack from "webpack";
import webpackDevMiddleWare from "webpack-dev-middleware";
import expressHbs from "express-handlebars";
import dotenv from "dotenv";

import webpackConfig from "./webpack.config";
import routes from "./routes";

const app = express();

// port
app.set("port", process.env.PORT || 8000);

// load environment variables
dotenv.config({ path: ".env.example" });

// webpack
app.use(webpackDevMiddleWare(webpack(webpackConfig)));

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.engine(".hbs", expressHbs({ defaultLayout: "layout", extname: ".hbs" }));
app.set("view engine", ".hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// security
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// routes
app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
