import express, {Router} from 'express';
import isAuthorized from '../../shared/middlewares/isAuthorized';
import VoteHandler from '../../shared/middlewares/voteHandler';
import {validateVoteQuestionParams} from '../../shared/validations/vote.validation';
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
router.post('/upvote', [isAuthorized, validateVoteQuestionParams, VoteHandler.validateUserQuestionVote, VoteHandler.alreadyUpVotedQuestion, VoteHandler.rateLimiter,], VoteController.upVoteQuestion)
router.post('/undoupvote', [isAuthorized, validateVoteQuestionParams, VoteHandler.validateUpQuestion], VoteController.undoUpVoteQuestion)
router.post('/downvote', [isAuthorized, validateVoteQuestionParams, VoteHandler.validateUserQuestionVote, VoteHandler.rateLimiter, VoteHandler.alreadyDownVotedQuestion], VoteController.downVoteQuestion)
router.post('/undodownvote', [isAuthorized, validateVoteQuestionParams, VoteHandler.validateDownQuestion], VoteController.undoDownVoteQuestion)

export const questionsVotesRoutes: Router = router
