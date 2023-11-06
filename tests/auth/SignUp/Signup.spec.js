import {faker} from '@faker-js/faker'
import {expect, test} from "@playwright/test";

test.describe('Registration popup validation for first name field', ()=> {
    test('Should be error message when first name field is empty', async ({page}) => {
        const firstNameValue = ''
        const lastNameValue = faker.person.lastName()
        const emailValue = faker.internet.email({firstName: 'aqa-'})
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, 'Sign up button should be visible').toBeVisible()
        await signUpButton.click()

        const registrationPopup = page.locator('div.modal-dialog')
        await expect(registrationPopup, 'Registration popup should be visible').toBeVisible()

        const nameFieldInput = registrationPopup.locator('input#signupName')
        const lastNameFieldInput = registrationPopup.locator('input#signupLastName')
        const emailFieldInput = registrationPopup.locator('input#signupEmail')
        const passwordFieldInput = registrationPopup.locator('input#signupPassword')
        const reenterPasswordFieldInput = registrationPopup.locator('input#signupRepeatPassword')
        const registerButton = registrationPopup.locator('.btn-primary')

        await nameFieldInput.fill(firstNameValue)
        await lastNameFieldInput.fill(lastNameValue)
        await emailFieldInput.fill(emailValue)
        await passwordFieldInput.fill(passwordValue)
        await reenterPasswordFieldInput.fill(passwordValue)
        await expect(registerButton, 'Register button should be disabled').toBeDisabled()

        const firstNameErrorMessage = registrationPopup.locator('div.invalid-feedback')
        await expect(firstNameErrorMessage, 'Error message should visible when user has entered an empty name value')
            .toHaveText('Name required')
        await expect(nameFieldInput, 'First name input should have red border when user has entered an empty value')
            .toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })

    test('Should be error message when first name field is invalid', async ({page}) => {
        const firstNameValue = 'blaYT$%^&*('
        const lastNameValue = faker.person.lastName()
        const emailValue = faker.internet.email({firstName: 'aqa-'})
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, 'Sign up button should be visible').toBeVisible()
        await signUpButton.click()

        const registrationPopup = page.locator('div.modal-dialog')
        await expect(registrationPopup, "Registration popup should be visible").toBeVisible()

        const nameFieldInput = registrationPopup.locator('input#signupName')
        const lastNameFieldInput = registrationPopup.locator('input#signupLastName')
        const emailFieldInput = registrationPopup.locator('input#signupEmail')
        const passwordFieldInput = registrationPopup.locator('input#signupPassword')
        const reenterPasswordFieldInput = registrationPopup.locator('input#signupRepeatPassword')
        const registerButton = registrationPopup.locator('.btn-primary')

        await nameFieldInput.fill(firstNameValue)
        await lastNameFieldInput.fill(lastNameValue)
        await emailFieldInput.fill(emailValue)
        await passwordFieldInput.fill(passwordValue)
        await reenterPasswordFieldInput.fill(passwordValue)
        await expect(registerButton, 'Register button should be disabled').toBeDisabled()

        const firstNameErrorMessage = registrationPopup.locator('div.invalid-feedback')
        await expect(firstNameErrorMessage, 'Error message should visible when user has entered invalid value')
            .toHaveText('Name is invalid')
        await expect(nameFieldInput, 'First name input should have red border when user has entered an invalid name')
            .toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })

    test('Should be error message when first name field is longer than 20 characters', async ({page}) => {
        const firstNameValue = faker.string.fromCharacters('abc', {min: 21, max: 25})
        const lastNameValue = faker.person.lastName()
        const emailValue = faker.internet.email({firstName: 'aqa-'})
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, 'Sign up button should be visible').toBeVisible()
        await signUpButton.click()

        const registrationPopup = page.locator('div.modal-dialog')
        await expect(registrationPopup, 'Registration popup should be visible').toBeVisible()

        const nameFieldInput = registrationPopup.locator('input#signupName')
        const lastNameFieldInput = registrationPopup.locator('input#signupLastName')
        const emailFieldInput = registrationPopup.locator('input#signupEmail')
        const passwordFieldInput = registrationPopup.locator('input#signupPassword')
        const reenterPasswordFieldInput = registrationPopup.locator('input#signupRepeatPassword')
        const registerButton = registrationPopup.locator('.btn-primary')

        await nameFieldInput.fill(firstNameValue)
        await lastNameFieldInput.fill(lastNameValue)
        await emailFieldInput.fill(emailValue)
        await passwordFieldInput.fill(passwordValue)
        await reenterPasswordFieldInput.fill(passwordValue)
        await expect(registerButton, 'Register button should be disabled').toBeDisabled()

        const lastNameErrorMessage = registrationPopup.locator('div.invalid-feedback')
        await expect(lastNameErrorMessage, 'Error message should be visible when user has entered first name longer than 20 characters')
            .toHaveText('Name has to be from 2 to 20 characters long')
        await expect(lastNameFieldInput, 'Name input should have red border when user has entered first name longer than 20 characters')
            .toHaveCSS('border-color', 'rgb(206, 212, 218)')
    })

    test('Should be error message when first name field  is less than 2 characters', async ({page}) => {
        const firstNameValue = faker.person.firstName()
        const lastNameValue = faker.string.fromCharacters('abc', 1)
        const emailValue = faker.internet.email({firstName: 'aqa-'})
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, 'Sign up button should be displayed').toBeVisible()
        await signUpButton.click()

        const registrationPopup = page.locator('div.modal-dialog')
        await expect(registrationPopup, 'Registration popup should be visible').toBeVisible()

        const nameFieldInput = registrationPopup.locator('input#signupName')
        const lastNameFieldInput = registrationPopup.locator('input#signupLastName')
        const emailFieldInput = registrationPopup.locator('input#signupEmail')
        const passwordFieldInput = registrationPopup.locator('input#signupPassword')
        const reenterPasswordFieldInput = registrationPopup.locator('input#signupRepeatPassword')
        const registerButton = registrationPopup.locator('.btn-primary')

        await nameFieldInput.fill(firstNameValue)
        await lastNameFieldInput.fill(lastNameValue)
        await emailFieldInput.fill(emailValue)
        await passwordFieldInput.fill(passwordValue)
        await reenterPasswordFieldInput.fill(passwordValue)
        await expect(registerButton, 'Register button should be disabled').toBeDisabled()

        const lastNameErrorMessage = registrationPopup.locator('div.invalid-feedback')
        await expect(lastNameErrorMessage, 'Error message should be visible when user has entered last name longer than 20 characters')
            .toHaveText('Last name has to be from 2 to 20 characters long')
        await expect(lastNameFieldInput, 'Last name input should have red border when user has entered last name longer than 20 characters')
            .toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })
})

