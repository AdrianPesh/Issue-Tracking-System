const { Prisma } = require("@prisma/client");
const prisma = require("../config/prisma");

const roleHelper = require("../helpers/rolesHelper");
const { TypeNameMetaFieldDef } = require("graphql");
const {createLog} = require("./logService");

const createJob = async(CurrentUser_id,workspace_id,assignedUserId,deadline,priority,name,description,content)=>{

    const member = await prisma.workspaceMember.findFirst({
        where:{
            user_id:Number(CurrentUser_id),
            workspace_id:Number(workspace_id)
        }
    });
    if(!member){
        throw new Error("Current user is not part of the workspace");
    }

    const isAdminOrOwner = roleHelper.checkIfAdminOrOwner(member.role);

    if(!isAdminOrOwner){
        throw new Error("User doesn't have permission to create jobs");
    }


    const data = {};

    data.workspace_id=Number(workspace_id);
    data.created_by=Number(CurrentUser_id);
    data.updated_by=Number(CurrentUser_id);
    if(assignedUserId !== undefined){
        data.assigned_to=Number(assignedUserId);
    }
    if(deadline !== undefined){
        data.deadline = deadline;
    }
    data.status= "TODO";
    data.priority=priority;
    data.name=name;
    data.description=description;
    data.content=content;


    const job = await prisma.job.create({
        data
    });
     await createLog("JOB",job.id,"job created");
      return job;

  

}

const deleteJob = async(user_id,workpsace_id,job_id)=>{

    const member = await prisma.workspaceMember.findFirst({
        where:{
            user_id:Number(user_id),
            workspace_id:Number(workpsace_id)
        }
    });

    if(!member){
        throw new Error("Current user is not part of the targeted workspace");
    }

    const job = await prisma.job.findFirst({
        where:{
            id:Number(job_id),
            workspace_id:Number(workpsace_id)
        }
    });
    if(!job){
        throw new Error("Job doesn't exist");
    }

    const isAdminOrOwner = roleHelper.checkIfAdminOrOwner(member.isAdminOrOwner);

    if(!isAdminOrOwner){
        throw new Error("User doesn't have permission to delete jobs");
    }

    const deletedJob = await prisma.job.delete({
        where:{
            id:Number(job_id),
            workspace_id:Number(workpsace_id)
        }
    });
    await createLog("JOB",deletedJob.id,"job deleted");

    return deletedJob;

}
const assignJob = async(user_id,workspace_id,job_id,assigneeId)=>{
    const currentUserMember = await prisma.workspaceMember.findFirst({
        where:{
            user_id:Number(user_id),
            workspace_id:Number(workspace_id)
        }
    });
    if(!currentUserMember){
        throw new Error("Current user is not part of the targeted workspace");
    }

    const isAdminOrOwner = roleHelper.checkIfAdminOrOwner(currentUserMember.role);

    if(!isAdminOrOwner){
        throw new Error("Current user doesn't have permission to assign jobs");
    }
    const job = await prisma.job.findFirst({
        where:{
            id:Number(job_id),
            workspace_id:Number(workspace_id)
        }
    });

    if(!job){
        throw new Error("No such job in the targeted workspace");
    }
    const targetUserMember = await prisma.workspaceMember.findFirst({
        where:{
            user_id:Number(assigneeId),
            workspace_id:Number(workspace_id)
        }
    });

    if(!targetUserMember){
        throw new Error("Target user is not part of the workspace");
    }

    const updatedJob = await prisma.job.update({
        where:{
            id:Number(job_id)
        },
        data:{
            assigned_to:Number(assigneeId)
        }
    });
    await createLog("JOB",updatedJob.id,`job assigned to ${updatedJob.assigned_to}`);

    return updatedJob;

}

const updateStatusOrPriorityOrDeadline = async(user_id,workspace_id,job_id,status,priority,deadline)=>{


    if(!status && !priority && !deadline){
        throw new Error("All updatable fields are null");
    }
    const member = await prisma.workspaceMember.findFirst({
        where:{
            user_id:Number(user_id),
            workspace_id:Number(workspace_id)
        }
    });

    if(!member){
        throw new Error("Current user is not part of the targeted workspace");
    }

    const isAdminOrOwner = roleHelper.checkIfAdminOrOwner(member.role);

    if(!isAdminOrOwner){
        throw new Error("Current user doesn't have permission to update jobs");
    }

    const job = await prisma.job.findFirst({
        where:{
            id:Number(job_id),
            workspace_id:Number(workspace_id)
        }
    });
    if(!job){
        throw new Error("No such job in the targeted workpsace");
    }
    const data = {};
    if(status !== undefined){
        data.status=status;
    }
    if(priority !== undefined){
        data.priority=priority;
    }
    if(deadline !== undefined){
        data.deadline=deadline;
    }

    const updatedJob = await prisma.job.update({
        where:{
            id:Number(job_id)
        },
      data
    });
    await createLog("JOB",updatedJob.id,"job updated");
    return updatedJob;

}

module.exports = {
    createJob,
    deleteJob,
    assignJob,
    updateStatusOrPriorityOrDeadline
};