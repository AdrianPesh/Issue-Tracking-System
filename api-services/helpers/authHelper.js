const jwt = require("jsonwebtoken");
require("dotenv").config();


const signJWT = (data)=>{
  return jwt.sign(data,process.env.JWT_SECRET);
}

const verifyJWT = (token)=>{
 return jwt.verify(token,process.env.JWT_SECRET);
}

module.exports = {
    signJWT,
    verifyJWT
};