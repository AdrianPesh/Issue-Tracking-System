const {createClient} = require("redis");

require("dotenv").config();


const publisher = new createClient({
    url:process.env.REDIS_URL
});

const subscriber = publisher.duplicate();

const connectRedis = async()=>{
    await publisher.connect();
    await subscriber.connect();

    console.log("Redis connected");
}

module.exports = {
    publisher,
    subscriber,
    connectRedis
};