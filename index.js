const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080

app.get('/', (req, res, next) => {
    res.send('server is up and running')
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});