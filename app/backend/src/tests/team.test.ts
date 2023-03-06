import * as chai from "chai";
import * as sinon from "sinon";
import { Response } from "superagent";
import { app } from "../app";
import Team from "../database/models/Team";
import { TeamMocks } from "./mocks/Team.mocks";
// @ts-ignore
import chaiHttp = require("chai-http");

chai.use(chaiHttp);

const { expect } = chai;

describe("test /team", () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Team, "findAll").resolves(TeamMocks.mockModelTeamsGetAll as Team[]);
    sinon.stub(Team, "findByPk").resolves(TeamMocks.mockModelTeamGetById as Team);
  });

  after(() => {
    (Team.findAll as sinon.SinonStub).restore();
    (Team.findByPk as sinon.SinonStub).restore();
  });

  it("Test get /team", async () => {
    chaiHttpResponse = await chai.request(app).get("/teams");

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(TeamMocks.mockRouteResponseGetAll);
  });

  it("Test get /team/:id", async () => {
    chaiHttpResponse = await chai.request(app).get("/teams/5");

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(TeamMocks.mockRouteResponseGetById);
  });
});
