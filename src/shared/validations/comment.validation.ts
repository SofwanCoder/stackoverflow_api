import {NextFunction, Request, Response} from 'express'
import {validateParamsRequired, validateRequired} from '../utils/Validation'


export async function validateCommentBody(req: Request, res: Response, next: NextFunction) {
    return validateRequired(req, res, next, ['comment'], req.body)
}

export async function validateOneCommentParams(req: Request, res: Response, next: NextFunction) {
    return validateParamsRequired(req, res, next, ['id'], req.params)
}

