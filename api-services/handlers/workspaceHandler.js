const workpsaceService = require("../services/workspaceService");

const joinWorkspace = (socket)=>{
socket.on("join-workspace",async(workspaceId)=>{
try{
    const allowedToJoin  = await workpsaceService.joinWorkspace(socket.user.id,workspaceId);

    if(!allowedToJoin){
        throw new Error("User is not allowed to join the current workspace");
    }

    socket.join(`workspace-${workspaceId}`);
    console.log("Client joined successfully");
}catch(error){

    console.log(error.message);
    socket.emit("connect-error",error.message);
}

})





}

module.exports ={joinWorkspace};