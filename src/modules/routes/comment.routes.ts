import express, {Router} from 'express';
import CommentHandler from '../../shared/middlewares/commentHandler';
import isAuthorized from '../../shared/middlewares/isAuthorized';
import {validateCommentBody, validateOneCommentParams} from '../../shared/validations/comment.validation';
import CommentsController from '../controllers/comments.controller';

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
router.post('/', [isAuthorized, validateCommentBody, CommentHandler.verifyReputation], CommentsController.create)
router.put('/:id', isAuthorized, validateOneCommentParams, CommentsController.editComment)
router.delete('/:id', isAuthorized, validateOneCommentParams, CommentsController.removeComment)
export const commentRoutes: Router = router
