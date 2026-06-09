const {verifyJWT} = require("../helpers/authHelper");

const socketMiddleware = async(socket,next)=>{

    try{
        const token = socket.handshake.auth.token;

        if(!token){
          return next(new Error("Unathorized"));
        }

        const user = verifyJWT(token);

        socket.user = user;
        next();

    }catch(error){
      return next(new Error("Unathorized"));
    }
}

module.exports= socketMiddleware;