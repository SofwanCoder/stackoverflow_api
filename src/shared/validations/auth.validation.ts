import {NextFunction, Request, Response} from 'express'
import {validateRequired} from '../utils/Validation'


export async function validateSignUpBody(req: Request, res: Response, next: NextFunction) {
    return validateRequired(req, res, next, ['email', 'password'], req.body)
}

export async function validateSignInBody(req: Request, res: Response, next: NextFunction) {
    return validateRequired(req, res, next, ['email', 'password'], req.body)
}
