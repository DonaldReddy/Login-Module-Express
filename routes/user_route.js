import express from "express";
import { isAuth, isAlreadyLogin } from "../middleware/user_authentication.js"
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

// logout post
router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    })
})

// signup post
router.post("/signup", async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = await User.findOne({ email: email });

    if (user) {
        console.log("User already Exists");
        res.redirect("/");
    }
    else {
        let hash_password = await bcrypt.hash(password, 10);
        await User.insertMany({ email: email, password: hash_password });
        res.redirect("/");
    }

})
// login post
router.post("/login", isAlreadyLogin, async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = await User.findOne({ email: email });

    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            req.session.isAuth = true;
            res.redirect("dashboard");
        }
        else {
            console.log("Wrong password");
            res.redirect("/");
        }
    }
    else {
        console.log("user doesn't exists");
        res.redirect("/");
    }
})
// signup
router.get("/signup", (req, res) => {
    res.render("signup");
})
// login
router.get("/login", isAlreadyLogin, (req, res) => {
    res.render("login");
})
// home
router.get("/", (req, res) => {
    res.render("index");
})

router.get("/dashboard", isAuth, (req, res) => {
    res.render("dashboard");
})

export { router };