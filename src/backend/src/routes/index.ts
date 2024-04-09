import { Router } from "express";
import { userRouter } from "./User/routes";
import { medicationRouter } from "./Medications/routes";

const router = Router()

router.use(userRouter)
router.use(medicationRouter)

export { router };