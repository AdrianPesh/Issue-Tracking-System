const prisma = require("../config/prisma");
const {publisher} = require("../config/redis");

const createLog = async(entityType,entityId,message)=>{

    const log = await prisma.log.create({
        data:{
            entityType:entityType,
            entityId:Number(entityId),
            message:message
        }
    });
    await publisher.publish("log-events",JSON.stringify(log));
}

module.exports = {createLog};
