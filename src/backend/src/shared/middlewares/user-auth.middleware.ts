import { NextFunction, Request, Response } from "express";
import { JWTToken } from "../token/jwt.token";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {

    const authToken = req.headers.authorization

    if (!authToken) return res.status(401).json({ error: "Token is required" })

    const [, token] = authToken.split(" ")

    if (!token) return res.status(401).json({
        error: 'Token is required'
    })

    const verifyToken = new JWTToken().validate(token)

    if(verifyToken){
        req.user_id = verifyToken.sub

       return next()

    }

    return res.status(401).json({ error: "Authentication Error"})

}