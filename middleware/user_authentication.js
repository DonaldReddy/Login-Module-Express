const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    }
    else
        res.redirect("/login");
}

const isAlreadyLogin = (req, res, next) => {
    if (req.session.isAuth)
        res.redirect("/dashboard");
    else
        next();
}

export { isAuth, isAlreadyLogin };