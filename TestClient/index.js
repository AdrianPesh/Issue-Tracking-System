const { io } = require("socket.io-client");
const sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const runTasks = async (socket, tasks) => {

    for (task of tasks) {
        if(task.execute){
        socket.emit(task.operation,task.data);
        await sleep(1000);
        }
    }


}




const start = () => {
    const workspace = 1;
    const socket = io("http://localhost:3000", {
        auth: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJSYW5kb21Vc2VyMSIsImlhdCI6MTc4MTAxNTcyN30.PoTEk4265xjgkkkZFFoFFXj7JoVpavcatiYe3iFAwkA"
        }
    });

    const operations = [
        //CREATE
        {
            execute:true,
            operation: "create-message",
            data: {
                workspaceId: workspace,
                message: "Hello everyoneeee"
            }
        },
        {
             execute:true,
            operation: "create-comment",
            data: {
                workspaceId: workspace,
                jobId: 1,
                commentContent: "Checking please wait ;)"
            }
        },
        {
             execute:true,
            operation: "create-reply",
            data: {
                workspaceId: workspace,
                commentId: 1,
                jobId: 1,
                replyContent: "Thank you very much"
            }
        },
        //UPDATE
        {
             execute:true,
            operation: "update-message",
            data: {
                workspaceId: workspace,
                messageId: 14,
                newMessage: "I meant HI EVERYONEEE"
            }
        },
        {
             execute:true,
            operation: "update-comment",
            data: {
                workspaceId:workspace,
                jobId:1,
                commentId:1,
                newComment:"I meant I WILL CHECK IT"
            }
        },
        {
             execute:true,
            operation: "update-reply",
            data: {
                workspaceId: workspace,
                replyId:1,
                newReply:"I meant THANKS A LOT"
            }
        },
        //DELETE
          {
             execute:true,
            operation: "delete-message",
            data: {
                workspaceId: workspace,
                messageId:19
            }
        },
          {
             execute:true,
            operation: "delete-comment",
            data: {
                workspaceId: workspace,
                jobId:1,
                commentId:4
            }
        },
          {
             execute:true,
            operation: "delete-reply",
            data: {
                workspaceId: workspace,
                replyId:4
            }
        }
    ];

    socket.on("connect", async () => {
        console.log("Connected: ", socket.id);
        socket.emit("join-workspace", 1);
        await sleep(1000);
        await runTasks(socket,operations);
    });

    //Message

    socket.on("message-created", (message) => {
        console.log("Message created: ", message);
    });

    socket.on("message-deleted", (message) => {
        console.log("Deleted message: ", message);
    });
    socket.on("message-updated", (message) => {
        console.log("Updated message: ", message);
    });
    socket.on("create-message-error", (message) => {
        console.log("Create message error: ", message);
    });
    socket.on("delete-message-error", (message) => {
        console.log("Delete message error: ", message);
    });
    socket.on("update-message-error", (message) => {
        console.log("Update message error: ", message);
    });

    //Comment

    socket.on("comment-created", (message) => {
        console.log("Comment created: ", message);
    });

    socket.on("comment-deleted", (message) => {
        console.log("Deleted comment: ", message);
    });
    socket.on("comment-updated", (message) => {
        console.log("Updated comment: ", message);
    });
    socket.on("create-comment-error", (message) => {
        console.log("Create comment error: ", message);
    });
    socket.on("delete-comment-error", (message) => {
        console.log("Delete comment error: ", message);
    });
    socket.on("update-comment-error", (message) => {
        console.log("Update comment error: ", message);
    });
    //Reply

    socket.on("reply-created", (message) => {
        console.log("Reply created: ", message);
    });

    socket.on("reply-deleted", (message) => {
        console.log("Deleted reply: ", message);
    });
    socket.on("reply-updated", (message) => {
        console.log("Updated reply: ", message);
    });
    socket.on("create-reply-error", (message) => {
        console.log("Create reply error: ", message);
    });
    socket.on("delete-reply-error", (message) => {
        console.log("Delete reply error: ", message);
    });
    socket.on("update-reply-error", (message) => {
        console.log("Update reply error: ", message);
    });



    socket.on("connect-error", (message) => {
        console.log(message);
    });




}

start();