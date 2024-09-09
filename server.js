const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 3400;
const DB_URL = process.env.DB_URL;

const app = express();
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})

mongoose.connect(DB_URL).then(()=>{
    console.log("connected to the database")
})

app.use(cors());
app.use(express.json());
app.use('/admin',require('./Routers/adminRouter'))
app.use('/police',require('./Routers/policeRouter'))
app.use('/user',require('./Routers/defendantRouter'))
app.use('/request',require('./Routers/requestRouter'))
app.use('/lawyer',require('./Routers/lawyerRouter'))
app.use('/judge',require('./Routers/judgeRouter'))