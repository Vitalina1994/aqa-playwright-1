import {faker} from '@faker-js/faker'
import {expect, test} from '@playwright/test'
import WelcomePage from '../../../src/pageObjects/welcomePage/WelcomePage.js'

test.describe('Registration popup validation for name field', ()=> {
    let page
    let welcomePage
    let registrationPopup
    let redBorder = 'rgb(220, 53, 69)'

    test.beforeAll(async ({browser})=>{
        const context = await browser.newContext({
            viewport: {
                width: 1920,
                height: 1080
            }
        })

        page = await context.newPage()
        welcomePage = new WelcomePage(page)
    })

    test.beforeEach(async ()=>{
        await welcomePage.open()
        await welcomePage.waitLoaded()
    })

    test('Should be error message when name field is empty', async ({page}) => {
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})

        const registrationUserData = {
            name: '',
            lastName: faker.person.lastName(),
            email: faker.internet.email({firstName : 'aqa-'}),
            password: passwordValue,
            reenterPassword: passwordValue
        }

        registrationPopup = await welcomePage.openSignupPopup()
        await registrationPopup.fillSignupForm(registrationUserData)

        await expect(registrationPopup.errorMessage, 'Error message should visible when user has entered an empty name value')
            .toHaveText('Name required')
        await expect(registrationPopup.registerButton, 'Register button should be disabled').toBeDisabled()
        await expect(registrationPopup.nameInput, 'Name input should have red border when user has entered an empty value')
            .toHaveCSS('border-color', redBorder)
    })

    test('Should be error message when name field is invalid', async ({page}) => {
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})

        const registrationUserData = {
            name: 'blaYT$%^&*(',
            lastName: faker.person.lastName(),
            email: faker.internet.email({firstName : 'aqa-'}),
            password: passwordValue,
            reenterPassword: passwordValue
        }

        registrationPopup = await welcomePage.openSignupPopup()
        await registrationPopup.fillSignupForm(registrationUserData)

        await expect(registrationPopup.errorMessage, 'Error message should visible when user has entered invalid value')
            .toHaveText('Name is invalid')
        await expect(registrationPopup.registerButton, 'Register button should be disabled').toBeDisabled()
        await expect(registrationPopup.nameInput, 'Name input should have red border when user has entered an invalid name')
            .toHaveCSS('border-color', redBorder)
    })

    test('Should be error message when name field is longer than 20 characters', async ({page}) => {
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})

        const registrationUserData = {
            name: faker.string.fromCharacters('abc', {min: 21, max: 25}),
            lastName: faker.person.lastName(),
            email: faker.internet.email({firstName : 'aqa-'}),
            password: passwordValue,
            reenterPassword: passwordValue
        }

        registrationPopup = await welcomePage.openSignupPopup()
        await registrationPopup.fillSignupForm(registrationUserData)

        await expect(registrationPopup.errorMessage, 'Error message should be visible when user has entered name longer than 20 characters')
            .toHaveText('Name has to be from 2 to 20 characters long')
        await expect(registrationPopup.registerButton, 'Register button should be disabled').toBeDisabled()
        await expect(registrationPopup.nameInput, 'Name input should have red border when user has entered name longer than 20 characters')
            .toHaveCSS('border-color', redBorder)
    })

    test('Should be error message when name field is less than 2 characters', async ({page}) => {
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})

        const registrationUserData = {
            name: faker.string.fromCharacters('abc', 1),
            lastName: faker.person.lastName(),
            email: faker.internet.email({firstName : 'aqa-'}),
            password: passwordValue,
            reenterPassword: passwordValue
        }

        registrationPopup = await welcomePage.openSignupPopup()
        await registrationPopup.fillSignupForm(registrationUserData)

        await expect(registrationPopup.errorMessage, 'Error message should be visible when user has entered name longer than 20 characters')
            .toHaveText('Name has to be from 2 to 20 characters long')
        await expect(registrationPopup.registerButton, 'Register button should be disabled').toBeDisabled()
        await expect(registrationPopup.nameInput, 'Name input should have red border when user has entered name longer than 20 characters')
            .toHaveCSS('border-color', redBorder)
    })
})

