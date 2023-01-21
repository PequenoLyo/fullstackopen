describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:8080/api/testing/reset')
    const user = {
      name: 'Élio Maia',
      username: 'Pequeno',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:8080/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')  
  })

  describe('Login tests', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name=Username]').type('Pequeno')
      cy.get('input[name=Password]').type('password')
      cy.get('button').click()
      cy.contains('Élio Maia logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name=Username]').type('wrong')
      cy.get('input[name=Password]').type('wrong')
      cy.get('button').click()
      cy.contains('login')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username: 'Pequeno', password: 'password'})
    })

    it('A blog can be created', function() {
      cy.createBlog({title: 'test blog title', author: 'test author', url: 'www.test.com'})
      cy.contains('test blog title')
    })

    it('A blog can be liked', function() {
      cy.createBlog({title: 'test blog title', author: 'test author', url: 'www.test.com'})
      cy.contains('test blog title').parent().find('button').click()
            cy.contains('like').click()
    })
    
  })


})


