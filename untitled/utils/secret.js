const dotenv=require('dotenv');
dotenv.config();
module.exports={
    SERVICE: process.env.SERVICE,
    EMAIL_ID: process.env.EMAIL_ID,
    PASSWORD:process.env.PASSWORD
};