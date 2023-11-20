import {expect} from '@playwright/test'
import {test} from '../../src/fixtures/test.fixture'

test.describe('Garage page', ()=>{
    test('User\s car is BMX X5', async({userGaragePage})=>{
        await expect(userGaragePage.firstCarName).toContainText('BMW X5')
    })
})
