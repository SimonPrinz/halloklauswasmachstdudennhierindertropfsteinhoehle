import { config as loadEnv } from 'dotenv';
import { Server, createServer } from 'http';

loadEnv();
const port: number = parseInt(process.env.PORT || '3000');

import app from './app';

const server: Server = createServer(app);
server.listen(port, () => {
    console.log('listening in port ' + port);
});
