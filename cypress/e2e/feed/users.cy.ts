/// <reference types="cypress" />

describe('users', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/users')
  })

  it('displays users page', () => {
    cy.get('ul div').should('have.length', 10)
    cy.get('ul div').first().within(() => {
      cy.get('p').eq(0).should('contain.text', 'Leanne Graham')
      cy.get('p').eq(1).should('contain.text', 'Website: hildegard.org')
      cy.get('p').eq(2).should('contain.text', 'Email: Sincere@april.biz')
      cy.get('p').eq(3).should('contain.text', 'Phone: 1-770-736-8031 x56442')
    })
  })
})