test.describe('Registration popup validation for last name field', ()=> {
    let page
    let welcomePage
    let registrationPopup
    let redBorder = 'rgb(220, 53, 69)'

    test.beforeAll(async ({browser})=>{
        const context = await browser.newContext({
            viewport: {
                width: 1920,
                height: 1080
            }
        })

        page = await context.newPage()
        welcomePage = new WelcomePage(page)
    })

    test.beforeEach(async ()=>{
        await welcomePage.open()
        await welcomePage.waitLoaded()
    })

    test('Should be error message when last name field is empty', async ({page}) => {
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})

        const registrationUserData = {
            name: faker.person.firstName(),
            lastName: '',
            email: faker.internet.email({firstName : 'aqa-'}),
            password: passwordValue,
            reenterPassword: passwordValue
        }

        registrationPopup = await welcomePage.openSignupPopup()
        await registrationPopup.fillSignupForm(registrationUserData)

        await expect(registrationPopup.errorMessage, 'Error message should visible when user has entered an empty last name value')
            .toHaveText('Last name required')
        await expect(registrationPopup.registerButton, 'Register button should be disabled').toBeDisabled()
        await expect(registrationPopup.lastNameInput, 'Last name input should have red border when user has entered an empty value')
            .toHaveCSS('border-color', redBorder)
    })

    test('Should be error message when last name field is invalid', async ({page}) => {
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})

        const registrationUserData = {
            name: faker.person.firstName(),
            lastName: 'Bla^&*()',
            email: faker.internet.email({firstName : 'aqa-'}),
            password: passwordValue,
            reenterPassword: passwordValue
        }

        registrationPopup = await welcomePage.openSignupPopup()
        await registrationPopup.fillSignupForm(registrationUserData)

        await expect(registrationPopup.errorMessage, 'Error message should visible when user has entered invalid last name value')
            .toHaveText('Last name is invalid')
        await expect(registrationPopup.registerButton, 'Register button should be disabled').toBeDisabled()
        await expect(registrationPopup.lastNameInput, 'Last name input should have red border when user has entered an invalid value')
            .toHaveCSS('border-color', redBorder)
    })

    test('Should be error message when last name field is longer than 20 characters', async ({page}) => {
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})

        const registrationUserData = {
            name: faker.person.firstName(),
            lastName: faker.string.fromCharacters('abc', {min: 21, max: 25}),
            email: faker.internet.email({firstName : 'aqa-'}),
            password: passwordValue,
            reenterPassword: passwordValue
        }

        registrationPopup = await welcomePage.openSignupPopup()
        await registrationPopup.fillSignupForm(registrationUserData)

        await expect(registrationPopup.errorMessage, 'Error message should be visible when user has entered last name longer than 20 characters')
            .toHaveText('Last name has to be from 2 to 20 characters long')
        await expect(registrationPopup.registerButton, 'Register button should be disabled').toBeDisabled()
        await expect(registrationPopup.lastNameInput, 'Last name input should have red border when user has entered last name longer than 20 characters')
            .toHaveCSS('border-color', redBorder)
    })

    test('Should be error message when last name field is less than 2 characters', async ({page}) => {
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})

        const registrationUserData = {
            name: faker.person.firstName(),
            lastName: faker.string.fromCharacters('abc', 1),
            email: faker.internet.email({firstName : 'aqa-'}),
            password: passwordValue,
            reenterPassword: passwordValue
        }

        registrationPopup = await welcomePage.openSignupPopup()
        await registrationPopup.fillSignupForm(registrationUserData)

        await expect(registrationPopup.errorMessage, 'Error message should be visible when user has entered last name longer than 20 characters')
            .toHaveText('Last name has to be from 2 to 20 characters long')
        await expect(registrationPopup.registerButton, 'Register button should be disabled').toBeDisabled()
        await expect(registrationPopup.lastNameInput, 'Last name input should have red border when user has entered last name longer than 20 characters')
            .toHaveCSS('border-color', redBorder)
    })
})