test.describe('Registration popup validation for last name field', ()=> {
    test('Should be error message when last name field is empty', async ({page}) => {
        const firstNameValue = faker.person.firstName()
        const lastNameValue = ''
        const emailValue = faker.internet.email({firstName: 'aqa-'})
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, 'Sign up button should be visible').toBeVisible()
        await signUpButton.click()

        const registrationPopup = page.locator('div.modal-dialog')
        await expect(registrationPopup, 'Registration popup should be visible').toBeVisible()

        const nameFieldInput = registrationPopup.locator('input#signupName')
        const lastNameFieldInput = registrationPopup.locator('input#signupLastName')
        const emailFieldInput = registrationPopup.locator('input#signupEmail')
        const passwordFieldInput = registrationPopup.locator('input#signupPassword')
        const reenterPasswordFieldInput = registrationPopup.locator('input#signupRepeatPassword')
        const registerButton = registrationPopup.locator('.btn-primary')

        await nameFieldInput.fill(firstNameValue)
        await lastNameFieldInput.fill(lastNameValue)
        await emailFieldInput.fill(emailValue)
        await passwordFieldInput.fill(passwordValue)
        await reenterPasswordFieldInput.fill(passwordValue)
        await expect(registerButton, 'Register button should be disabled').toBeDisabled()

        const firstNameErrorMessage = registrationPopup.locator('div.invalid-feedback')
        await expect(firstNameErrorMessage, 'Error message should visible when user has entered an empty last name value')
            .toHaveText('Last name required')
        await expect(nameFieldInput, 'Last name input should have red border when user has entered an empty value')
            .toHaveCSS('border-color', 'rgb(206, 212, 218)')
    })

    test('Should be error message when last name field is invalid', async ({page}) => {
        const firstNameValue = faker.person.firstName()
        const lastNameValue = 'Bla^&*()'
        const emailValue = faker.internet.email({firstName: 'aqa-'})
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, 'Sign up button should be visible').toBeVisible()
        await signUpButton.click()

        const registrationPopup = page.locator('div.modal-dialog')
        await expect(registrationPopup, "Registration popup should be visible").toBeVisible()

        const nameFieldInput = registrationPopup.locator('input#signupName')
        const lastNameFieldInput = registrationPopup.locator('input#signupLastName')
        const emailFieldInput = registrationPopup.locator('input#signupEmail')
        const passwordFieldInput = registrationPopup.locator('input#signupPassword')
        const reenterPasswordFieldInput = registrationPopup.locator('input#signupRepeatPassword')
        const registerButton = registrationPopup.locator('.btn-primary')

        await nameFieldInput.fill(firstNameValue)
        await lastNameFieldInput.fill(lastNameValue)
        await emailFieldInput.fill(emailValue)
        await passwordFieldInput.fill(passwordValue)
        await reenterPasswordFieldInput.fill(passwordValue)
        await expect(registerButton, 'Register button should be disabled').toBeDisabled()

        const firstNameErrorMessage = registrationPopup.locator('div.invalid-feedback')
        await expect(firstNameErrorMessage, 'Error message should visible when user has entered invalid last name value')
            .toHaveText('Last name is invalid')
        await expect(nameFieldInput, 'Last name input should have red border when user has entered an invalid value')
            .toHaveCSS('border-color', 'rgb(206, 212, 218)')
    })

    test('Should be error message when last name field is longer than 20 characters', async ({page}) => {
        const firstNameValue = faker.person.firstName()
        const lastNameValue = faker.string.fromCharacters('abc', {min: 21, max: 25})
        const emailValue = faker.internet.email({firstName: 'aqa-'})
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, 'Sign up button should be visible').toBeVisible()
        await signUpButton.click()

        const registrationPopup = page.locator('div.modal-dialog')
        await expect(registrationPopup, 'Registration popup should be visible').toBeVisible()

        const nameFieldInput = registrationPopup.locator('input#signupName')
        const lastNameFieldInput = registrationPopup.locator('input#signupLastName')
        const emailFieldInput = registrationPopup.locator('input#signupEmail')
        const passwordFieldInput = registrationPopup.locator('input#signupPassword')
        const reenterPasswordFieldInput = registrationPopup.locator('input#signupRepeatPassword')
        const registerButton = registrationPopup.locator('.btn-primary')

        await nameFieldInput.fill(firstNameValue)
        await lastNameFieldInput.fill(lastNameValue)
        await emailFieldInput.fill(emailValue)
        await passwordFieldInput.fill(passwordValue)
        await reenterPasswordFieldInput.fill(passwordValue)
        await expect(registerButton, 'Register button should be disabled').toBeDisabled()

        const lastNameErrorMessage = registrationPopup.locator('div.invalid-feedback')
        await expect(lastNameErrorMessage, 'Error message should be visiblw when user has entered lastname longer than 20 characters')
            .toHaveText('Last name has to be from 2 to 20 characters long')
        await expect(lastNameFieldInput, 'Last name input should have red border when user has entered lastname longer than 20 characters')
            .toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })

    test('Should be error message when last name field is less than 2 characters', async ({page}) => {
        const firstNameValue = faker.person.firstName()
        const lastNameValue = faker.string.fromCharacters('abc', 1)
        const emailValue = faker.internet.email({firstName: 'aqa-'})
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, 'Sign up button should be displayed').toBeVisible()
        await signUpButton.click()

        const registrationPopup = page.locator('div.modal-dialog')
        await expect(registrationPopup, 'Registration popup should be visible').toBeVisible()

        const nameFieldInput = registrationPopup.locator('input#signupName')
        const lastNameFieldInput = registrationPopup.locator('input#signupLastName')
        const emailFieldInput = registrationPopup.locator('input#signupEmail')
        const passwordFieldInput = registrationPopup.locator('input#signupPassword')
        const reenterPasswordFieldInput = registrationPopup.locator('input#signupRepeatPassword')
        const registerButton = registrationPopup.locator('.btn-primary')

        await nameFieldInput.fill(firstNameValue)
        await lastNameFieldInput.fill(lastNameValue)
        await emailFieldInput.fill(emailValue)
        await passwordFieldInput.fill(passwordValue)
        await reenterPasswordFieldInput.fill(passwordValue)
        await expect(registerButton, 'Register button should be disabled').toBeDisabled()

        const lastNameErrorMessage = registrationPopup.locator('div.invalid-feedback')
        await expect(lastNameErrorMessage, 'Error message should be visible when user has entered lastname longer than 20 characters')
            .toHaveText('Last name has to be from 2 to 20 characters long')
        await expect(lastNameFieldInput, 'Last name input should have red border when user has entered lastname longer than 20 characters')
            .toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })
})

