const jobSchema = `#graphql

type Job{
id:ID!
assigned_to:ID
created_by:ID!
updated_by:ID!
deadline:String
}

extend type Query{
fetchJobs(user_id:ID!,workspace_id:ID!):[Job]
}
enum Priorities{
LOW
MEDIUM
HIGH
CRITICAL
}

extend type Mutation{
createJob(workspace_id:ID!,assignedUserId:ID,deadline:String,priority:Priorities!,name:String!,description:String!,content:String!):Job
deleteJob(workspace_id:ID!,job_id:ID!):Job
assignJob(workspace_id:ID!,job_id:ID!,assigneeId:ID!):Job
updateJob(workpsace_id:ID!,job_id:ID!,status:String,priority:String,deadline:String):Job
}
`;

module.exports = jobSchema;