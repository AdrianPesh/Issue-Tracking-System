const prisma = require("../config/prisma");
const {createLog} = require("./logService");


const createComment = async(user_id,workspace_id,job_id,commentContent)=>{

    const member = await prisma.workspaceMember.findFirst({
        where:{
        user_id:Number(user_id),
        workspace_id:Number(workspace_id)
        }
    });
    if(!member){
        throw new Error("User is not part of the targeted workpsace");
    }
    const job = await prisma.job.findFirst({
        where:{
            id:Number(job_id),
            workspace_id:Number(workspace_id)
        }
    });
    if(!job){
        throw new Error("No such job");
    }
    const comment = await prisma.comment.create({
        data:{
            user_id:Number(user_id),
            job_id:Number(job_id),
            content:commentContent
        }
    });
   
    await createLog("COMMENT",comment.id,"comment created");

    return comment;


}
const deleteComment = async(user_id,workspace_id,job_id,comment_id)=>{
const member = await prisma.workspaceMember.findFirst({
    where:{
        user_id:Number(user_id),
        workspace_id:Number(workspace_id)
    }
    });
    if(!member){
        throw new Error("User is not part of the targeted workpsace");
    }
const comment = await prisma.comment.findFirst({
    where:{
        id:Number(comment_id),
        job_id:Number(job_id),
        user_id:Number(user_id)
    }
});

if(!comment){
    throw new Error("Comment cannot be deleted");

}

const commentDelete = await prisma.comment.delete({
    where:{
        id:Number(comment_id)
    }
});
 await createLog("COMMENT",commentDelete.id,"comment deleted");
return commentDelete;
}

const updateComment = async(user_id,workspace_id,job_id,comment_id,newCommentContent)=>{
  
const member = await prisma.workspaceMember.findFirst({
    where:{
        user_id:Number(user_id),
        workspace_id:Number(workspace_id)
    }
    });
    if(!member){
        throw new Error("User is not part of the targeted workpsace");
    }

    const comment = await prisma.comment.findFirst({
        where:{
            id:Number(comment_id),
            user_id:Number(user_id),
            job_id:Number(job_id)
        }
    });
    if(!comment){
        throw new Error("Comment cannot be updated");
    }

    const commentUpdated = await prisma.comment.update({
        where:{
            id:Number(comment_id)
        },
        data:{
            content:newCommentContent
        }
    });
     await createLog("COMMENT",commentUpdated.id,"comment updated");

    return commentUpdated;


}

//Check if job exists!!!

module.exports = {
    createComment,
    deleteComment,
    updateComment
};