const prisma = require("../config/prisma");
const {createLog} = require("./logService");

const joinWorkspace = async(user_id,workspace_id)=>{

    const member = await prisma.workspaceMember.findFirst({
        where:{
        user_id:Number(user_id),
        workspace_id:Number(workspace_id)
        }
    });

    if(member){
        return true;
    }else{
        return false;
    }
}

const createWorkspace = async(name,user_id)=>{

    const existingWorkspace = await prisma.workspace.findFirst({
        where:{
            created_by:Number(user_id),
            name:name
        }
    });
    if(existingWorkspace){
        throw new Error("Current user already created workspace with this name");
    }

   const result = await prisma.$transaction(async(tx)=>{
      
        const workspace =await tx.workspace.create({
            data:{
                name:name,
                created_by:Number(user_id)
            }
        });

       const workspaceMember = await tx.workspaceMember.create({
            data:{
                user_id:Number(user_id),
                workspace_id:Number(workspace.id),
                role:"OWNER"
            }
        });

    
    return {
        workspace,
        workspaceMember
    };
    
    });
    await createLog("WORKSPACE",result.workspace.id,"workspace created");
    await createLog("WORKSPACE_MEMBER",result.workspaceMember.id,"workspace_member created as owner");

    return result.workspace;

}

const deleteWorkspace = async(workspace_id,user_id)=>{

    const existingWorkspace = await prisma.workspace.findFirst({
        where:{
            workspace_id:Number(workspace_id),
            created_by:Number(user_id)
        }
    });

    if(!existingWorkspace){
        throw new Error("Workspace doesn't exist");
    }

    const member = await prisma.workspaceMember.findFirst({
        where:{
            user_id:Number(user_id),
            workspace_id:Number(workspace_id)
        }
    });
    if(member.role!="OWNER"){
        throw new Error("Current user doesn't have permission for thjis operation");
    }

  const result = await prisma.$transaction(async(tx)=>{
     const workspaceMember = await tx.workspaceMember.deleteMany({
        where:{
            workspace_id:Number(workspace_id)
        }
     });

     const workspace = await tx.workspace.delete({
        where:{
            id:Number(workspace_id)
        }
     });
  });
 await createLog("WORKSPACE",result.workspace.id,"workspace deleted and all memebers within");
  return result.workspace;

}


module.exports = {
    joinWorkspace,
    createWorkspace,
    deleteWorkspace
}