test.describe('Registration popup validation for email field', ()=> {
    let page
    let welcomePage
    let registrationPopup
    let redBorder = 'rgb(220, 53, 69)'

    test.beforeAll(async ({browser})=>{
        const context = await browser.newContext({
            viewport: {
                width: 1920,
                height: 1080
            }
        })

        page = await context.newPage()
        welcomePage = new WelcomePage(page)
    })

    test.beforeEach(async ()=>{
        await welcomePage.open()
        await welcomePage.waitLoaded()
    })

    test('Should be error message when email field is invalid', async ({page}) => {
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})

        const registrationUserData = {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.string.fromCharacters('abc', {min: 2, max: 25}),
            password: passwordValue,
            reenterPassword: passwordValue
        }

        registrationPopup = await welcomePage.openSignupPopup()
        await registrationPopup.fillSignupForm(registrationUserData)

        await expect(registrationPopup.errorMessage, 'Error message should be visible when user has entered invalid email')
            .toHaveText('Email is incorrect')
        await expect(registrationPopup.registerButton, 'Register button should be disabled').toBeDisabled()
        await expect(registrationPopup.emailInput, 'Email input should have red border when user has entered invalid email')
            .toHaveCSS('border-color', redBorder)
    })

    test('Should be error message when email field is empty', async ({page}) => {
        const passwordValue = faker.internet.password({length: 9, prefix: 'Aqa1'})

        const registrationUserData = {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: '',
            password: passwordValue,
            reenterPassword: passwordValue
        }

        registrationPopup = await welcomePage.openSignupPopup()
        await registrationPopup.fillSignupForm(registrationUserData)

        await expect(registrationPopup.errorMessage, 'Error message should be visible when user has entered an empty email field')
            .toHaveText('Email required')
        await expect(registrationPopup.registerButton, 'Register button should be disabled').toBeDisabled()
        await expect(registrationPopup.emailInput, 'Email input should have red border when user has entered an empty value')
            .toHaveCSS('border-color', redBorder)
    })
})

test.describe('Registration popup validation for password field', ()=> {
    let page
    let welcomePage
    let registrationPopup
    let redBorder = 'rgb(220, 53, 69)'

    test.beforeAll(async ({browser})=>{
        const context = await browser.newContext({
            viewport: {
                width: 1920,
                height: 1080
            }
        })

        page = await context.newPage()
        welcomePage = new WelcomePage(page)
    })

    test.beforeEach(async ()=>{
        await welcomePage.open()
        await welcomePage.waitLoaded()
    })

    test('Should be error message when password field is empty', async ({page}) => {
        const passwordValue = ''

        const registrationUserData = {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email({firstName : 'aqa-'}),
            password: passwordValue,
            reenterPassword: passwordValue
        }

        registrationPopup = await welcomePage.openSignupPopup()
        await registrationPopup.fillSignupForm(registrationUserData)

        await expect(registrationPopup.errorMessage, 'Error message should visible when user has entered an empty password value')
            .toHaveText('Password required')
        await expect(registrationPopup.registerButton, 'Register button should be disabled').toBeDisabled()
        await expect(registrationPopup.emailInput, 'Password input should have red border when user has an empty value')
            .toHaveCSS('border-color', 'rgb(206, 212, 218)')
    })

    test('Should be error message when password field has only characters', async({page})=>{
        const passwordValue = faker.string.fromCharacters('abc', {min: 2, max: 10})

        const registrationUserData = {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email({firstName : 'aqa-'}),
            password: passwordValue,
            reenterPassword: passwordValue
        }

        registrationPopup = await welcomePage.openSignupPopup()
        await registrationPopup.fillSignupForm(registrationUserData)

        await expect(registrationPopup.errorMessage, 'Error message should be visible when user has entered password with only characters')
            .toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        await expect(registrationPopup.registerButton, 'Register button should be disabled').toBeDisabled()
        await expect(registrationPopup.passwordInput, 'Password input should have red border when user has entered invalid password')
            .toHaveCSS('border-color', redBorder)
    })

    test('Should be error message when password field has only numeric', async({page})=>{
        const passwordValue = faker.string.numeric(5)

        const registrationUserData = {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email({firstName : 'aqa-'}),
            password: passwordValue,
            reenterPassword: passwordValue
        }

        registrationPopup = await welcomePage.openSignupPopup()
        await registrationPopup.fillSignupForm(registrationUserData)

        await expect(registrationPopup.errorMessage, 'Error message should be visible when user has entered password only numeric')
            .toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        await expect(registrationPopup.registerButton, 'Register button should be disabled').toBeDisabled()
        await expect(registrationPopup.passwordInput, 'Password input should have red border when user has entered invalid password')
            .toHaveCSS('border-color', redBorder)
    })

    test('Should be error message when password field has only capital letters', async({page})=>{
        const passwordValue = faker.internet.password({length: 10, memorable: true, pattern: /[A-Z]/})

        const registrationUserData = {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email({firstName : 'aqa-'}),
            password: passwordValue,
            reenterPassword: passwordValue
        }

        registrationPopup = await welcomePage.openSignupPopup()
        await registrationPopup.fillSignupForm(registrationUserData)

        await expect(registrationPopup.errorMessage, 'Error message should be visible when user has entered password with capital letters')
            .toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        await expect(registrationPopup.registerButton, 'Register button should be disabled').toBeDisabled()
        await expect(registrationPopup.passwordInput, 'Password input should have red border when user has entered invalid password')
            .toHaveCSS('border-color', redBorder)
    })
})

