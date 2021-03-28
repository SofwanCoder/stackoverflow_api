import {NextFunction, Request, Response} from 'express'
import {validateRequired} from '../utils/Validation'


export async function validateVoteAnswerParams(req: Request, res: Response, next: NextFunction) {
    return validateRequired(req, res, next, ['answerId'], req.body)
}

export async function validateVoteQuestionParams(req: Request, res: Response, next: NextFunction) {
    return validateRequired(req, res, next, ['questionId'], req.body)
}
