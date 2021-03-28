import express, {Router} from 'express';
import isAuthorized from '../../shared/middlewares/isAuthorized';
import VoteHandler from '../../shared/middlewares/voteHandler';
import {validateVoteAnswerParams} from '../../shared/validations/vote.validation';
import VoteController from '../controllers/vote.controller';

const router = express.Router();

/**
 * @api {post} /auth/register Create user
 * @apiName Create new user
 * @apiParam  {String} [userName] username
 * @apiParam  {String} [email] Email
 * @apiParam  {String} [phone] Phone number
 * @apiParam  {String} [status] Status
 * @apiSuccess (200) {Object} mixed `User` object
 */

router.post('/upvote',
    [isAuthorized, validateVoteAnswerParams, VoteHandler.validateUserAnswerVote, VoteHandler.rateLimiter, VoteHandler.alreadyUpVotedAnswer],
    VoteController.upVoteAnswer
)
router.post('/undoupvote', [isAuthorized, validateVoteAnswerParams, VoteHandler.validateUpVote], VoteController.undoUpVoteAnswer)
router.post('/downvote',
    [isAuthorized, validateVoteAnswerParams, VoteHandler.validateUserAnswerVote, VoteHandler.rateLimiter, VoteHandler.alreadyDownVotedAnswer],
    VoteController.downVoteAnswer
)
router.post('/undodownvote', [isAuthorized, validateVoteAnswerParams, VoteHandler.validateDownVote], VoteController.undoDownVoteAnswer)

export const answersVotesRoutes: Router = router
