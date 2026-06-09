const prisma = require("../config/prisma");
const {createLog} = require("./logService");
const createReply = async(user_id,workspace_id,comment_id,job_id,replyContent)=>{

    const member = await prisma.workspaceMember.findFirst({
        where:{
        user_id:Number(user_id),
        workspace_id:Number(workspace_id)
        }
    });
    if(!member){
        throw new Error("User is not part of the targeted workspace");
    }

    const comment = await prisma.comment.findFirst({
        where:{
            id:Number(comment_id),
            job_id:Number(job_id)
        }
    });
    if(!comment){
        throw new Error("This comment doesn't exist in the current job");
    }

    const reply = await prisma.reply.create({
        data:{
            created_by:Number(user_id),
            comment_id:Number(comment_id),
            content:replyContent
        }
    });
    await createLog("REPLY",reply.id,"reply created");
    return reply;
    
}

const deleteReply = async(user_id,workspace_id,reply_id)=>{
    const member = await prisma.workspaceMember.findFirst({
        where:{
        user_id:Number(user_id),
        workspace_id:Number(workspace_id)
        }
    });
    if(!member){
        throw new Error("User is not part of the targeted workspace");
    }

    const reply = await prisma.reply.findFirst({
        where:{
            created_by:Number(user_id),
            id:Number(reply_id)
        }
    });

    if(!reply){
        throw new Error("Reply cannot be deleted");
    }

    const deletedReply = await prisma.reply.delete({
        where:{
            id:Number(reply_id)
        }
    });
    await createLog("REPLY",deletedReply.id,"reply deleted");
    return deletedReply;


}

const updateReply = async(user_id,workspace_id,reply_id,newReplyContent)=>{
    const member = await prisma.workspaceMember.findFirst({
        where:{
        user_id:Number(user_id),
        workspace_id:Number(workspace_id)
        }
    });
    if(!member){
        throw new Error("User is not part of the targeted workspace");
    }

    const reply = await prisma.reply.findFirst({
        where:{
            id:Number(reply_id),
            created_by:Number(user_id)
        }
    });

    if(!reply){
        throw new Error("Reply cannot be updated");
    }

    const updatedReply = await prisma.reply.update({
        where:{
            id:Number(reply_id)
        },
        data:{
            content:newReplyContent
        }
    });
    await createLog("REPLY",updatedReply.id,"reply updated");
    return updatedReply;

}

module.exports = {
    createReply,
    deleteReply,
    updateReply
};