test.describe('Registration popup validation for re-enter password field', ()=> {
    let page
    let welcomePage
    let registrationPopup
    let redBorder = 'rgb(220, 53, 69)'

    test.beforeAll(async ({browser})=>{
        const context = await browser.newContext({
            viewport: {
                width: 1920,
                height: 1080
            }
        })

        page = await context.newPage()
        welcomePage = new WelcomePage(page)
    })

    test.beforeEach(async ()=>{
        await welcomePage.open()
        await welcomePage.waitLoaded()
    })

    test('Should be error message when re-enter password field is empty', async ({page}) => {
        const registrationUserData = {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email({firstName : 'aqa-'}),
            password: faker.internet.password({length: 9, prefix: 'Aqa1'}),
            reenterPassword: ''
        }

        registrationPopup = await welcomePage.openSignupPopup()
        await registrationPopup.fillSignupForm(registrationUserData)

        await expect(registrationPopup.errorMessage, 'Error message should visible when user has entered an empty re-entered password value')
            .toHaveText('Re-enter password required')
        await expect(registrationPopup.registerButton, 'Register button should be disabled').toBeDisabled()
        await expect(registrationPopup.passwordInput, 'Re-entered password input should have red border when user has entered an empty value')
            .toHaveCSS('border-color', redBorder)
    })

    test('Should be error message when passwords do not match', async({page})=>{
        const registrationUserData = {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email({firstName : 'aqa-'}),
            password: faker.internet.password({length: 9, prefix: 'Aqa1'}),
            reenterPassword: 'AqaTester1994!'
        }

        registrationPopup = await welcomePage.openSignupPopup()
        await registrationPopup.fillSignupForm(registrationUserData)

        await expect(registrationPopup.errorMessage, 'Error message should be shown when user has password do not match')
            .toHaveText('Passwords do not match')
        await expect(registrationPopup.registerButton, 'Register button should be disabled').toBeDisabled()
        await expect(registrationPopup.reenterPasswordInput, 'Password reenter input should have red border when password do not match')
            .toHaveCSS('border-color', redBorder)
    })
})

test.describe('Successful account registration', ()=> {
    let page
    let welcomePage
    let registrationPopup

    test.beforeAll(async ({browser})=>{
        const context = await browser.newContext({
            viewport: {
                width: 1920,
                height: 1080
            }
        })

        page = await context.newPage()
        welcomePage = new WelcomePage(page)
    })

    test.beforeEach(async ()=>{
        await welcomePage.open()
        await welcomePage.waitLoaded()
    })

    test('Successful registration', async({page})=> {
        const registrationUserData = {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email({firstName : 'aqa-'}),
            password: faker.internet.password({length: 9, prefix: 'Aqa1'})
        }

        registrationPopup = await welcomePage.openSignupPopup()
        await registrationPopup.createAccount(registrationUserData)
        })
})
