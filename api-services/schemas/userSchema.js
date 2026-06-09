const userSchema = `#graphql
type User {
id:ID!
username:String!
}

extend type Query {
fetchUser(id:ID!):User
}

extend type Mutation {
login(username:String!,password:String!):String
register(username:String!,password:String!):User
}
`;

module.exports = userSchema;