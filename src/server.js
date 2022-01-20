const express = require('express');
const app = express();
const courses = require('./routes/inventoryManagement');
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use('/', courses);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));