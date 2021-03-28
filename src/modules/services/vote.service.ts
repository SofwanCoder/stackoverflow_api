import {Answers} from '../../models/Answers';
import {Questions} from '../../models/Questions';
import {Users} from '../../models/Users';
import {Votes} from '../../models/Votes';
import {sequelize} from '../../sequelize';
import BadRequestException from '../../shared/exception/BadRequestException';

/**
 * @class VoteService
 */
export class VoteService {

    /**
     * @method  upVoteAnswer
     * @description helps in upvoting an answer
     * @returns {}
     * @param data
     * @param user
     */
    public static async upVoteAnswer(data: any, user: any) {
        const t = await sequelize.transaction()

        try {

            const answer = await Answers.findOne({where: {id: data.answerId}})
            if (answer) {
                if (await Votes.findOne({
                    where: {
                        voteType: 'downvote',
                        userId: user.id,
                        answerId: data.answerId
                    },

                })) {
                    await Votes.destroy({
                        where: {
                            voteType: 'downvote',
                            userId: user.id,
                            answerId: data.answerId
                        },

                        transaction: t
                    })
                    await Answers.update({
                        counts: answer?.counts + 2
                    }, {where: {id: data.answerId}, transaction: t})
                }
                await Answers.update({
                    counts: answer?.counts + 1
                }, {where: {id: data.answerId},})
                const answererUser = await Users.findOne({where: {id: answer.userId},})

                // @ts-ignore
                await Users.update({reputation: parseInt(answererUser?.reputation) + 10}, {
                    where: {id: answer.userId}, transaction: t
                })
                const vote = await Votes.create({
                    voteType: 'upvote',
                    userId: user.id,
                    answerId: data.answerId
                }, {transaction: t})
                await t.commit()
                return vote
            }

        } catch (e) {
            await t.rollback()
            throw new BadRequestException('something went wrong')
        }

    }

    /**
     * @method  undoUpVoteAnswer
     * @description helps in undoing a vote for a particular answer
     * @returns {}
     * @param data
     * @param user
     */
    public static async undoUpVoteAnswer(data: any, user: any) {
        const t = await sequelize.transaction()

        try {
            const answer = await Answers.findOne({where: {id: data.answerId},})
            if (answer) {
                await Answers.update({
                    counts: answer?.counts - 1
                }, {where: {id: data.answerId}, transaction: t})

                // const activeUser = await Users.findOne({where : {id : user.id}})
                // await Users.update({},{where: {}})
                const answererUser = await Users.findOne({where: {id: answer.userId},})
                // @ts-ignore
                await Users.update({reputation: ((answererUser?.reputation - 10) < 1) ? 1 : answererUser?.reputation - 10}, {
                    where: {id: answer.userId},
                    transaction: t
                },)
            }


            const vote = await Votes.destroy({
                where: {
                    voteType: 'upvote',
                    userId: user.id,
                    answerId: data.answerId
                },
                transaction: t
            })
            await t.commit()
            return vote
        } catch (e) {
            await t.rollback()
            throw new BadRequestException('something went wrong')
        }

    }

