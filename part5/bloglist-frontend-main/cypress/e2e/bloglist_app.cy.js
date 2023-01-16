describe('Bloglist app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:8080')
    cy.contains('login')
  })
})

it('login form is shown', function() {
})