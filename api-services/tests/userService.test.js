beforeEach(()=>{
    jest.clearAllMocks();
});

jest.mock("../config/prisma",()=>({
    user:{
        findFirst:jest.fn(),
        create:jest.fn()
    },
    log:{
        create:jest.fn()
    }
}));
jest.mock("../config/redis",()=>({
    publisher:{
        publish:jest.fn()
    }
}));


const {publisher} = require("../config/redis");
const prisma = require("../config/prisma");
const userHelper = require("../helpers/userHelper");
const userService = require("../services/userService");
describe("Create User",()=>{
    it("Create User",async()=>{
        const password = await userHelper.hashPassword("1234");
        prisma.user.findFirst.mockResolvedValueOnce(null);
        prisma.user.create.mockResolvedValueOnce({
            id:1,
            username:"admin",
            password:password
        });
        prisma.log.create.mockResolvedValueOnce({
            id:1,
            entityType:"USER",
            entityId:1,
            message:"User created succesfully"
        });

        const result = await userService.registerUser("admin","1234");
        expect(result.id).toBe(1);
        expect(password).not.toBe("1234");
        expect(publisher.publish).toHaveBeenCalledTimes(1);
    });
});