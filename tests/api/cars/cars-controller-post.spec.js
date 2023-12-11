import {test} from '../../../src/fixtures/test.fixture.js'
import {USERS} from '../../../src/data/dict/users'
import {DATA_CARS, DATA_CARS_INVALID} from '../fixtures/carData'
import {expect} from '@playwright/test'

test.describe('Positive: cars post requests', () => {
    let client
    let carId

    test.beforeEach(async ({clientWithUser}) => {
        client = await clientWithUser({
            email: USERS.VITALINA_TEST.email,
            password: USERS.VITALINA_TEST.password
        })
    })

    test.afterEach(async ()=> {
        await client.cars.deleteCarById(carId)
    } )

    test('Should create new car', async()=> {
        const response = await client.cars.createNewCar(DATA_CARS.carWithZeroMileage)
        const body = response.data
        carId = body.data.id

        expect(response.status, 'Status code should be 201').toEqual(201)
        expect(body.status).toBe('ok')
        expect(body.data, 'Car should be created with data from request').toMatchObject(DATA_CARS.carWithZeroMileage)
    })
})

test.describe('Negative: cars post requests', () => {
    let client

    test.beforeEach(async ({clientWithUser}) => {
        client = await clientWithUser({
            email: USERS.VITALINA_TEST.email,
            password: USERS.VITALINA_TEST.password
        })
    })

    test('Should not create a car without model', async()=> {
        const response = await client.cars.createNewCar(DATA_CARS_INVALID.carWithNoModel)
        const body = response.data

        expect(response.status, 'Status code should be 400').toEqual(400)
        expect(body.message,'Body should contain valid error message').toContain('Invalid car model type')
    })
})
