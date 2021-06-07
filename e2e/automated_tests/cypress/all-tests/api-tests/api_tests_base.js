/// <reference types="Cypress" />
import '../../support/commands'

describe('Check API call with valid required parameters', () => {

    it('Validate status code', () => {
        cy.request({
            method: 'GET',
            url: '/',
            failOnStatusCode:false
        }).then((response) => {
                        expect(response.status).to.eq(200)
                        expect(response.headers['content-type']).to.contain('application/json')
                        expect(response.body).to.not.be.null
              })
    })

});
