import express, {Router} from 'express';
import {answerRoutes} from './answer.routes';
import {answersVotesRoutes} from './answersVote.routes';
import {authRoutes} from './auth.routes';
import {commentRoutes} from './comment.routes';
import {questionRoutes} from './question.routes';
import {questionsVotesRoutes} from './questionsVote.routes';
import {subscriptionRoutes} from './subscription.routes';

const router = express.Router();
router.use('/auth', authRoutes)
router.use('/question', questionRoutes)
router.use('/answer', answerRoutes)
router.use('/comment', commentRoutes)
router.use('/answer/vote', answersVotesRoutes)
router.use('/question/vote', questionsVotesRoutes)
router.use('/subscribe', subscriptionRoutes)
export const routerBase: Router = router;