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

const validateEmail = (req, res, next) => {
    const emailString = req.body.email;
    // const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailString.match(regEx)) {
        return res.status(400).json({
            data: {},
            success: false,
            err: "Invalid email !",
            message: "Please enter a valid email"
        });
    }
    next();
}

module.exports = { validateUserAuth, validateEmail }