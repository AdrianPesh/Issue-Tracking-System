const bcrypt = require("bcrypt");

const saltRounds = 10;

const hashPassword = async(password)=>{
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password,salt);
}

const comparePassword = async(InPass,StHash)=>{
 return await bcrypt.compare(InPass,StHash);
}

module.exports = {
    hashPassword,
    comparePassword
};