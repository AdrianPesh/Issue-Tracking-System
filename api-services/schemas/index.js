const base = require("./baseSchema");
const userSchema = require("./userSchema");
const workspaceSchema = require("./workspaceSchema");
const workspaceMemberSchema = require("./workspaceMemberSchema");
const jobSchema = require("./jobSchema");
const indexSchema = `#graphql

${base}

${userSchema}

${workspaceSchema}

${workspaceMemberSchema}

${jobSchema}
`;

module.exports=indexSchema;