const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');

const { JWT_KEY } = require('../config/server-config');


class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something wrong at the service layer");
            throw error
        }
    }

    createToken(user) {
        try {
            const token = jwt.sign(user, JWT_KEY, { expiresIn: '1d' });
            return token;
        } catch (error) {
            console.log("Something wrong in token creation!");
            throw error
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something wrong in token creation!", error);
            throw error
        }
    }
}

module.exports = UserService;