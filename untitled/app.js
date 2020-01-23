const express=require('express');
const bodyParser = require('body-parser');
//const connection=require('./database.js');
const {showUsers,createUser,loginUser,updatePassword,resetPassword}=require('./controllers/users');
const {checkStatus}=require('./middlewares/statusMiddleware');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.post('/reset',resetPassword);
app.post('/enterPassword',updatePassword)
app.post('/register',createUser);
app.post('/login',loginUser)
app.get('/users',checkStatus,showUsers);
app.listen(3000);