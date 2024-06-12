/// <reference types="cypress" />

describe('feed', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/feed')
  })

  it('displays 20 posts', () => {
    cy.get('.feed-page a').should('have.length', 20)
    cy.get('.feed-page p').first().should('contain.text', 'cupiditate quo est')
    cy.get('.feed-page p').last().should('contain.text', 'facere qui nesciunt est')
  })

  it('displays post item info', () => {
    cy.get('.feed-page a').first().should('have.attr', 'href', '/post?id=100')
    cy.get('.feed-page img').first().should('exist')
    cy.get('.feed-page p').first().should('contain.text', 'cupiditate quo est a modi nesciunt soluta')
    cy.get('.feed-page span').first().should('contain.text', 'Clementina DuBuque')
    cy.get('.feed-page time').first().should('contain.text', 'Long time ago')
  })

  it('highlights new post item for 3 seconds', () => {
    cy.contains('button', 'new post').click()
    cy.contains('div', 'New post received').should('exist')
    cy.contains('p', 'This is a new post 101').should('exist')
    cy.get('a.animate-background-pulse').should('exist')
    cy.wait(3000)
    cy.contains('div', 'New post received').should('not.exist')
    cy.get('a.animate-background-pulse').should('not.exist')
  })

  it('navigates between post page and feed page', () => {
    cy.get('.feed-page a').first().click()
    cy.url().should('contain', '/post?id=100')
    cy.get('img').should('exist')
    cy.get('h2').should('contain.text', 'at nam consequatur ea labore ea harum')
    cy.get('p').should('contain.text', 'cupiditate quo est a modi nesciunt soluta')
    cy.get('a svg').click()
    cy.url().should('contain', '/feed')
    cy.get('.feed-page').should('exist')
  })

  it('displays more posts when scroll to the last one', () => {
    cy.get('.feed-page ul').scrollTo('bottom')
    cy.get('.feed-page a').should('have.length', 40)
  })
})
