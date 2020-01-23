import mysql from "mysql";
export const connection=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'test'
});
connection.connect(function(error){
    if(!!error)
    {
        console.log(error);
    }
    else
    {
        console.log('Connected');
    }
});