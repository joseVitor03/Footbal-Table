import LeaderBoardService from "../services/LeaderBoard.service";
import SequelizeMatches from "../database/models/SequelizeMatches";
import * as sinon from "sinon";
import * as chai from 'chai'
import { App } from '../app';
import * as jwt from 'jsonwebtoken'
import { tableFull, tableAway, tableHome } from './mock/mockLeaderBoard';
import { mockAwayTeam, mockHomeTeam } from "./mock/mockMatches";
// @ts-ignore
import chaiHttp = require("chai-http");

chai.use(chaiHttp);
const { expect } = chai;
const { app } = new App();

const leaderBoarderService = new LeaderBoardService();
describe('testando rota leaderBoarder', function() {
  afterEach(() => {
    sinon.restore()
  })
  it('testando retorno do endpoint GET /leaderboard', async function () {
    sinon.stub(SequelizeMatches, 'findAll').onFirstCall().resolves(mockHomeTeam as any).onSecondCall().resolves(mockAwayTeam as any);
    sinon.stub(leaderBoarderService, 'leaderHome').resolves(tableHome as any);
    sinon.stub(leaderBoarderService, 'leaderAway').resolves(tableAway as any);

    const { status, body } = await chai.request(app).get('/leaderboard');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(tableFull);
  })
})