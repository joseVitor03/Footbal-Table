import SequelizeMatches from '../database/models/SequelizeMatches';
import * as sinon from "sinon";
import * as chai from 'chai'
import { mockMatchesNotFilter, mockFiltertrue } from "./mock/mockMatches";
import { App } from '../app';
import * as jwt from 'jsonwebtoken'
// @ts-ignore
import chaiHttp = require("chai-http");

chai.use(chaiHttp);
const { expect } = chai;
const { app } = new App();

describe('testando rota /matches', function() {
  afterEach(() => {
    sinon.restore();
  })
  it('testando o endpoint GET /matches sem filtro', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(mockMatchesNotFilter as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls(mockMatchesNotFilter);
  })
  it('testando o endpoint GET /matches com filtro true', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(mockFiltertrue as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls(mockFiltertrue);
  });
  it('testando o endpoint PATCH /matches/:id/finish', async function() {
    sinon.stub(SequelizeMatches, 'findOne').resolves();
    sinon.stub(jwt, 'verify').returns( { email: 'admin@admin.com'} as any )
    const { status, body } = await chai.request(app).patch('/matches/41/finish').set('Authorization', 'Bearer meuToken');

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls({message: 'Finished'});
  });
  it('testando o endpoint PATCH /matches/:id/finish com token invalido', async function() {
      sinon.stub(jwt, 'verify').throws(new Error("aaa"));
      const { status, body } = await chai.request(app).patch('/matches/41/finish').set('Authorization', 'meuToken');
    
    expect(status).to.be.equal(401);
    expect(body).to.be.eqls({message: 'Token must be a valid token'});
  });
  it('testando o endpoint PATCH /matches/:id', async function() {
    sinon.stub(SequelizeMatches, 'update').resolves([2]);
    sinon.stub(jwt, 'verify').returns('a' as any);
    const { status, body } = await chai.request(app).patch('/matches/1').set('Authorization', 'Bearer meuToken');
  
    expect(status).to.be.equal(200);
    expect(body).to.be.eqls({affectedCount: 2});
  });
  it('testando o endpoint PATCH /matches/:id com token invalid', async function() {
    sinon.stub(SequelizeMatches, 'update').resolves([2]);
    // sinon.stub(jwt, 'verify').returns('a' as any);
    const { status, body } = await chai.request(app).patch('/matches/1').set('Authorization', 'Bearer meuToken');
  
    expect(status).to.be.equal(401);
    expect(body).to.be.eqls({ message: 'Token must be a valid token' });
  });
  it('testando o endpoint POST /matches', async function() {
    sinon.stub(SequelizeMatches, 'create').resolves({
      id: 49,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      awayTeamId: 11,
      homeTeamId: 10,
      inProgress: true,
    } as any);
    sinon.stub(jwt, 'verify').returns('a' as any);
    const { status, body } = await chai.request(app).post('/matches').set('Authorization', 'Bearer meuToken').send({
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      awayTeamId: 11,
      homeTeamId: 10,
    });
  
  expect(status).to.be.equal(201);
  expect(body).to.be.eqls({
    id: 49,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    awayTeamId: 11,
    homeTeamId: 10,
    inProgress: true,
  });
})
  it('testando o endpoint POST /matches com time inexistente', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves([]);
    sinon.stub(jwt, 'verify').returns('a' as any);
    const { status, body } = await chai.request(app).post('/matches').set('Authorization', 'Bearer meuToken').send({
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      awayTeamId: 111,
      homeTeamId: 10,
    });

    expect(status).to.be.equal(404);
    expect(body).to.be.eqls({message: 'There is no team with such id!'});
  });
  it('testando o endpoint POST /matches token invalid', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves([]);
    // sinon.stub(jwt, 'verify').returns('a' as any);
    const { status, body } = await chai.request(app).post('/matches').set('Authorization', 'Bearer meuToken').send({
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      awayTeamId: 111,
      homeTeamId: 10,
    });

    expect(status).to.be.equal(401);
    expect(body).to.be.eqls({ message: 'Token must be a valid token' });
  });
  it('testando o endpoint POST /matches com times iguais', async function() {
    sinon.stub(jwt, 'verify').returns('a' as any);
    const { status, body } = await chai.request(app).post('/matches').set('Authorization', 'Bearer meuToken').send({
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      awayTeamId: 11,
      homeTeamId: 11,
    });

    expect(status).to.be.equal(422);
    expect(body).to.be.eqls({message: 'It is not possible to create a match with two equal teams' });
  })
})