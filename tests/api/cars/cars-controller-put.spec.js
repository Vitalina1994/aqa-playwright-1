import {test} from '../../../src/fixtures/test.fixture'
import {DATA_CARS, DATA_CARS_INVALID} from '../fixtures/carData'
import {USERS} from '../../../src/data/dict/users'
import {expect} from '@playwright/test'

test.describe('Positive: cars put requests', () => {
    let client
    let carId

    test.beforeEach(async ({clientWithUser}) => {
        client = await clientWithUser({
            email: USERS.VITALINA_TEST.email,
            password: USERS.VITALINA_TEST.password
        })
        const response = await client.cars.createNewCar(DATA_CARS.carWithZeroMileage)
        const body = response.data
        carId = body.data.id
    })

    test.afterEach(async ()=> {
        await client.cars.deleteCarById(carId)
    } )

    test('Should update car information', async()=> {
        const response = await client.cars.updateUserCarById(carId, DATA_CARS.carWithBigMileage)
        const body = response.data

        expect(response.status, 'Status code should be 200').toEqual(200)
        expect(body.status).toBe('ok')
        expect(body.data, 'Car should be update with data from request').toMatchObject(DATA_CARS.carWithBigMileage)
    })
})

test.describe('Negative: Cars Invalid request', ()=> {
    let client
    let carId

    test.beforeEach(async ({clientWithUser}) => {
        client = await clientWithUser({
            email: USERS.VITALINA_TEST.email,
            password: USERS.VITALINA_TEST.password
        })
        const response = await client.cars.createNewCar(DATA_CARS.carWithZeroMileage)
        const body = response.data
        carId = body.data.id
    })

    test.afterEach(async ()=> {
        await client.cars.deleteCarById(carId)
    } )

    test('Should not update car with invalid mileage', async()=> {
        test.fail('Comment: Need to fix validation for Mileage field')

        const response = await client.cars.updateUserCarById(carId, DATA_CARS_INVALID.carWithInvalidMileage)
        const body = response.data

        expect(response.status, 'Status code should be 400').toEqual(400)
        expect(body.message,'Body should contain clear error message').toContain('Invalid mileage')
    })
})