    /**
     * @method  downVoteAnswer
     * @description helps in downvoting a particular answer entry of a user
     * @returns {}
     * @param data
     * @param user
     */
    public static async downVoteAnswer(data: any, user: any) {
        const t = await sequelize.transaction()

        try {
            const answer = await Answers.findOne({where: {id: data.answerId},})
            if (answer) {
                if (await Votes.findOne({
                    where: {
                        voteType: 'upvote',
                        userId: user.id,
                        answerId: data.answerId
                    },


                })) {
                    await Votes.destroy({
                        where: {
                            voteType: 'upvote',
                            userId: user.id,
                            answerId: data.answerId
                        },

                        transaction: t
                    })
                    await Answers.update({
                        counts: answer?.counts - 2
                    }, {where: {id: data.answerId}, transaction: t})
                } else {
                    await Answers.update({
                        counts: answer?.counts - 1
                    }, {where: {id: data.answerId}, transaction: t})
                }

                const activeUser = await Users.findOne({where: {id: user.id},})
                // @ts-ignore
                await Users.update({reputation: ((activeUser?.reputation - 1) < 1) ? 1 : activeUser?.reputation - 1}, {
                    where: {id: user.id},
                    transaction: t
                })


                const answererUser = await Users.findOne({where: {id: answer.userId},})
                // @ts-ignore
                await Users.update({reputation: ((answererUser?.reputation - 2) < 1) ? 1 : answererUser?.reputation - 2}, {
                    where: {id: answer.userId},
                    transaction: t
                })
            }

            const vote = await Votes.create({
                voteType: 'downvote',
                userId: user.id,
                answerId: data.answerId
            }, {transaction: t})
            await t.commit()
            return vote
        } catch (e) {
            await t.rollback()
            throw new BadRequestException('something went wrong')
        }

    }

    /**
     * @method  undoDownVoteAnswer
     * @description helps in undoing a downvote entry of a user for an answer
     * @returns {}
     * @param data
     * @param user
     */
    public static async undoDownVoteAnswer(data: any, user: any) {
        const t = await sequelize.transaction()


        try {
            const answer = await Answers.findOne({where: {id: data.answerId},})
            if (answer) {
                await Answers.update({
                    counts: answer?.counts + 1
                }, {where: {id: data.answerId}, transaction: t})
                const activeUser = await Users.findOne({where: {id: user.id},})
                // @ts-ignore
                await Users.update({reputation: parseInt(activeUser?.reputation) + 1}, {
                    where: {id: user.id},
                    transaction: t
                })


                const answererUser = await Users.findOne({where: {id: answer.userId},})
                // @ts-ignore
                await Users.update({reputation: parseInt(answererUser?.reputation) + 2}, {
                    where: {id: answer.userId},
                    transaction: t
                })
            }

            const vote = await Votes.destroy({
                where: {
                    voteType: 'downvote',
                    userId: user.id,
                    answerId: data.answerId
                },
                transaction: t

            })
            await t.commit()
            return vote
        } catch (e) {
            await t.rollback()
            throw new BadRequestException('something went wrong')

        }

    }


    /**
     * @method  upVoteQuestion
     * @description helps in upvoting an question
     * @returns {}
     * @param data
     * @param user
     */
    public static async upVoteQuestion(data: any, user: any) {

        const t = await sequelize.transaction()

        try {
            const question = await Questions.findOne({where: {id: data.questionId},})
            if (question) {
                if (await Votes.findOne({
                    where: {
                        voteType: 'downvote',
                        userId: user.id,
                        questionId: data.questionId
                    },

                })) {
                    await Votes.destroy({
                        where: {
                            voteType: 'downvote',
                            userId: user.id,
                            questionId: data.questionId
                        },
                        transaction: t

                    })
                    await Questions.update({
                        counts: question?.counts + 2
                    }, {where: {id: data.questionId}, transaction: t})
                } else {
                    await Questions.update({
                        counts: question?.counts + 1
                    }, {where: {id: data.questionId}, transaction: t})
                }
                const answererUser = await Users.findOne({where: {id: question.userId},})
                // @ts-ignore
                await Users.update({reputation: parseInt(answererUser?.reputation) + 10}, {
                    where: {id: question.userId},
                    transaction: t
                })
            }

            const vote = await Votes.create({
                voteType: 'upvote',
                userId: user.id,
                questionId: data.questionId
            }, {
                transaction: t
            })
            await t.commit()
            return vote
        } catch (e) {
            await t.rollback()
            throw new BadRequestException('something went wrong')
        }

    }

