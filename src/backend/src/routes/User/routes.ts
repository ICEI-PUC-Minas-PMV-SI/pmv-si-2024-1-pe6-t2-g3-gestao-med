import { Router, Request, Response } from "express";
import { AuthUserController } from "../../Controllers/AuthenticateUser/authUserController";
import { UserDetailsController } from "../../Controllers/UserDetailsController/userDetailsController";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { UserMedicationsController } from "../../Controllers/UserMedicationsController/userMedicationsController";
import { createUserController } from "../../Controllers/CreateUser";
import { authUserController } from "../../Controllers/AuthenticateUser";

const userRouter = Router()

//create user
userRouter.post("/user", async (request, response) => {
    await createUserController.handle(request, response)
})

//login user
userRouter.post("/session", async (request, response) => {
    await authUserController.handle(request, response)
})

//user details
userRouter.get("/user", isAuthenticated, new UserDetailsController().handle)

//user medications
userRouter.get("/medications", isAuthenticated, new UserMedicationsController().handle)

export {userRouter}