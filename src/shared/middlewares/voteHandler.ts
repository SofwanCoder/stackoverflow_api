import {NextFunction, Response} from 'express';
import statusCode from 'http-status-codes'
import {Answers} from '../../models/Answers';
import {Questions} from '../../models/Questions';
import {Rater} from '../../models/Rater';
import {Votes} from '../../models/Votes';
import {handleFailure} from '../utils/responseHandler';

export default class VoteHandler {
    public static async validateUserQuestionVote(req: any, res: Response, next: NextFunction) {
        const body = req.body;
        const user = req.user.id
        const question = await Questions.findOne({where: {id: body.questionId, userId: user}})
        if (question) return handleFailure(400, 'you cant vote your question', undefined, req, res)
        // @ts-ignore
        // const voteExist = await Votes.findOne({where: {questionId: question.id}})
        next()
    }

    public static async validateUserAnswerVote(req: any, res: Response, next: NextFunction) {
        const body = req.body;
        const user = req.user.id
        const answer = await Answers.findOne({where: {id: body.answerId, userId: user},})
        if (answer) return handleFailure(400, 'you cant vote your answer', undefined, req, res)
        // @ts-ignore
        // const voteExist = await Votes.findOne({where: {questionId: question.id}})
        next()
    }


    public static async rateLimiter(req: any, res: Response, next: NextFunction) {
        const day = new Date().getDate() + '' + (new Date().getMonth() + 1) + '' + new Date().getFullYear()
        const votes = await Rater.findOrCreate({where: {date: day, userId: req.user.id}, })
        if (votes[0].counts > 40) return handleFailure(statusCode.TOO_MANY_REQUESTS, 'you have passed your daily limit', undefined, req, res)
        await Rater.update({counts: votes[0].counts + 1}, {where: {date: day, userId: req.user.id}})
        next()
    }


    public static async alreadyUpVotedAnswer(req: any, res: Response, next: NextFunction) {
        const answer = await Votes.findOne({
            where: {
                voteType: 'upvote',
                userId: req.user.id,
                answerId: req.body.answerId
            },

        })
        if (answer) return handleFailure(statusCode.BAD_REQUEST, 'already upvoted the answer, kindly undo your vote', undefined, req, res)
        next()
    }


    public static async alreadyDownVotedAnswer(req: any, res: Response, next: NextFunction) {
        const answer = await Votes.findOne({
            where: {
                voteType: 'downvote',
                userId: req.user.id,
                answerId: req.body.answerId
            },

        })
        if (answer) return handleFailure(statusCode.BAD_REQUEST, 'already down voted the answer, kindly undo your vote', undefined, req, res)
        next()
    }


    public static async validateUpVote(req: any, res: Response, next: NextFunction) {
        const answer = await Votes.findOne({
            where: {
                voteType: 'upvote',
                userId: req.user.id,
                answerId: req.body.answerId
            },

        })
        if (!answer) return handleFailure(statusCode.NOT_FOUND, 'no vote casted', undefined, req, res)
        next()
    }

    public static async validateDownVote(req: any, res: Response, next: NextFunction) {
        const answer = await Votes.findOne({
            where: {
                voteType: 'downvote',
                userId: req.user.id,
                answerId: req.body.answerId
            },

        })
        if (!answer) return handleFailure(statusCode.NOT_FOUND, 'no vote casted', undefined, req, res)
        next()
    }


    public static async alreadyUpVotedQuestion(req: any, res: Response, next: NextFunction) {

        const answer = await Votes.findOne({
            where: {
                voteType: 'upvote',
                userId: req.user.id,
                questionId: req.body.questionId
            },

        })
        if (answer) return handleFailure(statusCode.BAD_REQUEST, 'already upvoted the question, kindly undo your vote', undefined, req, res)
        next()
    }


    public static async alreadyDownVotedQuestion(req: any, res: Response, next: NextFunction) {
        const answer = await Votes.findOne({
            where: {
                voteType: 'downvote',
                userId: req.user.id,
                questionId: req.body.questionId
            },

        })
        if (answer) return handleFailure(statusCode.BAD_REQUEST, 'already down voted the question, kindly undo your vote', undefined, req, res)
        next()
    }


    public static async validateUpQuestion(req: any, res: Response, next: NextFunction) {
        const answer = await Votes.findOne({
            where: {
                voteType: 'upvote',
                userId: req.user.id,
                questionId: req.body.questionId
            },

        })
        if (!answer) return handleFailure(statusCode.NOT_FOUND, 'no vote casted', undefined, req, res)
        next()
    }

    public static async validateDownQuestion(req: any, res: Response, next: NextFunction) {
        const answer = await Votes.findOne({
            where: {
                voteType: 'downvote',
                userId: req.user.id,
                questionId: req.body.questionId
            },

        })
        if (!answer) return handleFailure(statusCode.NOT_FOUND, 'no vote casted', undefined, req, res)
        next()
    }
}