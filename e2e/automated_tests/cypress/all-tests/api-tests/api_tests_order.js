/// <reference types="Cypress" />
import '../../support/commands'
import {
    CHARS,
    LIMIT_DEFAULT, LIMIT_MAX,
    LIMIT_MIN, OBJECTS_MAX,
    OUT_OF_RANGE,
    PAGE_MAX,
    PAGE_MIN,
    SPECIAL_CHAR,
    ZERO
} from "../../testing-data/data";

let negative_data = [{value: ZERO}, {value: OUT_OF_RANGE}, {value: SPECIAL_CHAR}, {value: CHARS}]

describe('Check API call with optional parameter order', () => {

    it('Checking API call with asc order', () => {
        cy.request({
            method: 'GET',
            url: '/',
            qs:{order:'asc'},
            failOnStatusCode:false
        }).then((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.headers['content-type']).to.contain('application/json')
                        expect(response.body).to.not.be.null
                        expect(response.body.length).equals(LIMIT_DEFAULT, 'Number of Objects in the response')
                        cy.fixture('first_page_response').then(resp => {
                            response.body.forEach((dataSet, index) => {
                                expect(response.body[index]).to.have.property('id', resp[((resp.length-index)-1)].id)
                            })
                        })
              })
    })

    it('Checking API call with desc order', () => {
        cy.request({
            method: 'GET',
            url: '/',
            qs:{order:'desc'},
            failOnStatusCode:false
        }).then((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.headers['content-type']).to.contain('application/json')
                        expect(response.body).to.not.be.null
                        expect(response.body.length).equals(LIMIT_DEFAULT, 'Number of Objects in the response')
                        cy.fixture('first_page_response').then(resp => {
                            response.body.forEach((dataSet, index) => {
                                expect(response.body[index]).to.have.property('id', resp[index].id)
                            })
                        })
              })
    })

    it('Checking API call with invalid order', () => {

        negative_data.forEach((dataSet, index) => {
            cy.request({
                method: 'GET',
                url: '/',
                qs: {order: dataSet.value},
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.headers['content-type']).to.contain('application/json')
                expect(response.body).to.not.be.null
                expect(response.body.length).equals(0, 'Number of Objects in the response')
                })
        })
    })

});
