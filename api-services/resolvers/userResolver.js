const userService = require("../services/userService");

const userResolver =  {

    Query:{
        fetchUser:()=>{}
    },
    Mutation:{
        login:async(_,{username,password})=>{
            return await userService.loginUser(username,password);
        },
        register:async(_,{username,password})=>{
           return await userService.registerUser(username,password);
        }
    }
};

module.exports = userResolver;