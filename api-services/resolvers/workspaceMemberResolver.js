const workspaceMemberService = require("../services/workspaceMemberService");

const workspaceMemberResolver = {
    Query:{
       fetchMembers:async(_,{workspaceId},{user})=>{
            if(!user){
                throw new Error("Unathorized");
            }
       }
    },
    Mutation:{
        addMember:async(_,{workspace_id,targetUserId,role},{user})=>{
            if(!user){
                throw new Error("Unathorized");
            }

            return await workspaceMemberService.addMember(user.id,workspace_id,targetUserId,role);


        },
        removeMember:async(_,{workspace_id,targetUserId},{user})=>{
            if(!user){
                throw new Error("Unathorized");
            }

            return await workspaceMemberService.removeMember(user.id,workspace_id,targetUserId);


        },
        changeMemberRole:async(_,{workspace_id,targetUserId,newRole},{user})=>{
            if(!user){
                throw new Error("Unathorized");
            }

            return await workspaceMemberService.changeMemberRole(user.id,workspace_id,targetUserId,newRole);


        }

    }
};

module.exports = workspaceMemberResolver;