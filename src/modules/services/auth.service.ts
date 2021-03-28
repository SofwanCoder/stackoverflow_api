import * as bcrypt from 'bcrypt';
import {Users} from '../../models/Users';
import {createUserDTO, loginUserDTO} from '../../shared/dto/user.dto';
import BadRequestException from '../../shared/exception/BadRequestException';
import UserWithThatEmailAlreadyExistsException from '../../shared/exception/exceptionResponse';
import {generateToken} from '../../shared/utils/jsonwebtoken';


/**
 * @class AuthService
 */
export default class AuthService {


    /**
     * @method  submit
     * @description create an account for the user
     * @returns {}
     * @param body
     */
    public static async createAccount(body: createUserDTO) {
        if (await Users.findOne({where: {email: body.email}, })) {
            throw new UserWithThatEmailAlreadyExistsException(body.email)
        }
        try {
            const user = await Users.create(body)
            return generateToken({id: user.id})
        } catch (e) {
            throw new BadRequestException('failed to create an account')
        }

    }


    /**
     * @method  login
     * @description logins a user in and generate JWT
     * @returns {}
     * @param body
     */
    public static async login(body: loginUserDTO) {
        const user = await Users.findOne({where: {email: body.email}})
        if (user && bcrypt.compareSync(body.password, user.password)) {
            return generateToken({id: user.id})
        } else {
            throw new BadRequestException('invalid credentials')
        }
    }
}