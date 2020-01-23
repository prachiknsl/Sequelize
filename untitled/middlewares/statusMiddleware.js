
module.exports=
    {
       checkStatus: function verifyToken(req,res,next){
    // Authenticate
            const bearerHeader=req.headers['authorization'];
            if(typeof bearerHeader !=='undefined'){
                const bearer=bearerHeader.split(' ');
                const bearerToken=bearer[1];
                //console.log(bearer[1]);
                req.token=bearerToken;
                next();
            }
            else {
                // Forbidden
                console.log('verify');
                res.sendStatus(403);
            }
        }

    };