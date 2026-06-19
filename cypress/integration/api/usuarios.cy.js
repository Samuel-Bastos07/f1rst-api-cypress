describe('ServeRest - Usuarios API', () => {
  let userId;
  let userEmail;

  before(() => {
    userEmail = `usuario_${Date.now()}@teste.com`;
  });

  it('GET /usuarios - Listar todos os usuarios', () => {
    cy.request('GET', '/usuarios').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('usuarios').and.to.be.an('array');
      expect(response.body).to.have.property('quantidade');
      cy.log(`Total de usuarios: ${response.body.quantidade}`);
    });
  });

  it('POST /usuarios - Criar novo usuario', () => {
    cy.request({
      method: 'POST',
      url: '/usuarios',
      body: {
        nome: 'Teste F1rst',
        email: userEmail,
        password: 'teste@123',
        administrador: 'true',
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      userId = response.body._id;
      cy.log(`Usuario criado com ID: ${userId}`);
    });
  });

  it('GET /usuarios/{id} - Buscar usuario pelo ID', () => {
    cy.request('GET', `/usuarios/${userId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('nome', 'Teste F1rst');
      expect(response.body).to.have.property('email', userEmail);
      cy.log(`Usuario encontrado: ${response.body.nome}`);
    });
  });

  it('PUT /usuarios/{id} - Atualizar usuario', () => {
    cy.request({
      method: 'PUT',
      url: `/usuarios/${userId}`,
      body: {
        nome: 'Teste F1rst Atualizado',
        email: userEmail,
        password: 'novaSenha@123',
        administrador: 'false',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Registro alterado com sucesso');
    });
  });

  it('DELETE /usuarios/{id} - Excluir usuario', () => {
    cy.request('DELETE', `/usuarios/${userId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Registro excluído com sucesso');
    });
  });

  it('GET /usuarios/{id} - Validar que usuario excluido nao existe mais', () => {
    cy.request({
      method: 'GET',
      url: `/usuarios/${userId}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq('Usuário não encontrado');
    });
  });

});
