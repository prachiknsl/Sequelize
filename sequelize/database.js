const  Sequelize=require('sequelize');
const connection = new Sequelize('test', 'root', '1234', {
    dialect: 'mysql'
});
connection.authenticate()
    .then(function () {
        console.log("connected");
    }).catch(e=>console.log(e));
 module.exports=connection;