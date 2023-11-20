import BasePage from '../BasePage.js'
import {expect} from '@playwright/test'
import RegistrationPopup from '../components/RegistrationPopup.js'
import SignInPopup from '../components/SignInPopup.js'

export default class WelcomePage extends BasePage {
    constructor(page) {
        super(page, '/', page.locator('button', {hasText: 'Guest log in'}))
        this.signUpButton = this._page.locator('button:text("Sign up")')
        this.signInButton = this._page.locator('.header_signin')
    }

    async openRegistrationPopup(){
        await expect(this.signUpButton, 'Registration button should be visible').toBeVisible()
        await this.signUpButton.click()

        return new RegistrationPopup(this._page)
    }

    async openSignInPopup(){
        await expect(this.signInButton, 'Login button should be visible').toBeVisible()
        await this.signInButton.click()

        return new SignInPopup(this._page)
    }
}
