import {connection} from "../database";

export const showAll= (req,res)=> {
    connection.query('select * from signup',(error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
}