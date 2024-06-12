/// <reference types="cypress" />

describe('nav-bar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('navigates to feed page', () => {
    cy.contains('nav a', 'Feed').click()
    cy.url().should('contain', '/feed')
    cy.get('.feed-page').should('exist')
  })

  it('navigates to users page', () => {
    cy.contains('nav a', 'Users').click()
    cy.url().should('contain', '/users')
    cy.get('.users-page').should('exist')
  })

  it('displays for small viewport', () => {
    cy.viewport(639, 800)
    cy.get('nav div.menu').should('not.be.visible')
    cy.get('nav div.mobile-nav').should('be.visible')
    cy.get('nav button').click()
    cy.contains('nav div.mobile-menu a', 'Feed').should('exist')
    cy.contains('nav div.mobile-menu a', 'Users').should('exist')
    cy.contains('nav span', 'FACEIT').click()
    cy.contains('nav div.mobile-menu a', 'Feed').should('not.exist')
    cy.contains('nav div.mobile-menu a', 'Users').should('not.exist')
  })

  it('displays for larger viewport', () => {
    cy.viewport(640, 800)
    cy.get('nav div.menu').should('be.visible')
    cy.get('nav div.mobile-nav').should('not.be.visible')
    cy.contains('nav div.mobile-menu a', 'Feed').should('not.exist')
    cy.contains('nav div.mobile-menu a', 'Users').should('not.exist')
  })
})