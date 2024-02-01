import SequelizeMatches from '../database/models/SequelizeMatches';
import * as sinon from "sinon";
import * as chai from 'chai'
import { mockMatchesNotFilter, mockFiltertrue } from "./mock/mockMatches";
import { App } from '../app';

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
  })
})