test.describe('Registration popup validation for email field', ()=> {
    test('Should be error message when email field is invalid', async ({page}) => {
        const firstNameValue = faker.person.firstName()
        const lastNameValue = faker.person.lastName()
        const emailValue = faker.string.fromCharacters('abc', {min: 2, max: 25})
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, 'Sign up button should be displayed').toBeVisible()
        await signUpButton.click()

        const registrationPopup = page.locator('div.modal-dialog')
        await expect(registrationPopup, 'Registration popup should be visible').toBeVisible()

        const nameFieldInput = registrationPopup.locator('input#signupName')
        const lastNameFieldInput = registrationPopup.locator('input#signupLastName')
        const emailFieldInput = registrationPopup.locator('input#signupEmail')
        const passwordFieldInput = registrationPopup.locator('input#signupPassword')
        const reenterInput = registrationPopup.locator('input#signupRepeatPassword')
        const registerButton = registrationPopup.locator('.btn-primary')

        await nameFieldInput.fill(firstNameValue)
        await lastNameFieldInput.fill(lastNameValue)
        await emailFieldInput.fill(emailValue)
        await passwordFieldInput.fill(passwordValue)
        await reenterInput.fill(passwordValue)
        await expect(registerButton, 'Register button should be disabled').toBeDisabled()

        const emailErrorMessage = registrationPopup.locator('div.invalid-feedback')
        await expect(emailErrorMessage, 'Error message should be visible when user has entered invalid email')
            .toHaveText('Email is incorrect')
        await expect(emailFieldInput, 'Email input should have red border when user has entered invalid email')
            .toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })

    test('Should be error message when email field is empty', async ({page}) => {
        const firstNameValue = faker.person.firstName()
        const lastNameValue = faker.person.lastName()
        const emailValue = ''
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, 'Sign up button should be displayed').toBeVisible()
        await signUpButton.click()

        const registrationPopup = page.locator('div.modal-dialog')
        await expect(registrationPopup, 'Registration popup should be visible').toBeVisible()

        const nameFieldInput = registrationPopup.locator('input#signupName')
        const lastNameFieldInput = registrationPopup.locator('input#signupLastName')
        const emailFieldInput = registrationPopup.locator('input#signupEmail')
        const passwordFieldInput = registrationPopup.locator('input#signupPassword')
        const reenterInput = registrationPopup.locator('input#signupRepeatPassword')
        const registerButton = registrationPopup.locator('.btn-primary')

        await nameFieldInput.fill(firstNameValue)
        await lastNameFieldInput.fill(lastNameValue)
        await emailFieldInput.fill(emailValue)
        await passwordFieldInput.fill(passwordValue)
        await reenterInput.fill(passwordValue)
        await expect(registerButton, 'Register button should be disabled').toBeDisabled()

        const emailErrorMessage = registrationPopup.locator('div.invalid-feedback')
        await expect(emailErrorMessage, 'Error message should be visible when user has entered an empty email field')
            .toHaveText('Email required')
        await expect(emailFieldInput, 'Email input should have red border when user has entered an empty value')
            .toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })
})

