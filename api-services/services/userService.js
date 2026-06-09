const prisma = require("../config/prisma");
const userHelper = require("../helpers/userHelper");
const authHelper = require("../helpers/authHelper");
const {createLog} = require("./logService");
const registerUser = async(username,password)=>{

    const existingUser = await prisma.user.findFirst({
        where:{
            username:username
        }
    });
    if(existingUser){
      throw new Error("User already exists");
    }

    const password_hash = await userHelper.hashPassword(password);

    const user = await prisma.user.create({
        data:{
            username:username,
            password:password_hash
        }
    });
    await createLog("USER",user.id,"user created");

return user;
}



const loginUser = async(username,password)=>{

    const existingUser = await prisma.user.findFirst({
        where:{
            username:username
        }
    });

    if(!existingUser){
        throw new Error("Invalid credentials");
    }

    const hash_password = existingUser.password;

    const match = await userHelper.comparePassword(password,hash_password);

    if(match){
        const data = {
            id:existingUser.id,
            username:username
        };

        const token = authHelper.signJWT(data);
        await createLog("USER",existingUser.id,"user logged in");

        return token;

    }

    throw new Error("Invalid credentials");
    

}

module.exports = {
    registerUser,
    loginUser
};