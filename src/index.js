const express = require('express');
const app = express();

const { PORT } = require('./config/server-config');

const createServer = () => {
    app.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`);
    })
}

createServer();