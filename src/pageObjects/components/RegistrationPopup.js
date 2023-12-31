import BaseComponent from '../BaseComponent.js'
import {expect} from '@playwright/test'

export default class RegistrationPopup extends BaseComponent {

    constructor(page) {
        super(page, page.locator('div.modal-dialog'))
        this.nameInput = this._container.locator('input#signupName')
        this.lastNameInput = this._container.locator('input#signupLastName')
        this.emailInput = this._container.locator('input#signupEmail')
        this.passwordInput = this._container.locator('input#signupPassword')
        this.reenterPasswordInput = this._container.locator('input#signupRepeatPassword')
        this.registerButton = this._container.locator('.btn-primary')
        this.errorMessage = this._container.locator('.invalid-feedback')
    }

    async createAccount({name, lastName, email, password, reenterPassword}){
        await this.fillSignupForm({name, lastName, email, password, reenterPassword})
        await this.registerButton.click()
        await expect(this._page).toHaveURL('https://qauto.forstudy.space/panel/garage')
    }

    async fillSignupForm({name, lastName, email, password, reenterPassword}){
        await this.nameInput.fill(name)
        await this.lastNameInput.fill(lastName)
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.reenterPasswordInput.fill(reenterPassword)
        await this.reenterPasswordInput.blur()
    }

}
