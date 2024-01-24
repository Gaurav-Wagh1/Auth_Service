const UserService = require('../services/user-service');

const userService = new UserService();
const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        })
        return res.status(201).json({
            data: response,
            success: true,
            error: {},
            message: "Successfully created the user"
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            data: {},
            success: false,
            error: error.name,
            message: error.message,
            description: error.explanation
        });
    }
}


const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(201).json({
            data: response,
            success: true,
            error: {},
            message: "Successfully signed in"
        });
    } catch (error) {
        if (error.name == "ValidationError") {
            return res.status(error.statusCode).json({
                data: {},
                success: false,
                error: error.name,
                message: error.message,
                description: error.explanation
            });
        }
        return res.status(500).json({
            data: {},
            success: false,
            error: error,
            message: "Something error at controller layer !"
        });
    }
}


const isAuthenticated = async (req, res) => {
    try {
        const result = await userService.isAuthenticated(req.headers['x-access-token']);
        res.status(200).json({
            data: result,
            success: true,
            error: {},
            message: "User is authenticated."
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            error: error,
            message: "User is not authenticated !"
        });
    }
}

const isAdmin = async (req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            success: true,
            error: {},
            message: "Successful"
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            error: error,
            message: "Something error at controller layer !"
        });
    }
}


module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}