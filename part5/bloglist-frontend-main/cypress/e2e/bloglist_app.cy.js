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
      cy.contains('test blog title').parent().find('.buttonShowHide').click()
      cy.get('.buttonLike').click()
    })

    it('A blog can be deleted', function() {
      cy.createBlog({title: 'test blog title', author: 'test author', url: 'www.test.com'})
      cy.contains('test blog title').parent().find('.buttonShowHide').click()
      cy.get('.buttonDelete').click()
      cy.get('html').should('not.contain', 'test blog title')
    })

    it('The blogs are sorted by number of likes', function() {
      cy.createBlog({title: 'blog with the second most likes', author: 'test author', url: 'www.test.com'})
      cy.createBlog({title: 'blog with the most likes', author: 'test author', url: 'www.test.com'})
      cy.createBlog({title: 'blog with the least likes', author: 'test author', url: 'www.test.com'})
    
      cy.contains('blog with the most likes').parent().find('.buttonShowHide').click()
      cy.get('.buttonLike')
        .click()
        .wait(1000)
        .click()
        .wait(1000)
        .click()
        .wait(1000)
        .click()
        .wait(1000)
      cy.contains('blog with the most likes').parent().find('.buttonShowHide').click()
    
      cy.contains('blog with the second most likes').parent().find('.buttonShowHide').click()
      cy.get('.buttonLike')
      .click()
      .wait(1000)
      .click()
      .wait(1000)
      cy.contains('blog with the second most likes').parent().find('.buttonShowHide').click()
      
      cy.contains('blog with the least likes').parent().find('.buttonShowHide').click()
      cy.get('.buttonLike')
      .click()
      .wait(1000)
      cy.contains('blog with the least likes').parent().find('.buttonShowHide').click()
      
      cy.get('.blog').eq(0).should('contain', 'blog with the most likes')
      cy.get('.blog').eq(1).should('contain', 'blog with the second most likes')
      cy.get('.blog').eq(2).should('contain', 'blog with the least likes')
     })
    
  })


})


