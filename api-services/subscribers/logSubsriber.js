const {subscriber} = require("../config/redis");

const logSubscriber = async()=>{
    console.log("Log events subscriber started");
    await subscriber.subscribe("log-events",(message)=>{
        const data = JSON.parse(message);
        console.log(data.message);
    });
}

module.exports = {logSubscriber};