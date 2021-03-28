import {NextFunction, Request, Response} from 'express'
import {validateParamsRequired, validateRequired} from '../utils/Validation'


export async function validateCreateQuestionBody(req: Request, res: Response, next: NextFunction) {
    return validateRequired(req, res, next, ['title', 'question'], req.body)
}

export async function validateFindOneQuestionParams(req: Request, res: Response, next: NextFunction) {
    return validateParamsRequired(req, res, next, ['id'], req.params)
}

