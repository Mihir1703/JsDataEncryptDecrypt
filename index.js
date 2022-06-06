const express = require('express');
const cors = require('cors');
const encrypt = require('./Util/encrypt');
const decrypt = require('./Util/decrypt');
const app = express();
const port = 3000;
app.use(cors());

app.get('/', (req, res) => {
    let data = "Hello World";
    res.json(encrypt(data));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));