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
  it('testando o endpoint GET /matches/:id/finish', async function() {
    sinon.stub(SequelizeMatches, 'findOne').resolves();
    sinon.stub(jwt, 'verify').returns( { email: 'admin@admin.com'} as any )
    const { status, body } = await chai.request(app).patch('/matches/41/finish').set('Authorization', 'Bearer meuToken');

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls({message: 'Finished'});
  });
  it('testando o endpoint GET /matches/:id/finish com token invalido', async function() {
      sinon.stub(jwt, 'verify').throws(new Error("aaa"));
      const { status, body } = await chai.request(app).patch('/matches/41/finish').set('Authorization', 'meuToken');
    
    expect(status).to.be.equal(401);
    expect(body).to.be.eqls({message: 'Token must be a valid token'});
  })
})