test.describe('Registration popup validation for password field', ()=> {
    test('Should be error message when password field  is empty', async ({page}) => {
        const firstNameValue = faker.person.firstName()
        const lastNameValue = faker.person.lastName()
        const emailValue = faker.internet.email({firstName: 'aqa-'})
        const passwordValue = ''
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, 'Sign up button should be visible').toBeVisible()
        await signUpButton.click()

        const registrationPopup = page.locator('div.modal-dialog')
        await expect(registrationPopup, 'Registration popup should be visible').toBeVisible()

        const nameFieldInput = registrationPopup.locator('input#signupName')
        const lastNameFieldInput = registrationPopup.locator('input#signupLastName')
        const emailFieldInput = registrationPopup.locator('input#signupEmail')
        const passwordFieldInput = registrationPopup.locator('input#signupPassword')
        const reenterPasswordFieldInput = registrationPopup.locator('input#signupRepeatPassword')
        const registerButton = registrationPopup.locator('.btn-primary')

        await nameFieldInput.fill(firstNameValue)
        await lastNameFieldInput.fill(lastNameValue)
        await emailFieldInput.fill(emailValue)
        await passwordFieldInput.fill(passwordValue)
        await reenterPasswordFieldInput.fill(passwordValue)
        await expect(registerButton, 'Register button should be disabled').toBeDisabled()

        const firstNameErrorMessage = registrationPopup.locator('div.invalid-feedback')
        await expect(firstNameErrorMessage, 'Error message should visible when user has entered an empty password value')
            .toHaveText('Password required')
        await expect(nameFieldInput, 'First name input should have red border when user has an empty value')
            .toHaveCSS('border-color', 'rgb(206, 212, 218)')
    })

    test('Should be error message when password field has only characters', async({page})=>{
        const firstNameValue = faker.person.firstName()
        const lastNameValue = faker.person.lastName()
        const emailValue = faker.internet.email({firstName : 'aqa'})
        const passwordValue = faker.string.fromCharacters('abc', {min: 2, max: 10})
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, 'Sign up button should be visible').toBeVisible()
        await signUpButton.click()

        const registrationPopup = page.locator('div.modal-dialog')
        await expect(registrationPopup, "Registration popup should be visible").toBeVisible()

        const nameFieldInput = registrationPopup.locator('input#signupName')
        const lastNameFieldInput = registrationPopup.locator('input#signupLastName')
        const emailFieldInput = registrationPopup.locator('input#signupEmail')
        const passwordFieldInput = registrationPopup.locator('input#signupPassword')
        const reenterPasswordFieldInput = registrationPopup.locator('input#signupRepeatPassword')
        const registerButton = registrationPopup.locator('.btn-primary')

        await nameFieldInput.fill(firstNameValue)
        await lastNameFieldInput.fill(lastNameValue)
        await emailFieldInput.fill(emailValue)
        await passwordFieldInput.fill(passwordValue)
        await reenterPasswordFieldInput.fill(passwordValue)
        await expect(registerButton, 'Register button should be disabled').toBeDisabled()

        const passwordErrorMessage = registrationPopup.locator('div.invalid-feedback')
        await expect(passwordErrorMessage, 'Error message should be visible when user has entered password without numbers')
            .toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        await expect(passwordFieldInput, 'Password input should have red border when user has entered invalid password')
            .toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })

    test('Should be error message when password field has only numeric', async({page})=>{
        const firstNameValue = faker.person.firstName()
        const lastNameValue = faker.person.lastName()
        const emailValue = faker.internet.email({firstName : 'aqa'})
        const passwordValue = faker.string.numeric(5)
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, 'Sign up button should be visible').toBeVisible()
        await signUpButton.click()

        const registrationPopup = page.locator('div.modal-dialog')
        await expect(registrationPopup, "Registration popup should be visible").toBeVisible()

        const nameFieldInput = registrationPopup.locator('input#signupName')
        const lastNameFieldInput = registrationPopup.locator('input#signupLastName')
        const emailFieldInput = registrationPopup.locator('input#signupEmail')
        const passwordFieldInput = registrationPopup.locator('input#signupPassword')
        const reenterPasswordFieldInput = registrationPopup.locator('input#signupRepeatPassword')
        const registerButton = registrationPopup.locator('.btn-primary')

        await nameFieldInput.fill(firstNameValue)
        await lastNameFieldInput.fill(lastNameValue)
        await emailFieldInput.fill(emailValue)
        await passwordFieldInput.fill(passwordValue)
        await reenterPasswordFieldInput.fill(passwordValue)
        await expect(registerButton, 'Register button should be disabled').toBeDisabled()

        const passwordErrorMessage = registrationPopup.locator('div.invalid-feedback')
        await expect(passwordErrorMessage, 'Error message should be visible when user has entered password without numbers')
            .toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        await expect(passwordFieldInput, 'Password input should have red border when user has entered invalid password')
            .toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })

    test('Should be error message when password field  has only capital letters', async({page})=>{
        const firstNameValue = faker.person.firstName()
        const lastNameValue = faker.person.lastName()
        const emailValue = faker.internet.email({firstName : 'aqa'})
        const passwordValue = faker.internet.password({length: 10, memorable: true, pattern: /[A-Z]/})
        console.log('password = ', passwordValue)
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, 'Sign up button should be visible').toBeVisible()
        await signUpButton.click()

        const registrationPopup = page.locator('div.modal-dialog')
        await expect(registrationPopup, "Registration popup should be visible").toBeVisible()

        const nameFieldInput = registrationPopup.locator('input#signupName')
        const lastNameFieldInput = registrationPopup.locator('input#signupLastName')
        const emailFieldInput = registrationPopup.locator('input#signupEmail')
        const passwordFieldInput = registrationPopup.locator('input#signupPassword')
        const reenterPasswordFieldInput = registrationPopup.locator('input#signupRepeatPassword')
        const registerButton = registrationPopup.locator('.btn-primary')

        await nameFieldInput.fill(firstNameValue)
        await lastNameFieldInput.fill(lastNameValue)
        await emailFieldInput.fill(emailValue)
        await passwordFieldInput.fill(passwordValue)
        await reenterPasswordFieldInput.fill(passwordValue)
        await expect(registerButton, 'Register button should be disabled').toBeDisabled()

        const passwordErrorMessage = registrationPopup.locator('div.invalid-feedback')
        await expect(passwordErrorMessage, 'Error message should be visible when user has entered password with capital letters')
            .toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        await expect(passwordFieldInput, 'Password input should have red border when user has entered invalid password')
            .toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })
})

