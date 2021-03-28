import express, {Router} from 'express';
import isAuthorized from '../../shared/middlewares/isAuthorized';
import { validateSubscriptionBody } from '../../shared/validations/subscription.validation';
import SubscriptionController from '../controllers/subscription.controller';

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
router.post('/', [isAuthorized,validateSubscriptionBody], SubscriptionController.subscribe)

export const subscriptionRoutes: Router = router
