import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad{
    sub: string,
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
    // Receber o token
    const authToken = req.headers.authorization

    const tokenSecret = process.env.JWT_SECRET || ""
    
    if(!authToken){
        return res.status(401).end()
    }
    const [, token] = authToken.split(" ")
    
    try{
        //Validar o token
        const { sub } = verify(
            token,
            tokenSecret
        ) as PayLoad
       
        //Recuperar ID do token e inserir na variável req.user_id
        req.userId = sub

        return next()

    }catch{
        return res.status(401).end()
    }
}