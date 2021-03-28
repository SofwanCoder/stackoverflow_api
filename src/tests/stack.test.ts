import faker from 'faker'
// @ts-ignore
import {getQuestion} from 'random-questions'
import request from 'supertest';
import {app} from '../app';
import {sequelize} from '../sequelize';

const user = {
    email: faker.internet.email(),
    password: faker.name.findName() + faker.name.lastName()
}
let token: string
let questionId: number
let answer: number
let newUserToken: string
beforeAll(async () => {
    await sequelize.sync({logging: false })
})
describe('Describe User Authentication', () => {

    test('it should register user', async () => {
        return request(app).post('/auth/register').send(user).expect(res => {
            token = res.body.data.token
        }).expect(201)
    })

    test('it should fail to register an existing user', async () => {
        return request(app).post('/auth/register').send(user).expect(400)
    })


    test('it should login user in', async () => {
        return request(app).post('/auth/login').send(user).expect(res => {
            token = res.body.data.token
        }).expect(200)
    })

    test('it should fail to log user in with invalid credentials', async () => {
        return request(app).post('/auth/login').send({email: user.email, password: 'randomwrongpassword'}).expect(400)
    })
})

describe('Describe Question Activities', () => {
    test('it should create question without answering', async () => {
        return request(app).post('/question').auth(token, {type: 'bearer'}).send({
            question: getQuestion(),
            title: getQuestion()
        }).expect(201)
    })

    test('it should create question and submit an answer', async () => {
        return request(app).post('/question').auth(token, {type: 'bearer'}).send({
            question: getQuestion(),
            title: getQuestion(),
            answer: getQuestion()
        }).expect(201)
    })
    test('it should get all questions', async () => {
        return request(app).get('/question').expect(200).expect(res => {
            questionId = res.body.data[0].id
        })
    })

    it('it should get a single question', async () => {
        return request(app).get('/question/' + questionId).expect(200)
    });

    it('it should not get question because of invalid id', async () => {
        return request(app).get('/question/' + 2000).expect(404)
    });
})

describe('Describe Answer Activities', () => {
    test('it should answer a question', async () => {
        return request(app).post('/answer/' + questionId).auth(token, {type: 'bearer'}).send({
            answer: getQuestion()
        }).expect(201)
    })

    it('it should get a question answer ', async () => {
        return request(app).get('/question/' + questionId).expect(res => {
            answer = res.body.data.answers[0].id
        }).expect(200)
    });

})

describe('Describe comment Activities', () => {
    test('should not allow you make comment since your reputation is less than 50', async () => {
        return request(app).post('/comment').auth(token, {type: 'bearer'}).send({
            questionId: questionId.toString(),
            comment: 'Looks great actually'
        }).expect(400)
    })
})

describe('Describe User Subscriptions', () => {
    it('should allow the user subscribe to a question', async () => {
        return request(app).post('/subscribe').auth(token, {type: 'bearer'}).send({
            questionId: questionId.toString()
        }).expect(200)
    });
})

describe('Describe Create New User to Vote', () => {
    const newUser = {
        email: faker.internet.email(),
        password: faker.name.findName() + faker.name.lastName()
    }
    test('it should register new user', async () => {
        return request(app).post('/auth/register').send(newUser).expect(res => {
            newUserToken = res.body.data.token
        }).expect(201)
    })


    test('it should login new user in', async () => {
        return request(app).post('/auth/login').send(newUser).expect(res => {
            token = res.body.data.token
        }).expect(200)
    })

})

describe('Describe Voting Activities for Question', () => {
    test('it should not undo vote because no vote found', async () => {
        return request(app).post('/question/vote/undoupvote').auth(newUserToken, {type: 'bearer'}).send({
            questionId: questionId.toString()
        }).expect(404)
    })

    test('it should upvote question', async () => {
        return request(app).post('/question/vote/upvote').auth(newUserToken, {type: 'bearer'}).send({
            questionId: questionId.toString()
        }).expect(201)
    })


    test('it should not allow user upvote because they already upvoted before', async () => {
        return request(app).post('/question/vote/upvote').auth(newUserToken, {type: 'bearer'}).send({
            questionId: questionId.toString()
        }).expect(400)
    })

    test('it should  undoupvote question', async () => {
        return request(app).post('/question/vote/undoupvote').auth(newUserToken, {type: 'bearer'}).send({
            questionId: questionId.toString()
        }).expect(200)
    })

    test('it should downvote question', async () => {
        return request(app).post('/question/vote/downvote').auth(newUserToken, {type: 'bearer'}).send({
            questionId: questionId.toString()
        }).expect(201)
    })

    test('it should not allow user downvote since they already downvoted the question', async () => {
        return request(app).post('/question/vote/downvote').auth(newUserToken, {type: 'bearer'}).send({
            questionId: questionId.toString()
        }).expect(400)
    })

    test('it should undodownvote question', async () => {
        return request(app).post('/question/vote/undodownvote').auth(newUserToken, {type: 'bearer'}).send({
            questionId: questionId.toString()
        }).expect(200)
    })

})


describe('Describe Voting Activities for Answer', () => {

    test('it should not undo vote because no vote found', async () => {
        return request(app).post('/answer/vote/undoupvote').auth(newUserToken, {type: 'bearer'}).send({
            answerId: answer.toString()
        }).expect(404)
    })

    test('it should upvote question', async () => {
        return request(app).post('/answer/vote/upvote').auth(newUserToken, {type: 'bearer'}).send({
            answerId: answer.toString()
        }).expect(201)
    })


    test('it should not allow user upvote because they already upvoted before', async () => {
        return request(app).post('/answer/vote/upvote').auth(newUserToken, {type: 'bearer'}).send({
            answerId: answer.toString()
        }).expect(400)
    })

    test('it should  undoupvote answer', async () => {
        return request(app).post('/answer/vote/undoupvote').auth(newUserToken, {type: 'bearer'}).send({
            answerId: answer.toString()
        }).expect(200)
    })

    test('it should downvote answer', async () => {
        return request(app).post('/answer/vote/downvote').auth(newUserToken, {type: 'bearer'}).send({
            answerId: answer.toString()
        }).expect(201)
    })

    test('it should not allow user downvote since they already downvoted the answer', async () => {
        return request(app).post('/answer/vote/downvote').auth(newUserToken, {type: 'bearer'}).send({
            answerId: answer.toString()
        }).expect(400)
    })

    test('it should undodownvote answer', async () => {
        return request(app).post('/answer/vote/undodownvote').auth(newUserToken, {type: 'bearer'}).send({
            answerId: answer.toString()
        }).expect(200)
    })

})



