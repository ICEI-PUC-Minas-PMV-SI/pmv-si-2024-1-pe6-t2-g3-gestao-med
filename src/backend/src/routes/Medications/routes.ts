import { Router, Request, Response } from "express";
import { isAuthenticated } from "../../shared/middlewares/user-auth.middleware";
import { userMedicationsController } from "../../Controllers/UserMedicationsController";
import { registerMedicateController } from "../../Controllers/RegisterMedicateController";
import { getSingleMedicationController } from "../../Controllers/GetSingleMedication";

const medicationRouter = Router()

//user medications
medicationRouter.get("/medications", isAuthenticated, async (request, response) => {
    await userMedicationsController.handle(request, response)
})

medicationRouter.post("/medications", isAuthenticated, async (request, response) => {
    await registerMedicateController.handle(request, response)
}) 

medicationRouter.get("/medication" , isAuthenticated, async (request, response) => {
    await getSingleMedicationController.handle(request, response)
}) 

export {medicationRouter}