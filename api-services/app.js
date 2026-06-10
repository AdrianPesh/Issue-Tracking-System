const express = require("express");
const {ApolloServer} = require("@apollo/server");
const typeDefs = require("./schemas/index");
const resolvers = require("./resolvers/index"); 
const cors = require("cors");
const context = require("./middleware/contextMiddleware");
const {expressMiddleware} = require("@as-integrations/express5");

const startApp = async()=>{
    const app =express();
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    await server.start();
    app.use("/graphql",cors(),express.json(),expressMiddleware(server,{context}));

    return app;
}

module.exports = {startApp};

