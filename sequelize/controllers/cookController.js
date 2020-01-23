const bcrypt = require('bcrypt-nodejs');
const {registerCook,recipeService}=require('../services/cookService')
module.exports={
    registration: function(req, res) {
        const salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        const inputData = req.body;
        registerCook(inputData,(err,results)=>
        {
            if(err)
            {
                console.log(err);
            }
                res.json({
                    status:true,
                    message:results
                });
        });

    },
    registerRecipe: function (req,res) {
        const inputData=req.body;
        recipeService(inputData,(err,results)=>
        {
            if(err)
                console.log(err);
            res.json({
                status:true,
                message:results
            });
        });
    }

}