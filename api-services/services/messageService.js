const prisma = require("../config/prisma");
const {createLog} = require("./logService");

const createMessage = async(user_id,workspace_id,message)=>{

    const member = await prisma.workspaceMember.findFirst({
        where:{
            user_id:Number(user_id),
            workspace_id:Number(workspace_id)
        }
    });

    if(!member){
        throw new Error("Current user is not part of the workpsace");
    }

    const messageCreated = await prisma.message.create({
        data:{
            user_id:Number(user_id),
            workspace_id:Number(workspace_id),
            content:message
        }
    });
    await createLog("MESSAGE",messageCreated.id,"message created");

    return messageCreated;
}

const deleteMessage = async(user_id,workspace_id,message_id)=>{
    const messageToDelete = await prisma.message.findFirst({
        where:{
            user_id:Number(user_id),
            id:Number(message_id),
            workspace_id:Number(workspace_id)
        }
    });
    if(!messageToDelete){
        throw new Error("No such message");
    }
    const deletedMessage = await prisma.message.delete({
        where:{
        
            id:Number(message_id),

        }
    });
    await createLog("MESSAGE",deletedMessage.id,"message deleted");

    return deletedMessage;
}

const updateMessage = async(user_id,workspace_id,message_id,newMessage)=>{
const messageToUpdate = await prisma.message.findFirst({
        where:{
            user_id:Number(user_id),
            workspace_id:Number(workspace_id),
            id:Number(message_id)
        }
    });
    if(!messageToUpdate){
        throw new Error("No such message");
    }

    const updatedMessage = await prisma.message.update({
        where:{
            id:Number(message_id)
        },
        data:{
            content:newMessage
        }
    });
    await createLog("MESSAGE",updatedMessage.id,"message updated");
    
    return updatedMessage;
}

module.exports = {
    createMessage,
    deleteMessage,
    updateMessage
};

