import BasePage from '../BasePage.js'
import {expect} from '@playwright/test'
import RegistrationPopup from '../components/RegistrationPopup.js'

export default class WelcomePage extends BasePage {
    constructor(page) {
        super(page, '/', page.locator('button', {hasText: 'Guest log in'}))
        this.signUpButton = this._page.locator('button:text("Sign up")')
    }

    async openSignupPopup(){
        await expect(this.signUpButton, 'Registration link should be visible').toBeVisible()
        await this.signUpButton.click()

        return new RegistrationPopup(this._page)
    }
}
