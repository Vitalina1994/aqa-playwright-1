import {test} from '../../../src/fixtures/test.fixture.js'
import {USERS} from '../../../src/data/dict/users.js'
import {expect} from '@playwright/test'
import UpdateCarModel from '../../../src/models/cars/updateCarModel.js'

test.describe('Positive: update cars put requests', () => {
    let client
    let carId

    test.beforeEach(async ({clientWithUser}) => {
        client = await clientWithUser({
            email: USERS.VITALINA_TEST.email,
            password: USERS.VITALINA_TEST.password
        })
        const updateCarModel = new UpdateCarModel({
            carBrandId: 1,
            carModelId: 1,
            mileage: 0
        })
        const response = await client.cars.createNewCar(updateCarModel)
        const body = response.data
        carId = body.data.id
    })

    test.afterEach(async ()=>{
        await client.cars.deleteCarById(carId)
    } )

    test('Should update car data', async()=> {
        const updateCarModel = new UpdateCarModel({
            carBrandId: 1,
            carModelId: 1,
            mileage: 999999
        })
        const response = await client.cars.updateUserCarById(carId, updateCarModel)
        const body = response.data

        expect(response.status, 'Status code should be 200').toEqual(200)
        expect(body.status).toBe('ok')
        expect(body.data, 'Car should be update with data from request').toMatchObject(updateCarModel)
    })
})

test.describe('Negative: update cars with invalid request', ()=> {
    let client
    let carId

    test.beforeEach(async ({clientWithUser}) => {
        client = await clientWithUser({
            email: USERS.VITALINA_TEST.email,
            password: USERS.VITALINA_TEST.password
        })
        const updateCarModel = new UpdateCarModel({
            carBrandId: 1,
            carModelId: 1,
            mileage: 0
        })
        const response = await client.cars.createNewCar(updateCarModel)
        const body = response.data
        carId = body.data.id
    })

    test.afterEach(async ()=>{
        await client.cars.deleteCarById(carId)
    } )

    test('Should not update car with invalid mileage', async()=> {
        test.fail('Comment: Need to fix validation for Mileage field')

        const updateCarModel = new UpdateCarModel({
            carBrandId: 1,
            carModelId: 1,
            mileage: 10000000000000
        })
        const response = await client.cars.updateUserCarById(carId, updateCarModel)
        const body = response.data

        expect(response.status, 'Status code should be 400').toEqual(400)
        expect(body.message,'Body should contain clear error message').toContain('Invalid mileage')
    })
})
