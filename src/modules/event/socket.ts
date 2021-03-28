import socket from 'socket.io';
import {app} from '../../app';

// @ts-ignore
const io = socket(app);

/**
 * @description connection to socket
 */
io.on('connection', () => {
    console.log('connection made');
});

export default io;
