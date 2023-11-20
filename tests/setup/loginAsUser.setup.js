import {USERS} from '../../src/data/dict/users'
import {test} from '../../src/fixtures/test.fixture'
import WelcomePage from '../../src/pageObjects/welcomePage/WelcomePage'
import {STORAGE_STATE_USER_PATH} from '../../src/data/storageState'

test('Login as new user and save storage state', async ({page, context})=> {
    const welcomePage = new WelcomePage(page)
    await welcomePage.navigate()
    const popup = await welcomePage.openSignInPopup()

    await popup.login({
        email: USERS.VITALINA_TEST.email,
        password: USERS.VITALINA_TEST.password
    })
    await context.storageState({
        path: STORAGE_STATE_USER_PATH
    })
})
