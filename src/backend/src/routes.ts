import { Router, Request, Response } from "express";
import { CreateUserController } from "./Controllers/CreateUser/createUserController";
import { AuthUserController } from "./Controllers/AuthenticateUser/authUserController";

const router = Router()

//create user
router.post("/user", new CreateUserController().handle)

//login user
router.post("/session", new AuthUserController().handle)


export {router}