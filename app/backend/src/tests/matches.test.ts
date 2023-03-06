import * as chai from "chai";
import * as sinon from "sinon";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

import { Response } from "superagent";
import Match from "../database/models/Match";
import Team from "../database/models/Team";
import { LoginMocks } from "./mocks/Login.mocks";
import { mocks } from "./mocks/match.mocks";
import { TeamMocks } from "./mocks/Team.mocks";

chai.use(chaiHttp);

const { expect } = chai;

describe("Test /match", () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Match, "findAll").resolves(mocks.mockModelMatchGetAll as Match[]);
    sinon.stub(Match, "findByPk").resolves(mocks.mockModelMatchGetAll[0] as Match);
    sinon.stub(Match, "update").resolves([1]);
  });

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
    (Match.findByPk as sinon.SinonStub).restore();
    (Match.update as sinon.SinonStub).restore();
  });

  it("Test get /matches", async () => {
    chaiHttpResponse = await chai.request(app).get("/matches");

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(
      mocks.mockRouteResponseMatchGetAll
    );
  });

  it("Test /matches/:id/finish", async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch("/matches/1/finish")
      .set("Authorization", LoginMocks.tokenMock);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Finished" });
  });

  it("Test /matches/:id", async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch("/matches/1")
      .send(LoginMocks.mockScore)
      .set("Authorization", LoginMocks.tokenMock);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(LoginMocks.mockScore);
  });
});

describe("Test /match", () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Match, "findAll").resolves(mocks.mockModelMatchGetAll as Match[]);
    sinon.stub(Match, "findByPk").resolves(mocks.mockModelMatchGetAll[0] as Match);
    sinon.stub(Match, "update").resolves([1]);
    sinon.stub(Match, "create").resolves(mocks.mockNewMatch as Match);
    sinon
      .stub(Team, "findAll")
      .onFirstCall()
      .resolves(TeamMocks.teamsFindAllValid as Team[])
      .onSecondCall()
      .resolves(TeamMocks.teamsFindAllInvalid as Team[]);
  });

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
    (Match.findByPk as sinon.SinonStub).restore();
    (Match.update as sinon.SinonStub).restore();
    (Match.create as sinon.SinonStub).restore();
    (Team.findAll as sinon.SinonStub).restore();
  });

  it("Test get /matches", async () => {
    chaiHttpResponse = await chai.request(app).get("/matches");

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(
      mocks.mockRouteResponseMatchGetAll
    );
  });

  it("Test /matches/:id/finish", async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch("/matches/1/finish")
      .set("Authorization", LoginMocks.tokenMock);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Finished" });
  });

  it("Test /matches/:id", async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch("/matches/1")
      .send(LoginMocks.mockScore)
      .set("Authorization", LoginMocks.tokenMock);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(LoginMocks.mockScore);
  });

  it("Test /matches", async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post("/matches")
      .send(mocks.mockSendMatchValid)
      .set("Authorization", LoginMocks.tokenMock);

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal(mocks.mockResponseMatch);
  });

  it("Test /matches case error", async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post("/matches")
      .send(mocks.mockSendMatchInvalid)
      .set("Authorization", LoginMocks.tokenMock);

    expect(chaiHttpResponse.status).to.be.equal(422);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: "It is not possible to create a match with two equal teams",
    });
  });
  it("Test post /matches case error", async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post("/matches")
      .send(mocks.mockSendMatchInvalid2)
      .set("Authorization", LoginMocks.tokenMock);

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: "There is no team with such id!",
    });
  });
});
