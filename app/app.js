import bodyParser from "body-parser";
import express from "express";
import session from "express-session";
import { SESSION_STORE } from "../db/dbconnect.js";


const app = express();
app.set('views', "./views");
app.set("view engine", "ejs");

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "some secret key.",
    resave: false,
    saveUninitialized: false,
    store: SESSION_STORE,
}))

export { app };