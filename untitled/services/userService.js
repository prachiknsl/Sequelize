const connection=require('../database.js');
module.exports={
    allUsers: function (req,res){
        connection.query('select id,fname,lname,email from users', (error, results, fields) => {
            if (error) {
                res.json({
                    status : false,
                    message : "Database Eror"
                });
                console.error(error.message);
            } else {
                res.json(results);
                console.log(results);
            }
        });
    },
    addUser: function (data) {

    }
}