const {subscriber} = require("../config/redis");

const types = ["message-created","message-deleted","message-updated","comment-created","comment-deleted","comment-updated","reply-created","reply-deleted","reply-updated"];

const workspaceSubscriber = async(io)=>{

    console.log("Message subscriber started");


    await subscriber.subscribe("workspace-events",(data)=>{
        try{
            const message = JSON.parse(data);

            const type=message.type;
           
        

            if(!types.includes(type)){
                throw new Error("Invalid type");
            }

            
   
            io.to(`workspace-${message.workspaceId}`).emit(type,message.payload);

        }catch(error){
            console.log(error.message);
        }
    });
}

module.exports = {workspaceSubscriber};