import { Router, Request, Response } from "express";
import { AuthUserController } from "../../Controllers/AuthenticateUser/authUserController";
import { UserDetailsController } from "../../Controllers/UserDetailsController/userDetailsController";
import { isAuthenticated } from "../../shared/middlewares/user-auth.middleware";
import { UserMedicationsController } from "../../Controllers/UserMedicationsController/userMedicationsController";
import { createUserController } from "../../Controllers/CreateUser";
import { authUserController } from "../../Controllers/AuthenticateUser";
import { userDetailsController } from "../../Controllers/UserDetailsController";
import { userMedicationsController } from "../../Controllers/UserMedicationsController";

const medicationRouter = Router()

//user medications
medicationRouter.get("/medications", isAuthenticated, async (request, response) => {
    await userMedicationsController.handle(request, response)
})

export {medicationRouter}