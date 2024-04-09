import { Request, Response } from "express";
import { UserDetailsService } from "../../Services/Users/Usecases/UserDetailsService/userDetailsService";

class UserDetailsController {
    async handle(req: Request, res: Response) {
        try {
            const userId = req.user_id;

            const userDetailsService = new UserDetailsService();
            const user = await userDetailsService.execute(userId);

            return res.json(user);
        } catch (err: any) {
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}

export { UserDetailsController }