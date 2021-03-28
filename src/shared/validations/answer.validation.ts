import {NextFunction, Request, Response} from 'express'
import {validateParamsRequired, validateRequired} from '../utils/Validation'


export async function validateCreateAnswerBody(req: Request, res: Response, next: NextFunction) {
    return validateRequired(req, res, next, ['answer'], req.body)
}

export async function validateOneAnswerParams(req: Request, res: Response, next: NextFunction) {
    return validateParamsRequired(req, res, next, ['id'], req.params)
}

export async function validateMarkAnswerParams(req: Request, res: Response, next: NextFunction) {
    return validateParamsRequired(req, res, next, ['id', 'questionId'], req.params)
}
