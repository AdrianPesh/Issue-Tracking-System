const {publisher} = require("../config/redis");

const replyService = require("../services/replyService");

const replyHandler = (socket)=>{

    socket.on("create-reply",async(data)=>{
        try{
        if(!data || !data.workspaceId || !data.commentId || !data.jobId || !data.replyContent){
         throw new Error("Missing required fields");
        }

        const reply = await replyService.createReply(socket.user.id,data.workspaceId,data.commentId,data.jobId,data.replyContent);

        await publisher.publish("workspace-events",JSON.stringify({
            type:"reply-created",
            workspaceId:data.workspaceId,
            payload:reply
        }));
    }catch(error){
        socket.emit("create-reply-error",error.message);

    }
    });
     socket.on("delete-reply",async(data)=>{
        try{
        if(!data || !data.workspaceId || !data.replyId){
         throw new Error("Missing required fields");
        }

        const reply = await replyService.deleteReply(socket.user.id,data.workspaceId,data.replyId);

        await publisher.publish("workspace-events",JSON.stringify({
            type:"reply-deleted",
            workspaceId:data.workspaceId,
            payload:reply
        }));
    }catch(error){
        socket.emit("delete-reply-error",error.message);
    }
    });
     socket.on("update-reply",async(data)=>{
        try{
        if(!data || !data.workspaceId || !data.replyId || !data.newReply){
         throw new Error("Missing required fields");
        }

        const reply = await replyService.updateReply(socket.user.id,data.workspaceId,data.replyId,data.newReply);

        await publisher.publish("workspace-events",JSON.stringify({
            type:"reply-updated",
            workspaceId:data.workspaceId,
            payload:reply
        }));
    }catch(error){
        socket.emit("update-reply-error",error.message);
    }
    });
}

module.exports = {replyHandler};