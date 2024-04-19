import { Request, Response } from "express";
import { AuthUserService } from "../../Services/Users/Usecases/AuthenticateUser/authUserService";
import { IUsersRepository } from "../../Services/Users/Repositories/users.repository";
import { IPasswordCrypto } from "../../shared/crypto/password.crypto";
import { IToken } from "../../shared/token/token";

class AuthUserController{

    constructor(
        private userRepository: IUsersRepository,
        private passwordCrypto: IPasswordCrypto,
        private token: IToken
    ){}

    async handle(req: Request, res: Response){

        try{
            const { email, password} = req.body

            const authUser = new AuthUserService(this.userRepository, this.passwordCrypto, this.token)
    
            const auth = await authUser.execute({
                email,
                password
            })
    
            return res.json(auth)
        }catch(err: any){
            console.log({err})
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
        
    }
}

export {AuthUserController}