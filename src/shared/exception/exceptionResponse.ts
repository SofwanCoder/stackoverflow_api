import HttpException from '../utils/HttpException';

/**
 * @class UserWithThatEmailAlreadyExistsException
 * @description existing user exception handler
 */
export default class UserWithThatEmailAlreadyExistsException extends HttpException {
    constructor(email: string) {
        super(400, `User with email ${email} already exists`);
    }
}


