import SequelizeTeams from "../database/models/SequelizeTeams";
import * as sinon from "sinon";
import * as chai from 'chai'
import { mockTeams } from "./mock/mockTeam";
import { App } from '../app';
// @ts-ignore
import chaiHttp = require("chai-http");

chai.use(chaiHttp);
const { expect } = chai;
const { app } = new App();
describe('testes para os teams', function () {

  afterEach(() => {
    sinon.restore()
  })
  
  it('testando o retorno do endpoint Get /teams', async () => {
    sinon.stub(SequelizeTeams, 'findAll').resolves(mockTeams as any);
    
    const { status, body } = await chai.request(app).get('/teams');
    
    expect(status).to.be.equal(200);
    expect(body).to.be.eql(mockTeams);
  });

  it('testando o retorno do endpoint GET /teams/:id', async function () {
    sinon.stub(SequelizeTeams, 'findByPk').resolves({ id: 1, teamName: 'São Paulo'} as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.be.equal(200);
    expect(body).to.be.eql({ id: 1, teamName: 'São Paulo'})
  })
})