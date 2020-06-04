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

  describe('When logged in', function () {
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

    it('A blog can be liked', function () {
      cy.createBlog({
        title: 'Exercise 5.20',
        author: 'Matti Luukkainen',
        url: 'https://fullstackopen.com',
      })
      cy.get('main div > h3')
        .contains('Exercise 5.20 Matti Luukkainen')
        .parent()
        .as('theBlog')

      cy.get('@theBlog').contains('view').click()
      cy.get('@theBlog').contains('like').click()
      cy.get('@theBlog').should('contain', 'likes 1')
    })

    it('A blog can be deleted by its creator', function () {
      cy.createBlog({
        title: 'Exercise 5.21',
        author: 'Matti Luukkainen',
        url: 'https://fullstackopen.com',
      })
      cy.get('main div > h3')
        .contains('Exercise 5.21 Matti Luukkainen')
        .parent()
        .as('theBlog')
      cy.get('@theBlog').contains('view').click()
      cy.get('@theBlog').contains('remove').click()
      cy.get('main h3').should('not.contain', 'Exercise 5.21 Matti Luukkainen')
    })

    it('A blog cannot be deleted by another users', function () {
      cy.createBlog({
        title: 'Exercise 5.21',
        author: 'Matti Luukkainen',
        url: 'https://fullstackopen.com',
      })
      const user = {
        name: 'Arto Hellas',
        username: 'hellas',
        password: 'salainen',
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)
      cy.get('main p button').contains('logout').click()
      cy.login({ username: 'hellas', password: 'salainen' })
      cy.get('main div > h3')
        .contains('Exercise 5.21 Matti Luukkainen')
        .parent()
        .as('theBlog')
      cy.get('@theBlog').contains('view').click()
      cy.get('@theBlog').contains('remove').click()
      cy.get('main h3').should('contain', 'Exercise 5.21 Matti Luukkainen')
      cy.get('.notification')
        .should('contain', 'Could not remove the blog.')
        .and('have.css', 'color', 'rgb(255, 99, 71)')
    })
  })
})
