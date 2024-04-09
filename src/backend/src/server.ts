import express, {Request, Response, NextFunction} from 'express'
import 'express-async-errors'
import cors from 'cors'

import swaggerUI from 'swagger-ui-express'

import swaggerDocument from '../swagger.json'

import { router } from './routes/'

const app = express()
app.use(express.json())

app.use(cors())

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use(router)


app.listen(3333, () => console.log("http://localhost:3333"))

