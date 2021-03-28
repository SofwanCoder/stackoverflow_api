import {NextFunction, Request, Response} from 'express'
import {validateRequired} from '../utils/Validation'


export async function validateSubscriptionBody(req: Request, res: Response, next: NextFunction) {
    return validateRequired(req, res, next, ['questionId'], req.body)
}
