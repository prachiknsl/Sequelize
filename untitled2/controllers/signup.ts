import {connection} from "../database";

export const createUser= (req, res) => {
    const id=req.body.idsignup;
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    const password=req.body.password;
    var sql = "INSERT INTO signup (idsignup, fname, lname, email, password) VALUES (?,?,?,?,?)";

    connection.query(sql, [id,fname,lname,email,password], (err, rows, fields) => {
        if(!err)
            res.send("sussessful");
        else
            console.log(err);
    });
}