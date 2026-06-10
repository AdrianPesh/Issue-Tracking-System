const authHelper = require("../helpers/authHelper");

beforeAll(()=>{
    process.env.JWT_SECRET="top-secret";
})

describe("Auth Helper Test",()=>{
    it("Sign JWT and validate",()=>{
        const jwt = authHelper.signJWT({id:1,username:"admin"});
        const decode = authHelper.verifyJWT(jwt);

        expect(decode.id).toBe(1);
        expect(decode.username).toBe("admin");
    })
})