test.describe('Registration popup validation for re-enter password field', ()=> {
    test('Should be error message when re-enter password field is empty', async ({page}) => {
        const firstNameValue = faker.person.firstName()
        const lastNameValue = faker.person.lastName()
        const emailValue = faker.internet.email({firstName: 'aqa-'})
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})
        const reenterPasswordValue = ''
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, 'Sign up button should be visible').toBeVisible()
        await signUpButton.click()

        const registrationPopup = page.locator('div.modal-dialog')
        await expect(registrationPopup, 'Registration popup should be visible').toBeVisible()

        const nameFieldInput = registrationPopup.locator('input#signupName')
        const lastNameFieldInput = registrationPopup.locator('input#signupLastName')
        const emailFieldInput = registrationPopup.locator('input#signupEmail')
        const passwordFieldInput = registrationPopup.locator('input#signupPassword')
        const reenterPasswordFieldInput = registrationPopup.locator('input#signupRepeatPassword')
        const registerButton = registrationPopup.locator('.btn-primary')

        await nameFieldInput.fill(firstNameValue)
        await lastNameFieldInput.fill(lastNameValue)
        await emailFieldInput.fill(emailValue)
        await passwordFieldInput.fill(passwordValue)
        await reenterPasswordFieldInput.fill(reenterPasswordValue)
        await nameFieldInput.click()
        await expect(registerButton, 'Register button should be disabled').toBeDisabled()

        const firstNameErrorMessage = registrationPopup.locator('div.invalid-feedback')
        await expect(firstNameErrorMessage, 'Error message should visible when user has entered an empty re-entered password value')
            .toHaveText('Re-enter password required')
        await expect(nameFieldInput, 'Re-entered password input should have red border when user has entered an empty value')
            .toHaveCSS('border-color', 'rgb(92, 179, 253)')
    })

    test('Should be error message when passwords do not match', async({page})=>{
        const firstNameValue = faker.person.firstName()
        const lastNameValue = faker.person.lastName()
        const emailValue = faker.internet.email({firstName : 'aqa'})
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})
        const reenterPasswordValue = 'AqaTester1994!'
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, 'Sign up button should be visible').toBeVisible()
        await signUpButton.click()

        const registrationPopup = page.locator('div.modal-dialog')
        await expect(registrationPopup, "Registration popup should be visible").toBeVisible()

        const nameFieldInput = registrationPopup.locator('input#signupName')
        const lastNameFieldInput = registrationPopup.locator('input#signupLastName')
        const emailFieldInput = registrationPopup.locator('input#signupEmail')
        const passwordFieldInput = registrationPopup.locator('input#signupPassword')
        const reenterPasswordFieldInput = registrationPopup.locator('input#signupRepeatPassword')
        const registerButton = registrationPopup.locator('.btn-primary')

        await nameFieldInput.fill(firstNameValue)
        await lastNameFieldInput.fill(lastNameValue)
        await emailFieldInput.fill(emailValue)
        await passwordFieldInput.fill(passwordValue)
        await reenterPasswordFieldInput.fill(reenterPasswordValue)
        await nameFieldInput.click()
        await expect(registerButton, 'Register button should be disabled').toBeDisabled()

        const passwordReenterErrorMessage = registrationPopup.locator('div.invalid-feedback')
        await expect(passwordReenterErrorMessage, 'Error message should be shown when user has password do not match')
            .toHaveText('Passwords do not match')
        await expect(reenterPasswordFieldInput, 'Password reenter input should have red border when password do not match')
            .toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })
})

