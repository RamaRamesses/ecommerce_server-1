const express = require('express');
const app = express();
const port = process.env.port || 3000;
const routes = require('./routes/index');
const ErrorHandler = require('./middlewares/ErrorHandler');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);

app.use(ErrorHandler);

// app.listen(port, () => console.log(`App listening at ${port}`));


module.exports = app;