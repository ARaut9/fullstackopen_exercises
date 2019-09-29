describe('Blog App ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Arto Hellas',
      username: 'hellas',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Frontpage can be opened', function () {
    cy.contains('Login to the application')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('[data-cy=username]')
        .type('hellas')
      cy.get('[data-cy=password]')
        .type('sekret')
      cy.get('[data-cy=login]')
        .click()
    })

    it('name of the user is shown', function () {
      cy.contains('Arto Hellas logged in')
    })

    describe('database mutation', function () {
      beforeEach(function () {
        cy.get('[data-cy=new-blog]')
          .click()
        cy.get('[data-cy=title]')
          .type('Cypress best practices')
        cy.get('[data-cy=author]')
          .type('john doe')
        cy.get('[data-cy=url]')
          .type('https://docs.cypress.io/guides/references/best-practices.html')
        cy.get('[data-cy=add-blog]')
          .click()
      })

      it('a new blog is created', function () {
        cy.contains('Cypress best practices')
      })

      it('a blog can be liked', function () {
        cy.get('.blog-title')
          .click()
        cy.get('[data-cy=like]')
          .click()
        cy.contains('1 likes')
      })

      it('a blog can be deleted', function () {
        cy.get('.blog-title')
          .click()
        cy.get('[data-cy=delete]')
          .click()
        cy.contains('deleted')
      })

      it('a comment can be added', function () {
        cy.get('.blog-title')
          .click()
        cy.get('[data-cy=comment]')
          .type('nice')
        cy.get('[data-cy=add-comment]')
          .click()
        cy.contains('nice')
      })
    })
  })
})