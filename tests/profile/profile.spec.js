import {expect} from '@playwright/test'
import {TEST_PROFILE_RESPONSE_BODY } from './fixtures/profileData'
import {test} from '../../src/fixtures/test.fixture'

test.describe('Profile page', ()=>{
    test('Frontend should show correct lastname in response', async ({userProfilePage})=>{
        const {page} = userProfilePage
        await page.route('/api/users/profile', async route => {
            route.fulfill({body: JSON.stringify(TEST_PROFILE_RESPONSE_BODY)})
        })
        // await page.pause()
        await page.reload()
        // await page.pause()
        await expect(userProfilePage.userName).toHaveText(`${TEST_PROFILE_RESPONSE_BODY.data.name} ${TEST_PROFILE_RESPONSE_BODY.data.lastName}`)
    })
})
