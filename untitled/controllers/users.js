const connection=require('../database.js');
const {allUsers}=require('../services/userService');
const jwt=require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt-nodejs');
var randomstring = require("randomstring");
module.exports= {
    showUsers:function (req, res) {
         jwt.verify(req.token,'secretkey',(err,authData)=>{
             if(err){
                 console.log("not authenticated");
                 res.sendStatus(403);
             }
             else{
                 allUsers(req,res);
             }
         });
    },
    createUser: function (req, res) {
      //  const id=req.body.id;
        const fname=req.body.fname;
        const lname=req.body.lname;
        const email=req.body.email;
        const password=req.body.password;
        const gender=req.body.gender;
        const salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
      //  console.log(hash);
        const sql = "INSERT INTO users (fname, lname, email, password,gender) VALUES (?,?,?,?,?)";
            //    console.log(password);
            connection.query(sql, [fname, lname, email, hash,gender], (err, rows, fields) => {
                if (!err) {
                    res.send("successful");
                    console.log("sussessful registered");
                } else
                    console.log(err);
            });
    },
    loginUser: function (req,res) {
        const email = req.body.email;
        const password = req.body.password;
        connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, result, fields) {
            if (error) {
                res.json({
                    status: false,
                    message: 'there are some error with query'
                })
            } else {
                    if (bcrypt.compareSync(password, result[0].password)) {
                       // console.log("true");
                        jwt.sign({result: result},'secretkey',(err,token)=>{
                            res.json({
                                status: true,
                                message: 'successfully authenticated',
                                token: token
                            });
                        });

                    } else {
                        res.json({
                            status: false,
                            message: "Email and password does not match"
                        });
                    }
                }
        });
    },
    updatePassword: function (req,res) {
        const resetKey= req.body.resetKey;
        const password=req.body.password;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
                const sql= "UPDATE users SET password = ? WHERE resetKey = ?";
                connection.query(sql, [hash,resetKey],function (error,result,fields) {
                    if(!error)
                    {
                        res.json({
                            status: true,
                            message: 'Password Updated'
                        });
                        console.log("Password Updated");
                    }
                    else
                        console.log(error);

                });
    },
    resetPassword: function (req,res) {
        const email = req.body.email;
        connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, result, fields) {
            if (error) {
                res.json({
                    status: false,
                    message: 'Email not found'
                });
            } else {
                const t = randomstring.generate(50);
                const sql = "UPDATE users SET resetKey = ? WHERE email = ?";
                connection.query(sql, [t, email], function (error, result, fields) {
                    if (!error) {
                        console.log("token saved");
                    } else
                        console.log(error);

                });
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth:
                        {
                            user: 'milkmanapi@gmail.com',
                            pass: 'milkman@123'
                        }
                });
                console.log(t);
                const mailOptions = {
                    from: 'milkmanapi@gmail.com',
                    to: req.body.email,
                    subject: 'Reset Password',
                    text: t
                }
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent');
                    }
                });
                res.json({
                    status:true,
                    message:"Email Sent"
                });
            }
        });

    }
};