import { Router } from "express";
import { userRouter } from "./User/routes";
import { medicationRouter } from "./Medications/routes";
import { registersRouter } from "./Registers/routes";

const router = Router()

router.use(userRouter)
router.use(medicationRouter)
router.use(registersRouter)

export { router };