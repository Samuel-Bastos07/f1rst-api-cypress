describe('ServeRest - Login API', () => {
  let userEmail;
  let userId;

  before(() => {
    userEmail = `login_${Date.now()}@teste.com`;

    cy.request({
      method: 'POST',
      url: '/usuarios',
      body: {
        nome: 'Teste Login F1rst',
        email: userEmail,
        password: 'teste@123',
        administrador: 'true',
      },
    }).then((response) => {
      userId = response.body._id;
    });
  });

  after(() => {
    cy.request('DELETE', `/usuarios/${userId}`);
  });

  it('POST /login - Login com credenciais validas', () => {
    cy.request({
      method: 'POST',
      url: '/login',
      body: {
        email: userEmail,
        password: 'teste@123',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Login realizado com sucesso');
      expect(response.body).to.have.property('authorization');
      cy.log(`Token gerado: ${response.body.authorization}`);
    });
  });

  it('POST /login - Login com senha invalida', () => {
    cy.request({
      method: 'POST',
      url: '/login',
      body: {
        email: userEmail,
        password: 'senhaErrada',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq('Email e/ou senha inválidos');
    });
  });

  it('POST /login - Login com email inexistente', () => {
    cy.request({
      method: 'POST',
      url: '/login',
      body: {
        email: 'naoexiste@teste.com',
        password: 'teste@123',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq('Email e/ou senha inválidos');
    });
  });

});
