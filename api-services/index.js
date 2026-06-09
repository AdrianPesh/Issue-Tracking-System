const createApp = require("./app");
const { Server } = require("socket.io");
const http = require("http");
const { messageHandler } = require("./handlers/messageHandler");
const { commentHandler } = require("./handlers/commentHandler");
const { joinWorkspace } = require("./handlers/workspaceHandler");
const { connectRedis } = require("./config/redis");
const { replyHandler } = require("./handlers/replyHandler");
const { workspaceSubscriber } = require("./subscribers/workspaceSubscriber");
const socketAuth = require("./middleware/socketMiddleware");
const {logSubscriber} = require("./subscribers/logSubsriber");
const sleep = function(ms){
 return new Promise(resolve=>setTimeout(resolve,ms));
}

const startServer = async () => {
 let redisConnected =false;

    
    while(!redisConnected){
       try{
        await connectRedis();
        redisConnected=true;

       }catch(error){
        console.log("Retrying connection...");
        await sleep(1000);

       }
    }

    const app = await createApp();
    const httpServer = http.createServer(app);

    const io = new Server(httpServer, {
        cors: {
            origin: "*"
        }
    });
    io.use(socketAuth);

    logSubscriber();
    workspaceSubscriber(io);

    io.on("connection", (socket) => {
        console.log("Connected: ", socket.id);
        joinWorkspace(socket);
        messageHandler(socket);
        commentHandler(socket);
        replyHandler(socket);
    });


    httpServer.listen(3000, () => {
        console.log("Server is running on port 3000");
    });




}

startServer();