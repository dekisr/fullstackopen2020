describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/tests/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('main > h2').should('contain', 'Log in to application')
    cy.get('main > form #username')
    cy.get('main > form #password')
    cy.get('main > form button').should('contain', 'login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('main > form #username').type('mluukkai')
      cy.get('main > form #password').type('salainen')
      cy.get('main > form button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('main > form #username').type('mluukkai')
      cy.get('main > form #password').type('wrong')
      cy.get('main > form button').click()
      cy.get('.notification')
        .should('contain', 'Wrong credentials.')
        .and('have.css', 'color', 'rgb(255, 99, 71)')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })
    it('A blog can be created', function () {
      // cy.createBlog({
      //   title: 'Exercise 5.19',
      //   author: 'Hellas',
      //   url: 'https://fullstackopen.com',
      // })
      cy.contains('new blog').click()
      cy.get('main form #title').type('Exercise 5.19')
      cy.get('main form #author').type('Hellas')
      cy.get('main form #url').type('https://fullstackopen.com')
      cy.get('main form button').contains('create').click()
      cy.get('main div > h3').should('contain', 'Exercise 5.19 Hellas')
    })
  })
})
