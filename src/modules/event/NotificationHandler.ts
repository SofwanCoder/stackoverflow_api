import {Notification} from '../../models/Notification';
import {Subscription} from '../../models/Subscription';
import io from './socket';


/**
 * @class NotificationHandler
 */
export default class NotificationHandler {


    /**
     * @method  notifyUsers
     * @description it notifies the user when there is an activity for a question
     * @param data
     */
    public static async notifyUsers(data: any) {
        const subscribers = await NotificationHandler.getSubscribedUsers(data.questionId);
        // @ts-ignore
        subscribers.map((value) => {
            NotificationHandler.setNotification({
                userId: value.userId,
                questionId: data.questionId
            });
            NotificationHandler.notify(value.channel);
        });
    }

    /**
     * @method  notify
     * @description it emit a notification to the socket
     * @param channel
     */
    public static notify(channel: any) {
        io.on('connection', () => {
            io.to(channel).emit('notification', 'New response on subscribed question');
        });
    }


    /**
     * @method  subscribe
     * @description subscribe a user to a channel
     * @param channel
     */
    public static subscribe(channel: any) {
        io.on('connection', (socket: any) => {
            socket.join(channel);
        });
    }

    /**
     * @method  getSubscribedUsers
     * @description gets all subscribed to a particular channel
     * @param id
     */
    public static async getSubscribedUsers(id: number) {
        return await Subscription.findAll({where: {questionId: id}, });
    }

    /**
     * @method  setNotification
     * @description save notification
     * @param payload
     */
    public static async setNotification(payload: any) {
        return await Notification.create({
            userId: payload.userId,
            questionId: payload.questionId
        })
    }
}