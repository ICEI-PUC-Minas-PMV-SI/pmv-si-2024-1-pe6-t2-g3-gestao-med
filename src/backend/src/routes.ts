import { Router, Request, Response } from "express";
import { CreateUserController } from "./Controllers/CreateUser/createUserController";
import { AuthUserController } from "./Controllers/AuthenticateUser/authUserController";
import { UserDetailsController } from "./Controllers/UserDetailsController/userDetailsController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { UserMedicationsController } from "./Controllers/UserMedicationsController/userMedicationsController";

const router = Router()

//create user
router.post("/user", new CreateUserController().handle)

//login user
router.post("/session", new AuthUserController().handle)

//user details
router.get("/user", isAuthenticated, new UserDetailsController().handle)

//user medications
router.get("/medications", isAuthenticated, new UserMedicationsController().handle)

export {router}