test.describe('Successful account registration', ()=>{
    test('Successful registration', async({page})=> {
        const firstNameValue = faker.person.firstName()
        const lastNameValue = faker.person.lastName()
        const emailValue = faker.internet.email({firstName : 'aqa-'})
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})
        await page.goto('/')

        const signUpButton = page.locator('button:text("Sign up")')
        await expect(signUpButton, 'Sign up button should be visible').toBeVisible()
        await signUpButton.click()

        const registrationPopup = page.locator('div > app-signup-modal')
        await expect(registrationPopup, 'Registration popup should be visible').toBeVisible()

        const nameFieldInput = registrationPopup.locator('input#signupName')
        const lastNameFieldInput = registrationPopup.locator('input#signupLastName')
        const emailFieldInput = registrationPopup.locator('input#signupEmail')
        const passwordFieldInput = registrationPopup.locator('input#signupPassword')
        const reenterPasswordFieldInput = registrationPopup.locator('input#signupRepeatPassword')
        const registerButton = registrationPopup.locator('.btn-primary')

        await nameFieldInput.fill(firstNameValue)
        await lastNameFieldInput.fill(lastNameValue)
        await emailFieldInput.fill(emailValue)
        await passwordFieldInput.fill(passwordValue)
        await reenterPasswordFieldInput.fill(passwordValue)

        await expect(registerButton, 'Register button is visible').toBeVisible()
        await registerButton.click()

        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage')
        })
})
