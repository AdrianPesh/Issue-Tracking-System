const workspaceService = require("../services/workspaceService");

const workspaceResolver = {

    Query:{
        fetchWorkspace:async(_,{id})=>{

        }
    },
    Mutation:{
        createWorkspace:async(_,{name},{user})=>{
            if(!user){
                throw new Error("Unathorized");
            }

            return await workspaceService.createWorkspace(name,user.id);
        },
        deleteWorkspace:async(_,{workspace_id},{user})=>{
            if(!user){
                throw new Error("Unathorized");
            }

            return await workspaceService.deleteWorkspace(workspace_id,user.id);
        }
    }

};

module.exports = workspaceResolver;