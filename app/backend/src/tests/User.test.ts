import SequelizeUsers from "../database/models/SequelizeUsers";
import * as sinon from "sinon";
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
import { mockUser } from "./mock/mockUser";
import { App } from '../app';
import UserService from "../services/User.service";
// @ts-ignore
import chaiHttp = require("chai-http");

chai.use(chaiHttp);
const { expect } = chai;
const { app } = new App();
const userServices = new UserService()
describe('testes para os users', function () {

  afterEach(() => {
    sinon.restore()
  })
  
  it('testando o retorno do endpoint POST /login', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mockUser as any);
    sinon.stub(jwt, 'sign').returns('meuToken' as any)
    sinon.stub(userServices, 'login').resolves({ status: 'SUCCESSFUL', data: { token: 'meuToken' } })
    const { status, body } = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin' });

    expect(status).to.be.equal(200);
    expect(body).to.be.eql({ token: 'meuToken'});
  });
  it('testando o retorno do endpoint POST /login com user não encontrado', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);
    sinon.stub(jwt, 'sign').returns('meuToken' as any)
    sinon.stub(userServices, 'login').resolves({ status: 'INVALID_DATA', data: { message: 'Invalid email or password' } })
    const { status, body } = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin' });

    expect(status).to.be.equal(401);
    expect(body).to.be.eql({ message: 'Invalid email or password' });
  });
  it('testando o retorno do endpoint POST /login com user não encontrado', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mockUser as any);
    sinon.stub(bcryptjs, 'compare').resolves(false);
    sinon.stub(jwt, 'sign').returns('meuToken' as any)
    sinon.stub(userServices, 'login').resolves({ status: 'INVALID_DATA', data: { message: 'Invalid email or password' } })
    const { status, body } = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin' });

    expect(status).to.be.equal(401);
    expect(body).to.be.eql({ message: 'Invalid email or password' });
  });
})