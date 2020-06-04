describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/tests/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('main > h2').should('contain', 'Log in to application')
    cy.get('main > form #username')
    cy.get('main > form #password')
    cy.get('main > form button').should('contain', 'login')
  })
})
