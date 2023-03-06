import * as chai from "chai";
import * as JWT from "jsonwebtoken";
import * as sinon from "sinon";
import { Response } from "superagent";
import { IUserLogin } from "../api/interfaces/User/IUser";
import { app } from "../app";
import User from "../database/models/User";
import { LoginMocks } from "./mocks/Login.mocks";
// @ts-ignore
import chaiHttp = require("chai-http");

chai.use(chaiHttp);

const { expect } = chai;

describe("Test /login", () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(User, "findOne").resolves(LoginMocks.mockLogin as User);
    sinon.stub(JWT, "sign").resolves(LoginMocks.tokenMock);
    sinon.stub(JWT, "verify").resolves();
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
    (JWT.sign as sinon.SinonStub).restore();
    (JWT.verify as sinon.SinonStub).restore();
  });

  it("Test login on /login", async () => {
    const infoLogin: IUserLogin = {
      email: "admin@admin.com",
      password: "secret_admin",
    };
    chaiHttpResponse = await chai.request(app).post("/login").send(infoLogin);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ token: LoginMocks.tokenMock });
  });

  it("Test /login/role", async () => {
    const infoLogin: IUserLogin = {
      email: "admin@admin.com",
      password: "secret_admin",
    };
    chaiHttpResponse = await chai
      .request(app)
      .get("/login/role")
      .set("Authorization", LoginMocks.tokenMock);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ role: "admin" });
  });
});

describe("Test /login", () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(User, "findOne").resolves(undefined);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it("Test /login case error", async () => {
    const infoLogin: IUserLogin = {
      email: "test@test.com",
      password: "secret_test",
    };
    chaiHttpResponse = await chai.request(app).post("/login").send(infoLogin);

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: "Invalid email or password",
    });
  });
});
