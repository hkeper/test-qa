/// <reference types="Cypress" />
import '../../support/commands'
import {
    CHARS, LAST_PAGE_OBJ_ID,
    LIMIT_DEFAULT,
    OUT_OF_RANGE,
    PAGE_MAX,
    PAGE_MIN,
    SPECIAL_CHAR,
    ZERO
} from "../../testing-data/data";

let negative_data = [{value: ZERO}, {value: OUT_OF_RANGE}, {value: SPECIAL_CHAR}, {value: CHARS}]

describe('Check API call with optional parameter page', () => {

    it('Checking API call for the first page', () => {
        cy.request({
            method: 'GET',
            url: '/',
            qs:{page:PAGE_MIN},
            failOnStatusCode:false
        }).then((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.headers['content-type']).to.contain('application/json')
                        expect(response.body).to.not.be.null
                        expect(response.body.length).equals(LIMIT_DEFAULT, 'Number of Objects in the response')
                        cy.fixture('first_page_response').then(resp => {
                            response.body.forEach((dataSet, index) => {
                                expect(response.body[index]).to.have.property('id', resp[index].id)
                                expect(response.body[index]).to.have.property('name', resp[index].name)
                                expect(response.body[index]).to.have.property('url', resp[index].url)
                            })
                        })
              })
    })

    it('Checking API call for the last page', () => {
        cy.request({
            method: 'GET',
            url: '/',
            qs:{page:PAGE_MAX},
            failOnStatusCode:false
        }).then((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.headers['content-type']).to.contain('application/json')
                        expect(response.body).to.not.be.null
                        expect(response.body.length).equals(1, 'Number of Objects in the response')
                        expect(response.body[0]).to.have.property('id', LAST_PAGE_OBJ_ID);
              })
    })

    it('Checking API call for the invalid pages', () => {

        negative_data.forEach((dataSet, index) => {
            cy.request({
                method: 'GET',
                url: '/',
                qs: {page: dataSet.value},
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
