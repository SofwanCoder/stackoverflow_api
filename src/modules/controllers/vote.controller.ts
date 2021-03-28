import {NextFunction, Response} from 'express';
import {handleSuccess} from '../../shared/utils/responseHandler';
import {VoteService} from '../services/vote.service';

export default class VoteController {
    /**
     * @method  upVoterAnswer
     * @description helps an existing user upvote an answer
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns handleSuccess
     */
    public static async upVoteAnswer(req: any, res: Response, next: NextFunction) {
        try {
            const votes = await VoteService.upVoteAnswer(req.body, req.user)
            return handleSuccess(201, 'upVoteAnswer created', votes, req, res)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @method  undoVoterAnswer
     * @description helps an existing user undo their upvote entry for an answer
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns handleSuccess
     */
    public static async undoUpVoteAnswer(req: any, res: Response, next: NextFunction) {
        try {
            await VoteService.undoUpVoteAnswer(req.body, req.user);
            return handleSuccess(200, 'vote removed', undefined, req, res)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @method  downVoteAnswer
     * @description helps an existing user downvote an answer
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns handleSuccess
     */
    public static async downVoteAnswer(req: any, res: Response, next: NextFunction) {
        try {
            const votes = await VoteService.downVoteAnswer(req.body, req.user)
            return handleSuccess(201, 'downVoteAnswer created', votes, req, res)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @method  undoDownVoteAnswer
     * @description helps an existing user undo their downvote entry for an answer
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns handleSuccess
     */
    public static async undoDownVoteAnswer(req: any, res: Response, next: NextFunction) {
        try {
            await VoteService.undoDownVoteAnswer(req.body, req.user);
            return handleSuccess(200, 'undoDownVoteAnswer removed', undefined, req, res)
        } catch (e) {
            next(e)
        }
    }


    /**
     * @method  upVoteQuestion
     * @description helps an existing user upvote an question
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns handleSuccess
     */
    public static async upVoteQuestion(req: any, res: Response, next: NextFunction) {
        try {
            const votes = await VoteService.upVoteQuestion(req.body, req.user)
            return handleSuccess(201, 'upVoteAnswer created', votes, req, res)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @method  undoUpVoteQuestion
     * @description helps an existing user undo their upvote entry for an question
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns handleSuccess
     */
    public static async undoUpVoteQuestion(req: any, res: Response, next: NextFunction) {
        try {
            await VoteService.undoUpVoteQuestion(req.body, req.user);
            return handleSuccess(200, 'vote removed', undefined, req, res)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @method  downVoteQuestion
     * @description helps an existing user downvote an question
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns handleSuccess
     */
    public static async downVoteQuestion(req: any, res: Response, next: NextFunction) {
        try {
            const votes = await VoteService.downVoteQuestion(req.body, req.user)
            return handleSuccess(201, 'downVoteAnswer created', votes, req, res)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @method  undoDownVoteQuestion
     * @description helps an existing user undo their downvote entry for an question
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns handleSuccess
     */
    public static async undoDownVoteQuestion(req: any, res: Response, next: NextFunction) {
        try {
            await VoteService.undoDownVoteQuestion(req.body, req.user);
            return handleSuccess(200, 'undoDownVoteAnswer removed', undefined, req, res)
        } catch (e) {
            next(e)
        }
    }

}