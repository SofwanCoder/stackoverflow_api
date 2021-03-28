import {Subscription} from '../../models/Subscription';
import BadRequestException from '../../shared/exception/BadRequestException';
import NotificationHandler from '../event/NotificationHandler';

/**
 * @class SubscriptionService
 */
export class SubscriptionService {
    /**
     * @method  subscribe
     * @description subscribe to a question activity
     * @returns {}
     * @param data
     * @param user
     */
    public static async subscribe(data: any, user: any) {
        NotificationHandler.subscribe(`channel-${data.questionId}`)
        try {
            return await Subscription.findOrCreate({
                where: {
                    channel: `channel-${data.questionId}`,
                    userId: user.id,
                    questionId: data.questionId
                },

            })
        } catch (e) {
            throw new BadRequestException('failed to create subscription')
        }

    }
}