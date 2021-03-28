import {NextFunction, Request, Response} from 'express';
import {handleSuccess} from '../../shared/utils/responseHandler';
import AuthService from '../services/auth.service';

export default class AuthController {

    /**
     * @method  createAccount
     * @description This method helps in creating the user account returning a JWT token to authorize routes
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns handleSuccess
     */
    public static async createAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await AuthService.createAccount(req.body)
            return handleSuccess(201, 'account created', {token: user}, req, res)
        } catch (e) {
            next(e)
        }
    }

    /**
     * @method  login
     * @description login method authorize an existing user by giving the user access to routes that requires authorization
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns handleSuccess
     */
    public static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await AuthService.login(req.body)
            return handleSuccess(200, 'successful login', {token: user}, req, res)
        } catch (e) {
            next(e)
        }
    }
}