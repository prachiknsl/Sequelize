const  express=require('express');
const  mysql=require('mysql2');
const {registration,registerRecipe}=require('./controllers/cookController');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/cook",registration);
app.post("/recipe",registerRecipe);
app.post("/post",(req,res)=>{
    connection.sync().then(function(){
        new_tables.create({
            title:'demo',
            body:'gsfdvhec'
        });
        console.log("created");
    })
    .catch(e=>console.log(e));
});
app.post("/json",(req,res)=>{
    const id=req.body.id;
    const js=req.body.js;
    const sql=`INSERT INTO new (id,js) VALUES (?,?)`;
    console.log(js);
    connection.query(sql, [id,JSON.stringify(js)],(err, rows, fields) => {
        if (!err) {
            // res.send("successful");
            console.log("sussessful registered");
            console.log(rows);
            res.json({
                status:true,
                message: "inserted"
            })
        } else
            console.log(err);
    });
})
//const sql='select * from new';
app.listen(3000);