const request = require("supertest");

const {startApp} = require("../app");

const authHelper = require("../helpers/authHelper");
const prisma = require("../config/prisma");
const {publisher} = require("../config/redis");
let app;

beforeAll(async()=>{
    app = await startApp();
        await prisma.reply.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.message.deleteMany();
    await prisma.job.deleteMany();
    await prisma.workspaceMember.deleteMany();
    await prisma.workspace.deleteMany();
    await prisma.user.deleteMany();
});



jest.mock("../config/redis",()=>({
    publisher:{
        publish:jest.fn()
    }
}));

describe("User API",()=>{
    it("Create User",async()=>{
        const response = await request(app).post("/graphql").send({
            query:`
            mutation {
            register(username:"admin",password:"1234"){id,username}
            }
            `
        });

        expect(response.status).toBe(200);
        expect(response.body.data.register.username).toBe("admin");
        
        
    });
    it("Fail to Create user",async()=>{
         const response = await request(app).post("/graphql").send({
            query:`
            mutation {
            register(username:"admin",password:"1234"){id,username}
            }
            `
        });

        expect(response.status).toBe(200);
        expect(response.body.errors[0].message).toBe("User already exists");
    });
    it("Succesfull Login",async()=>{
        const response = await request(app).post("/graphql").send({
            query:`
            mutation {
            login(username:"admin",password:"1234")
            }
            `
        });
        const decoded = authHelper.verifyJWT(response.body.data.login);
        expect(response.status).toBe(200);
        expect(decoded.username).toBe("admin");
    });
    it("Unsucessfull Login",async()=>{
        const response = await request(app).post("/graphql").send({
            query:`
            mutation {
              login(username:"admin",password:"12345")
            }
            `
        });

        expect(response.status).toBe(200);
        expect(response.body.errors[0].message).toBe("Invalid credentials");
    });
})