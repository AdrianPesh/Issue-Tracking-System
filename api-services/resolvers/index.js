const userResolver = require("./userResolver");
const workspaceResolver = require("./workspaceResolver");
const workspaceMemberResolver = require("./workspaceMemberResolver");
const jobResolver = require("./jobResolver");
const indexResolver = {
    Query:{

        ...userResolver.Query,
        ...workspaceResolver.Query,
        ...workspaceMemberResolver.Query,
        ...jobResolver.Query

    },
    Mutation:{
    
        ...userResolver.Mutation,
        ...workspaceResolver.Mutation,
        ...workspaceMemberResolver.Mutation,
        ...jobResolver.Mutation

    }
};

module.exports = indexResolver;