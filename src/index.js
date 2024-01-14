const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const { PORT } = require('./config/server-config');
const apiRoutes = require('./routes/index');

const createServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);

    app.listen(PORT, async() => {
        console.log(`server listening on port ${PORT}`);
    })
}

createServer();