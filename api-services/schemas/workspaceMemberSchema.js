const workspaceMemberSchema = `#graphql

enum roles{
OWNER
ADMIN
MEMBER
GUEST
}

type WorkspaceMember{
id:ID!
user_id:ID!
workspace_id:ID!
role:String!
}

extend type Query{

fetchMembers(workspaceId:ID!):[WorkspaceMember]
}

extend type Mutation{
addMember(workspace_id:ID!,targetUserId:ID!,role:roles!):WorkspaceMember
removeMember(workspace_id:ID!,targetUserId:ID!):WorkspaceMember
changeMemberRole(workspace_id:ID!,targetUserId:ID!,newRole:roles!):WorkspaceMember

}
`;

module.exports = workspaceMemberSchema;