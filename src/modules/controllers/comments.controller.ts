import {NextFunction, Response} from 'express';
import {handleSuccess} from '../../shared/utils/responseHandler';
import {CommentsService} from '../services/comments.service';

export default class CommentsController {
    /**
     * @method  create
     * @description It create comment entry for questions or answers for a user
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns handleSuccess
     */
    public static async create(req: any, res: Response, next: NextFunction) {
        try {
            const comments = await CommentsService.create(req.body, req.user)
            return handleSuccess(201, 'comment created', comments, req, res)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @method  editComment
     * @description Create an opportunity for the user to update their comments
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns handleSuccess
     */
    public static async editComment(req: any, res: Response, next: NextFunction) {
        try {
            const comment = await CommentsService.editComment({id: req.params.id, comment: req.body.comment}, req.user)
            return handleSuccess(200, 'comment updated', comment, req, res)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @method  removeComment
     * @description Deletes the comment of a user from an answer or a question
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns handleSuccess
     */
    public static async removeComment(req: any, res: Response, next: NextFunction) {
        try {
            await CommentsService.deleteComment(req.params, req.user)
            return handleSuccess(200, 'comment deleted', undefined, req, res)
        } catch (e) {
            next(e)
        }
    }

}