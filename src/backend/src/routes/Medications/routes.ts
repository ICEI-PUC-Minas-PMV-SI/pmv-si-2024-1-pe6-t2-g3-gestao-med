import { Router, Request, Response } from "express";
import { isAuthenticated } from "../../shared/middlewares/user-auth.middleware";
import { userMedicationsController } from "../../Controllers/UserMedicationsController";
import { registerMedicateController } from "../../Controllers/RegisterMedicateController";
import { getSingleMedicationController } from "../../Controllers/GetSingleMedicationController";
import { deleteMedicationController } from "../../Controllers/DeleteMedicationController";
import { editMedicationController } from "../../Controllers/EditMedicationController";

const medicationRouter = Router()

//user medications
medicationRouter.get("/medications", isAuthenticated, async (request, response) => {
    await userMedicationsController.handle(request, response)
})
//register of a new medication
medicationRouter.post("/medications", isAuthenticated, async (request, response) => {
    await registerMedicateController.handle(request, response)
}) 
//get a single medication
medicationRouter.get("/medication" , isAuthenticated, async (request, response) => {
    await getSingleMedicationController.handle(request, response)
}) 
//delete medications
medicationRouter.delete("/medication/delete/:medicationId" , isAuthenticated, async (request, response) => {
    await deleteMedicationController.handle(request, response)
}) 
//edit medications
medicationRouter.put("/medication" , isAuthenticated, async (request, response) => {
    await editMedicationController.handle(request, response)
}) 
 
export {medicationRouter}