import {expect} from '@playwright/test'
import {VALID_BRAND_MODELS} from '../../../src/data/dict/models.js'
import {VALID_BRANDS_RESPONSE_BODY} from '../../../src/data/dict/brands.js'
import {test} from '../../../src/fixtures/test.fixture.js'

test.describe('API test for Cars page', ()=>{
    test('Should create a new car', async({userAPIClient})=>{
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[1].id
        const modelId = VALID_BRAND_MODELS[brandId].data[1].id

        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 5000
        }

        const response = await userAPIClient.post('/api/cars', {
            data:requestBody
        })
        const body = await response.json()
        await expect(response, 'Positive response should be returned').toBeOK()

        expect(response.status(), 'Status code should be 200').toEqual(201)
        expect(body.status).toBe('ok')
        expect(body.data, 'Car should be created with data from request').toMatchObject(requestBody)

        // console.log(requestBody)
        // console.log(body)
    })

    test('Should give correct response for empty body', async({userAPIClient})=>{
        const badRequest = {
            "status": "error",
            "message": "Car brand id is required"
        }

        const requestBody = {}

        const response = await userAPIClient.post('/api/cars', {
            data:requestBody
        })
        const body = await response.json()

        // console.log(body)

        expect(response.status(), '400 response should be returned').toEqual(400)
        expect(body, 'Server should give correct response').toMatchObject(badRequest)
    })

    test('Should give correct response for invalid modelId', async({userAPIClient})=>{
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[3].id
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

        const response = await userAPIClient.post('/api/cars', {
            data:requestBody
        })
        const body = await response.json()

        // console.log(body)

        expect(response.status(), '400 response should be returned').toEqual(400)
        expect(body, 'Server should give correct response').toMatchObject(badRequest)
    })

    test('Should give correct response for incorrect mileage', async({userAPIClient})=>{
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[2].id
        const modelId = VALID_BRAND_MODELS[brandId].data[2].id
        const badRequest = {
            "status": "error",
            "message": "Invalid mileage type"
        }

        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": "test miles"
        }

        const response = await userAPIClient.post('/api/cars', {
            data:requestBody
        })
        const body = await response.json()

        // console.log(body)

        expect(response.status(), '400 response should be returned').toEqual(400)
        expect(body, 'Server should give correct response').toMatchObject(badRequest)
    })
})
