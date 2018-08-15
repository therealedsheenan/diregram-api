"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const lusca_1 = __importDefault(require("lusca"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
// port
app.set("port", process.env.PORT || 8000);
// load environment variables
dotenv_1.default.config({ path: ".env.example" });
const isProduction = process.env.NODE_ENV === "production";
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// cors
app.use(cors_1.default());
// bodyParser
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// express sessions
app.use(express_session_1.default({ secret: "CHANGE_THIS_PROPERTY_TO_DOTENV_VALUE", cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
// security
app.use(lusca_1.default.xframe("SAMEORIGIN"));
app.use(lusca_1.default.xssProtection(true));
// routes
app.use(routes_1.default);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(http_errors_1.default(404));
});
/// catch 404 and forward to error handler
app.use((err, req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});
// will print stacktrace
if (!isProduction) {
    app.use((err, req, res, next) => {
        console.log(err.stack);
        res.status(err.status || 500);
        res.json({ "errors": {
                message: err.message,
                error: err
            } });
    });
}
// production error handler
// no stack traces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ "errors": {
            message: err.message,
            error: {}
        } });
});
// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    next(err);
});
exports.default = app;
//# sourceMappingURL=app.js.map