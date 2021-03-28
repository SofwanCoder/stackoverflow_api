import HttpException from '../utils/HttpException';


/**
 * @class NotAuthorizedException
 * @description custom not authorized exception handler
 */
class NotAuthorizedException extends HttpException {
    constructor() {
        super(401, 'You\'re not authorized');
    }
}

export default NotAuthorizedException;
