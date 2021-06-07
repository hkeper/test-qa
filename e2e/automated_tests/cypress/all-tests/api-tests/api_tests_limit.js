/// <reference types="Cypress" />
import '../../support/commands'
import {
    CHARS,
    LIMIT_DEFAULT, LIMIT_MAX,
    LIMIT_MIN, LIMIT_MIN_OBJ, OBJECTS_MAX,
    OUT_OF_RANGE,
    SPECIAL_CHAR,
    ZERO
} from "../../testing-data/data";

let negative_data = [{value: ZERO}, {value: OUT_OF_RANGE}, {value: SPECIAL_CHAR}, {value: CHARS}]

describe('Check API call with optional parameter limit', () => {

    it('Checking API call with min limit', () => {
        cy.request({
            method: 'GET',
            url: '/',
            qs:{limit:LIMIT_MIN},
            failOnStatusCode:false
        }).then((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.headers['content-type']).to.contain('application/json')
                        expect(response.body).to.not.be.null
                        expect(response.body.length).equals(1, 'Number of Objects in the response')
                        expect(response.body[0]).to.have.property('id', LIMIT_MIN_OBJ);
              })
    })

    it('Checking API call with max limit', () => {
        cy.request({
            method: 'GET',
            url: '/',
            qs:{limit:LIMIT_MAX},
            failOnStatusCode:false
        }).then((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.headers['content-type']).to.contain('application/json')
                        expect(response.body).to.not.be.null
                        expect(response.body.length).equals(OBJECTS_MAX, 'Number of Objects in the response')
                        cy.fixture('max_objects').then(resp => {
                            response.body.forEach((dataSet, index) => {
                                expect(response.body[index]).to.have.property('id', resp[index].id)
                                expect(response.body[index]).to.have.property('name', resp[index].name)
                                expect(response.body[index]).to.have.property('url', resp[index].url)
                            })
                        })
              })
    })

    it('Checking API call with invalid limit', () => {

        negative_data.forEach((dataSet, index) => {
            cy.request({
                method: 'GET',
                url: '/',
                qs: {limit: dataSet.value},
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
