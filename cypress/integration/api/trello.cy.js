describe('Trello API', () => {

  it('GET /actions/{id} - Validar status code e exibir o nome da lista', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.trello.com/1/actions/592f11060f95a3d3d46a987a',
      qs: {
        key: Cypress.env('TRELLO_KEY'),
        token: Cypress.env('TRELLO_TOKEN'),
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);

      const listName = response.body.data.list.name;
      cy.log(`Nome da lista: ${listName}`);
      expect(listName).to.be.a('string').and.not.be.empty;
    });
  });

});
