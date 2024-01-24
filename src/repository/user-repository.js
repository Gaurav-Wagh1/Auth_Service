const ValidationError = require('../utils/validation-error');
const { User } = require('../models/index');
const { StatusCodes } = require('http-status-codes');

class UserRepository {
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async destroy(userId) {
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            })
            return true;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async getById(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ['email', 'id']
            });
            if (!user) {
                let message = "No user with such id";
                let explanation = "No such user exist in the system with this id !";
                throw new ValidationError({
                    message,
                    explanation,
                    statusCode: StatusCodes.BAD_REQUEST
                });
            }
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async getByEmail(userEmail) {
        try {
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            });
            if (!user) {
                let message = "No user with such email";
                let explanation = "No such user exist in the system with this email !";
                throw new ValidationError({
                    message,
                    explanation,
                    statusCode: StatusCodes.BAD_REQUEST
                });
            }
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;