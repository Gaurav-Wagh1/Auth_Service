const validateUserAuth = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            data: {},
            success: false,
            err: "Email or password is missing",
            message: "Something went wrong"
        });
    }
    next();
}

module.exports = { validateUserAuth }