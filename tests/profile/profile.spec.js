import {expect} from '@playwright/test'
import {CUSTOM_PROFILE_RESPONSE_BODY } from './fixtures/profileData'
import {test} from '../../src/fixtures/test.fixture'

test.describe('Profile page', ()=>{
    test('Frontend should show correct lastname in response', async ({userProfilePage})=>{
        const {page} = userProfilePage
        await page.route('/api/users/profile', async route => {
            route.fulfill({body: JSON.stringify(CUSTOM_PROFILE_RESPONSE_BODY)})
        })
        // await page.pause()
        await page.reload()
        // await page.pause()
        await expect(userProfilePage.userName).toHaveText(`${CUSTOM_PROFILE_RESPONSE_BODY.data.name} ${CUSTOM_PROFILE_RESPONSE_BODY.data.lastName}`)
    })
})
