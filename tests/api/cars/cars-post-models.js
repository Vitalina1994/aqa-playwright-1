import {USERS} from '../../../src/data/dict/users.js'
import {expect} from '@playwright/test'
import {test} from '../../../src/fixtures/test.fixture.js'
import CreateCarModel from '../../../src/models/cars/createCarModel.js'

test.describe('Positive: cars post requests', () => {
    let client
    let carId

    test.beforeEach(async ({clientWithUser}) => {
        client = await clientWithUser({
            email: USERS.VITALINA_TEST.email,
            password: USERS.VITALINA_TEST.password
        });
    })

    test.afterEach(async ()=> {
        await client.cars.deleteCarById(carId)
    } )

    test('Should create new car', async()=> {
        const createCarModel = new CreateCarModel({
            carBrandId: 1,
            carModelId: 1,
            mileage: 0
        })
        const response = await client.cars.createNewCar(createCarModel)
        const body = response.data
        carId = body.data.id

        expect(response.status, 'Status code should be 201').toEqual(201)
        expect(body.status).toBe('ok')
        expect(body.data, 'Car should be created with data from request').toMatchObject(createCarModel)
    })
})

test.describe('Negative: cars post requests', () =>{
    let client

    test.beforeEach(async ({clientWithUser}) => {
        client = await clientWithUser({
            email: USERS.VITALINA_TEST.email,
            password: USERS.VITALINA_TEST.password
        });
    })
    test('Should not create a user without a model', async()=> {
        const createCarModel = new CreateCarModel({
            carBrandId: 1,
            carModelId: "",
            mileage: 0
        })
        const response = await client.cars.createNewCar(createCarModel)
        const body = response.data

        expect(response.status, 'Status code should be 400').toEqual(400)
        expect(body.message,'Body should contain clear error message').toContain('Invalid car model type')
    })
})
