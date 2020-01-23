const {cooks,recipes}=require('../models/cook');
const connection=require('../database');
module.exports={
    registerCook: function (data,callback) {
        //console.log(cooks());
        connection.sync().then(() => {
            cooks.create({
                name: data.name,
                email: data.email,
                type: data.type,
                password: data.password
            }).then(results=>callback(null,results)).catch(e=>console.log(e));
        }).catch(e=>console.log(e));
    },
    recipeService: function (data,callback) {
        connection.sync().then(()=>
        {
            recipes.create({
                title:data.title,
                description:data.description,
                cookID:data.cookID
            }).then(results=>callback(null,results)).catch(e=>console.log(e));
        }).catch(e=>console.log(e));

    }
}