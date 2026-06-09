const {publisher} = require("../config/redis");

const commentService = require("../services/commentService");

const commentHandler = (socket)=>{
    socket.on("create-comment",async(data)=>{
        try{

            if(!data || !data.workspaceId || !data.jobId || !data.commentContent){
                throw new Error("Missing required fields");
            }
            const comment = await commentService.createComment(socket.user.id,data.workspaceId,data.jobId,data.commentContent);

          await publisher.publish("workspace-events",JSON.stringify({
                type:"comment-created",
                workspaceId:data.workspaceId,
                payload:comment
            }));
        }catch(error){
            socket.emit("create-comment-error",error.message);
        }
    });
      socket.on("delete-comment",async(data)=>{
        try{

            if(!data || !data.workspaceId || !data.jobId || !data.commentId){
                throw new Error("Missing required fields");
            }
            const comment = await commentService.deleteComment(socket.user.id,data.workspaceId,data.jobId,data.commentId);

           await publisher.publish("workspace-events",JSON.stringify({
                type:"comment-deleted",
                workspaceId:data.workspaceId,
                payload:comment
            }));
        }catch(error){
            socket.emit("delete-comment-error",error.message);
        }
    });
      socket.on("update-comment",async(data)=>{
        try{

            if(!data || !data.workspaceId || !data.jobId || !data.newComment || !data.commentId){
                throw new Error("Missing required fields");
            }
            const comment = await commentService.updateComment(socket.user.id,data.workspaceId,data.jobId,data.commentId,data.newComment);

           await publisher.publish("workspace-events",JSON.stringify({
                type:"comment-updated",
                workspaceId:data.workspaceId,
                payload:comment
            }));
        }catch(error){
            socket.emit("update-comment-error",error.message);
        }
    });
}

module.exports = {commentHandler};