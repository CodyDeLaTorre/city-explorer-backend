'use strict';

const { application } = require('express');
const { response } = require('express');
let data = require('./data/weather.json');

require('dotenv').config();

const cors = require('cors');

const app = express();

app.use(cors());


application.listen(PORT, () => console.log(`listening on port ${PORT}`));
