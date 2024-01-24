const AppErrors = require("./error-handler");

class ValidationError extends AppErrors {
    constructor(error){
        const name = error.name;
        const message = error.message;
        const explanation = error.explanation;
        const statusCode = error.statusCode;
        super(name, message, explanation, statusCode);
    }
}

module.exports =  ValidationError;