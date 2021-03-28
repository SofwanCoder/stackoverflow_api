import {NextFunction, Request, Response} from 'express';
import {handleSuccess} from '../../shared/utils/responseHandler';
import {QuestionService} from '../services/question.service';

export default class QuestionController {
    /**
     * @method  create
     * @description a user is able to create a question expecting answers and comments from other users
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns handleSuccess
     */
    public static async create(req: any, res: Response, next: NextFunction) {
        try {
            const question = await QuestionService.create(req.body, req.user)
            return handleSuccess(201, 'question created', question, req, res)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @method  findUserQuestions
     * @description It gets every questions asked by a user
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns handleSuccess
     */
    public static async findUserQuestions(req: any, res: Response, next: NextFunction) {
        try {
            console.log(req.user)
            const questions = await QuestionService.findUserQuestions(req.query, req.user)
            return handleSuccess(200, 'question fetched', questions.rows, req, res,)
        } catch (e) {
            next(e)
        }
    }


    /**
     * @method  findOneQuestion
     * @description It gets a single question
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns handleSuccess
     */
    public static async findOneQuestion(req: Request, res: Response, next: NextFunction) {

        try {
            const questions = await QuestionService.findOneQuestion(req.params)

            return handleSuccess(200, 'question fetched', questions, req, res)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @method  findAll
     * @description It gets all the questions asked
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns handleSuccess
     */
    public static async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const questions = await QuestionService.findAllQuestions(req.query)
            return handleSuccess(200, 'question fetched', questions.rows, req, res)
        } catch (e) {
            next(e)
        }
    }
}