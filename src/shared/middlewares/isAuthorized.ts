import {NextFunction, Response} from 'express';
import {Users} from '../../models/Users';
import {verifyToken} from '../utils/jsonwebtoken';
import {handleFailure} from '../utils/responseHandler';

/**
 * Authenticated user middleware
 * @method isAuthorized
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const isAuthorized = async (req: any, res: Response, next: NextFunction) => {
    const {authorization} = req.headers;

    if (typeof authorization === 'undefined') {
        return handleFailure(401, 'Unauthorized - Header Not Set', undefined, req, res);
    }
    // @ts-ignore
    const token = authorization.split(' ')[1];
    if (!token) {
        return handleFailure(401, 'Access Denied. Please Log In.', undefined, req, res,);
    }

    try {
        const decoded = verifyToken(token, req, res)
        const user = await Users.findByPk(decoded.id);
        if (user) {
            req.user = user
            next();
        } else {
            return handleFailure(401, 'Access Denied. Please Log In.', undefined, req, res,);

        }
    } catch (error) {
        return handleFailure(401, 'Error in verification. Please try again', undefined, req, res);
    }
}

export default isAuthorized;
