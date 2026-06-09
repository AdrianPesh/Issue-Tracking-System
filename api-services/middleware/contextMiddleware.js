const authHelper = require("../helpers/authHelper");

const context = ({req})=>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return {
            user:null
        };
    }
    try{

        const token = authHeader.split(' ')[1];

        const user = authHelper.verifyJWT(token);

        return {
            user
        };
    }catch(error){

        return {
            user:null
        };

    }
}

module.exports = context;