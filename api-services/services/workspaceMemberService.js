const prisma = require("../config/prisma");
const roleHelper = require("../helpers/rolesHelper");
const {createLog} = require("./logService");


const addMember = async(currentUserId,workspace_id,targetUserId,role)=>{
        const currentUser = await prisma.workspaceMember.findFirst({
        where:{
            user_id:Number(currentUserId),
            workspace_id:Number(workspace_id)
        }
    });
    if(!currentUser){
        throw new Error("Current user is not part of the target workspace");
    }
    const existingMember = await prisma.workspaceMember.findFirst({
        where:{
            user_id:Number(targetUserId),
            workspace_id:Number(workspace_id)

        }
    });
    if(existingMember){
        throw new Error("Target userser is already a member of the current workspace");
    }

    const adminOrOwner = roleHelper.checkIfAdminOrOwner(currentUser.role);

    if(!adminOrOwner){
        throw new Error("Current user doesn't have permission to add new members");
    }

    const canAdd = roleHelper.checkPermission(currentUser.role,role);

    if(!canAdd){
        throw new Error("Current user cannot add user with higher authority than their own");
    }

    const workspaceMember = await prisma.workspaceMember.create({
        data:{
            user_id:Number(targetUserId),
            workspace_id:Number(workspace_id),
            role:role
        }
    });

    await createLog("WORKSPACE_MEMBER",workspaceMember.id,"workspace_member created");
    return workspaceMember;



}


const removeMember = async(currentUserId,workspace_id,targetUserId)=>{
const currentUser = await prisma.workspaceMember.findFirst({
    where:{
        workspace_id:Number(workspace_id),
        user_id:Number(currentUserId)
    }
});
if(!currentUser){
    throw new Error("Current user is not part of the target workspace");
}

const targetUser = await prisma.workspaceMember.findFirst({
    where:{
        workspace_id:Number(workspace_id),
        user_id:Number(targetUserId)
    }
});

if(!targetUser){
    throw new Error("Target user is not part of the target workspace");
}

const checkCurrentUserPermission = roleHelper.checkIfAdminOrOwner(currentUser.role);

if(!checkCurrentUserPermission){
    throw new Error("Current user doesn't have permission to delete target user");
}

const targetUserAuth = roleHelper.checkPermission(currentUser.role,targetUser.role);

if(!targetUserAuth){
    throw new Error("Current user can't remove users with higher authority than their own");
}

const workspaceMember = await prisma.workspaceMember.delete({
    where:{
        user_id:Number(targetUserId),
        workspace_id:Number(workspace_id)

    }
});

await createLog("WORKSPACE_MEMBER",workspaceMember.id,"workspace_member deleted");
return workspaceMember;

}

const changeMemberRole = async(currentUserId,workspace_id,targetUserId,newRole)=>{
    const currentUser = await prisma.workspaceMember.findFirst({
    where:{
        workspace_id:Number(workspace_id),
        user_id:Number(currentUserId)
    }
});
if(!currentUser){
    throw new Error("Current user is not part of the target workspace");
}

const targetUser = await prisma.workspaceMember.findFirst({
    where:{
        workspace_id:Number(workspace_id),
        user_id:Number(targetUserId)
    }
});

if(!targetUser){
    throw new Error("Target user is not part of the target workspace");
}
const checkCurrentUserPermission = roleHelper.checkIfAdminOrOwner(currentUser.role);

if(!checkCurrentUserPermission){
    throw new Error("Current user doesn't have permission to update role of target user");
}

const targetUserAuth = roleHelper.checkPermission(currentUser.role,targetUser.role);

if(!targetUserAuth){
    throw new Error("Current user can't update users with higher authority than their own");
}

const canUpdateToNewRole  = roleHelper.checkPermission(currentUser.role,newRole);

if(!canUpdateToNewRole){
    throw new Error("Current user cannot assign role with higher authority than their own");
}

const workspaceMember = await prisma.workspaceMember.update({
    where:{
        user_id:Number(targetUserId),
        workspace_id:Number(workspace_id)
    },
    data:{
        role:newRole
    }
});
await createLog("WORKSPACE_MEMBER",workspaceMember.id,"workspace_member changed role");

return workspaceMember;
    
}

module.exports = {
addMember,
removeMember,
changeMemberRole
};