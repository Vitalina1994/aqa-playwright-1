import {expect} from '@playwright/test'
import {BRANDS_MODELS} from '../../../src/data/dict/models.js'
import {BRANDS_RESPONSE_BODY} from '../../../src/data/dict/brands.js'
import {test} from '../../../src/fixtures/test.fixture.js'
import axios from 'axios'
import {USERS} from '../../../src/data/dict/users.js'
import {config} from '../../../config/config'
test.describe('API tests for Cars page', ()=> {
    let client

    test.beforeAll(async()=>{
    client = axios.create({
        baseURL: config.apiURL
    })
        const responseLogin = await client.post('auth/signin', {
            email: USERS.VITALINA_TEST.email,
            password: USERS.VITALINA_TEST.password,
            remember: false
        })
         console.log(responseLogin)
        const cookie = responseLogin.headers["set-cookie"][0].split(";")
        client = axios.create({
            baseURL: config.apiURL,
            headers: {
                cookie
            },
            validateStatus: status => {
                return status < 501
            }
        })
    })
    test('Should create a new car', async({userAPIClient})=> {
        const brandId = BRANDS_RESPONSE_BODY.data[1].id
        const modelId = BRANDS_MODELS[brandId].data[1].id

        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 5000
        }

        const response = await client.post('/cars', requestBody)
        expect(response.status, "Status code should be 200").toEqual(201)
        expect(response.data.status).toBe("ok")
        expect(response.data.data, "Car should be created with data from request").toMatchObject(requestBody)
    })

    test('Should give correct response for empty body', async({userAPIClient})=>{
        const badRequest = {
            "status": "error",
            "message": "Car brand id is required"
        }

        const requestBody = {}
        const response = await client.post('/cars', requestBody)

        expect(response.status, '400 response should be returned').toEqual(400)
        expect(response.data, 'Server should give correct response').toMatchObject(badRequest)
    })

    test('Should give correct response for invalid modelId', async({userAPIClient})=>{
        const brandId = BRANDS_RESPONSE_BODY.data[3].id
        const modelId = 'TestModel'
        const badRequest = {
            "status": "error",
            "message": "Invalid car model type"
        }

        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 5000
        }

        const response = await client.post('/cars', requestBody)

        expect(response.status, '400 response should be returned').toEqual(400)
        expect(response.data, 'Server should give correct response').toMatchObject(badRequest)
    })

    test('Should give correct response for incorrect mileage', async({userAPIClient})=>{
        const brandId = BRANDS_RESPONSE_BODY.data[2].id
        const modelId = BRANDS_MODELS[brandId].data[2].id
        const badRequest = {
            "status": "error",
            "message": "Invalid mileage type"
        }

        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": "test miles"
        }

        const response = await client.post('/cars', requestBody)

        expect(response.status, '400 response should be returned').toEqual(400)
        expect(response.data, 'Server should give correct response').toMatchObject(badRequest)
    })
})
