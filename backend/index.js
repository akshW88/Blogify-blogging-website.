const express = require('express');
require('dotenv').config()
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const {checkforAuth}=require('./middleware/auth')
const PORT = process.env.port || 8000;
const MongoURI=process.env.MongoURI ||  'mongodb://127.0.0.1:27017/Blogify-React';
const cookieParser = require('cookie-parser');
const blogRouter=require('./routes/blog');
const compression = require('compression');
app.use(compression());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());
app.use(checkforAuth);
app.use('/api/user',userRouter);
app.use('/api/blog',blogRouter);

mongoose.connect(MongoURI).then(()=>console.log('mongoDb connected!'));

app.listen(PORT,()=>console.log('server started!'));


