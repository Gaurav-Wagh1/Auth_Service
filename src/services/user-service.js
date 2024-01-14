const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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

    async signIn(userEmail, plainPassword) {
        // 1)  get the user from database using email;
        try {
            const user = await this.userRepository.getByEmail(userEmail);

            // 2) check wheater the entered password is correct or not?
            const response = this.#checkPassword(plainPassword, user.password);

            // if not send incorrect response;
            if (!response) {
                console.log("Password is incorrect !");
                throw { error: "Incorrect password !" };
            }

            // if password is correct then create new JWT token and send it to the user;
            const newJWT = this.#createToken({ email: user.email, id: user.id });
            return newJWT;

        } catch (error) {
            console.log("Something went wrong in sign in process;");
            throw error;
        }
    }


    #createToken(user) {
        try {
            const token = jwt.sign(user, JWT_KEY, { expiresIn: '1d' });
            return token;
        } catch (error) {
            console.log("Something wrong in token creation!");
            throw error
        }
    }


    #verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something wrong in token creation!", error);
            throw error
        }
    }


    #checkPassword(userInputPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPassword, encryptedPassword);
        } catch (error) {
            console.log("Something wrong in password comparison!");
            throw error
        }
    }
}

module.exports = UserService;