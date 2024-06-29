import { Router, Request, Response } from "express";
import { isAuthenticated } from "../../shared/middlewares/user-auth.middleware";
import { userMedicationsController } from "../../Controllers/Medications/UserMedicationsController";
import { registerMedicateController } from "../../Controllers/Medications/RegisterMedicateController";
import { getSingleMedicationController } from "../../Controllers/Medications/GetSingleMedicationController";
import { deleteMedicationController } from "../../Controllers/Medications/DeleteMedicationController";
import { takenMedicationController } from "../../Controllers/Medications/TakenMedicationController";
import { editMedicationController } from "../../Controllers/Medications/EditMedicationController";


const medicationRouter = Router()

//user medications
medicationRouter.get("/medications", isAuthenticated, async (request, response) => {
    await userMedicationsController.handle(request, response)
})
//register of a new medication
medicationRouter.post("/medication", isAuthenticated, async (request, response) => {
    await registerMedicateController.handle(request, response)
}) 
//get a single medication
medicationRouter.get("/medication" , isAuthenticated, async (request, response) => {
    await getSingleMedicationController.handle(request, response)
}) 
//delete medications
medicationRouter.post("/medication/delete/:medicationId" , isAuthenticated, async (request, response) => {
    await deleteMedicationController.handle(request, response)
}) 


medicationRouter.post("/medication/taken", isAuthenticated, async (request, response) =>{
    await takenMedicationController.handle(request,response)
})

//edit medications
medicationRouter.put("/medication/edit" , isAuthenticated, async (request, response) => {
    await registerMedicateController.handle(request, response)
}) 
 

export {medicationRouter}