    /**
     * @method  undoUpVoteQuestion
     * @description helps in undoing a vote for a particular question
     * @returns {}
     * @param data
     * @param user
     */
    public static async undoUpVoteQuestion(data: any, user: any) {
        const t = await sequelize.transaction()


        try {
            const question = await Questions.findOne({where: {id: data.questionId},})
            if (question) {
                await Answers.update({
                    counts: question?.counts - 1
                }, {where: {id: data.questionId}, transaction: t})

                // const activeUser = await Users.findOne({where : {id : user.id}})
                // await Users.update({},{where: {}})
                const answererUser = await Users.findOne({where: {id: question.userId},})
                // @ts-ignore
                await Users.update({reputation: ((parseInt(answererUser?.reputation) - 10) < 1) ? 1 : parseInt(answererUser?.reputation) - 10}, {
                    where: {id: question.userId},
                    transaction: t
                })
                const vote = await Votes.destroy({
                    where: {
                        voteType: 'upvote',
                        userId: user.id,
                        questionId: data.questionId
                    },
                    transaction: t
                })
                await t.commit()
                return vote
            }

        } catch (e) {
            await t.rollback()
            throw new BadRequestException('something went wrong')
        }

    }

    /**
     * @method  downVoteQuestion
     * @description helps in downvoting a particular question entry of a user
     * @returns {}
     * @param data
     * @param user
     */
    public static async downVoteQuestion(data: any, user: any) {

        const t = await sequelize.transaction()

        try {
            const question = await Questions.findOne({where: {id: data.questionId}})
            if (question) {
                if (await Votes.findOne({
                    where: {
                        voteType: 'upvote',
                        userId: user.id,
                        questionId: data.questionId
                    },

                })) {
                    await Votes.destroy({
                        where: {
                            voteType: 'upvote',
                            userId: user.id,
                            questionId: data.questionId
                        },
                        transaction: t

                    })
                    await Questions.update({
                        counts: question?.counts - 2
                    }, {where: {id: data.questionId}, transaction: t})
                } else {
                    await Questions.update({
                        counts: question?.counts - 1
                    }, {where: {id: data.questionId}, transaction: t})
                }

                const activeUser = await Users.findOne({where: {id: user.id},})
                // @ts-ignore
                await Users.update({reputation: ((activeUser?.reputation - 1) < 1) ? 1 : activeUser?.reputation - 1}, {
                    where: {id: user.id},
                    transaction: t
                })


                const answererUser = await Users.findOne({where: {id: question.userId},})

                // @ts-ignore
                await Users.update({reputation: ((parseInt(answererUser?.reputation) - 2) < 1) ? 1 : parseInt(answererUser?.reputation) - 2}, {
                    where: {id: question.userId},
                    transaction: t
                })
            }

            const vote = await Votes.create({
                voteType: 'downvote',
                userId: user.id,
                questionId: data.questionId
            }, {transaction: t})
            await t.commit()
            return vote
        } catch (e) {
            await t.rollback()
            throw new BadRequestException('something went wrong')
        }

    }

    /**
     * @method  undoDownVoteQuestion
     * @description helps in undoing a downvote entry of a user for an question
     * @returns {}
     * @param data
     * @param user
     */
    public static async undoDownVoteQuestion(data: any, user: any) {

        const t = await sequelize.transaction()

        try {
            const question = await Questions.findOne({where: {id: data.questionId},})
            if (question) {
                await Questions.update({
                    counts: question?.counts + 1
                }, {where: {id: data.questionId}, transaction: t})
                const activeUser = await Users.findOne({where: {id: user.id}})
                // @ts-ignore
                await Users.update({reputation: (parseInt(activeUser?.reputation) + 1)}, {
                    where: {id: user.id},
                    transaction: t
                })


                const answererUser = await Users.findOne({where: {id: question.userId},})
                // @ts-ignore
                await Users.update({reputation: parseInt(answererUser?.reputation) + 2}, {
                    where: {id: question.userId},
                    transaction: t
                })
            }
            const vote = await Votes.destroy({
                where: {
                    voteType: 'downvote',
                    userId: user.id,
                    questionId: data.questionId
                },
                transaction: t

            })
            await t.commit()
            return vote
        } catch (e) {
            await t.rollback()
            throw new BadRequestException('something went wrong')

        }

    }
}