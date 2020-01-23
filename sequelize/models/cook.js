const  Sequelize=require('sequelize');
const connection=require('../database');
// const new_tables=connection.define('new_tables',{
//     title:Sequelize.STRING,
//     body:Sequelize.TEXT
// });
const cooks=connection.define('cooks',{
    name:Sequelize.STRING,
    email:Sequelize.STRING,
    type:Sequelize.STRING,
    password:Sequelize.STRING
});
const recipes=connection.define('recepies',{
    title: Sequelize.STRING,
    description:Sequelize.STRING,
    cookID: Sequelize.INTEGER
})
const feedback= connection.define('feedback',{
        comments:Sequelize.STRING
    });
cooks.associate=function(){
 cooks.hasMany(recipes);
}
recipes.associate=function(){
    recipes.belongsTo(cooks,{foreignKey:'cookID'});
}
module.exports={cooks,recipes,feedback}