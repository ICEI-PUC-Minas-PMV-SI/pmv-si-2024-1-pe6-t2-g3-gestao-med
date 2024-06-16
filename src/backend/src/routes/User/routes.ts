import { Router, Request, Response } from "express";
import { isAuthenticated } from "../../shared/middlewares/user-auth.middleware";
import { updateUserController } from "../../Controllers/User/UpdateUserController";
import { createUserController } from "../../Controllers/User/CreateUser";
import { authUserController } from "../../Controllers/User/AuthenticateUser";
import { userDetailsController } from "../../Controllers/User/UserDetailsController";

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

//update user profile
userRouter.put("/user/update", isAuthenticated, async (request, response) => {
    await updateUserController.handle(request, response)
})

export {userRouter}