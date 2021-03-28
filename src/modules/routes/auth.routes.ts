import express, {Router} from 'express';
import {validateSignInBody, validateSignUpBody} from '../../shared/validations/auth.validation';
import AuthController from '../controllers/auth.controller';

const router = express.Router();


/**
 * @api {post} /auth/register Create user
 * @apiName Create new user
 * @apiParam  {String} [userName] username
 * @apiParam  {String} [email] Email
 * @apiParam  {String} [phone] Phone number
 * @apiParam  {String} [status] Status
 *
 * @apiSuccess (201) {Object} mixed `User` object
 */
router.post('/register', [validateSignUpBody], AuthController.createAccount)
router.post('/login', [validateSignInBody], AuthController.login)
export const authRoutes: Router = router
