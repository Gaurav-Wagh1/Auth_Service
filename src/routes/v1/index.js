const express = require("express");
const router = express.Router();

const UserController = require("../../controllers/user-controller");
const { AuthRequestValidator } = require("../../middlewares/index");

router.post(
  "/signup",
  AuthRequestValidator.validateUserAuth,
  AuthRequestValidator.validateEmail,
  UserController.create
);

router.post(
  "/signin",
  AuthRequestValidator.validateUserAuth,
  AuthRequestValidator.validateEmail,
  UserController.signIn
);

router.get("/isauthenticated", UserController.isAuthenticated);

router.get(
  "/isadmin",
  AuthRequestValidator.validateIsAdmin,
  UserController.isAdmin
);


router.get("/users/:id", UserController.get);

module.exports = router;
