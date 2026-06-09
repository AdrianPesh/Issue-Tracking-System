const jobService = require("../services/jobService");

const jobResolver = {
    Query:{
        fetchJobs:async()=>{}
    },
    Mutation:{
        createJob:async(_,{workspace_id,assignedUserId,deadline,priority,name,description,content},{user})=>{
            if(!user){
                throw new Error("Unauthorized");
            }
            deadline?new Date(deadline):null;
            return await jobService.createJob(user.id,workspace_id,assignedUserId,deadline,priority,name,description,content);
        },
        deleteJob:async(_,{workspace_id,job_id},{user})=>{
            if(!user){
                throw new Error("Unauthorized");
            }
            return await jobService.deleteJob(user.id,workspace_id,job_id);


        },
        assignJob:async(_,{workpsace_id,job_id,assigneeId},{user})=>{
            if(!user){
                throw new Error("Unauthorized");
            }
            return await jobService.assignJob(user.id,workpsace_id,job_id,assigneeId);
        },
        updateJob:async(_,{workpsace_id,job_id,status,priority,deadline},{user})=>{
            if(!user){
                throw new Error("Unauthorized");
            }
            deadline?new Date(deadline):null;
            return await jobService.updateStatusOrPriorityOrDeadline(user.id,workpsace_id,job_id,status,priority,deadline);
        }
    }
};

module.exports = jobResolver;