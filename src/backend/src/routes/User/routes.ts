import { Router, Request, Response } from "express";
import { AuthUserController } from "../../Controllers/AuthenticateUser/authUserController";
import { UserDetailsController } from "../../Controllers/UserDetailsController/userDetailsController";
import { isAuthenticated } from "../../shared/middlewares/user-auth.middleware";
import { UserMedicationsController } from "../../Controllers/UserMedicationsController/userMedicationsController";
import { createUserController } from "../../Controllers/CreateUser";
import { authUserController } from "../../Controllers/AuthenticateUser";
import { userDetailsController } from "../../Controllers/UserDetailsController";

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
userRouter.get("/user", isAuthenticated, async (request, response) => {
    await userDetailsController.handle(request, response)
})


export {userRouter}