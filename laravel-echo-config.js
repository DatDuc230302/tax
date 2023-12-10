import Echo from 'laravel-echo';
import io from 'socket.io-client';

const echo = new Echo({
    broadcaster: 'socket.io',
    host: 'http://localhost:6001',
    client: io,
});
export default echo;
