const workspaceSchema = `#graphql

type Workspace{
id:ID!
name:String!
}

extend type Query{
fetchWorkspace(id:ID!):Workspace
}

extend type Mutation{
createWorkspace(name:String!):Workspace
deleteWorkspace(workspace_id:ID!):Workspace

}
`;

module.exports = workspaceSchema;