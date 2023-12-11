import {expect} from '@playwright/test'
import {INVALID_USER_CAR_ID, DATA_CARS} from '../fixtures/carData'
import {USERS} from '../../../src/data/dict/users'
import {test} from '../../../src/fixtures/test.fixture'

test.describe('Positive: Successful delete car request', ()=> {
    let client
    let carId

    test.beforeEach(async({clientWithUser})=> {
        client = await clientWithUser({
            email: USERS.VITALINA_TEST.email,
            password: USERS.VITALINA_TEST.password
        })
        const response = await client.cars.createNewCar(DATA_CARS.carWithZeroMileage)
        const body = response.data
        carId = body.data.id
    })

    test('Should delete car', async()=> {
        const response = await client.cars.deleteCarById(carId)
        const body = response.data

        expect(response.status, 'Status code should be 200').toEqual(200)
        expect(body.status).toBe('ok')
        expect(body.data.carId, 'Car should be created with data from request').toEqual(carId)
    })
})

test.describe('Negative: Delete car with invalid car id', ()=> {
    let client

    test.beforeEach(async({clientWithUser})=>{
        client = await clientWithUser({
            email: USERS.VITALINA_TEST.email,
            password: USERS.VITALINA_TEST.password
        })
    })

    test('Should not delete car with invalid id', async()=> {
        const response = await client.cars.deleteCarById(INVALID_USER_CAR_ID)
        const body = response.data

        expect(response.status, 'Status code should be 404').toEqual(404)
        expect(body.message,'Body should contain clear error message').toContain('Car not found')
    })
})
