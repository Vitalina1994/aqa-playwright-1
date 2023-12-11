import {test as base, request} from '@playwright/test'
import GaragePage from '../pageObjects/garagePage/GaragePage'
import {STORAGE_STATE_USER_PATH} from '../data/storageState'
import ProfilePage from '../pageObjects/profilePage/ProfilePage.js'
import CarController from '../controllers/CarController.js'
import AuthController from '../controllers/AuthController.js'
import {config} from '../../config/config.js'
import {USERS} from '../data/dict/users.js'
import {CookieJar} from 'tough-cookie'
import UserController from '../controllers/UserController.js'

export const test = base.extend(({
    userProfilePage: async ({browser}, use)=>{
        const ctx = await browser.newContext({
            storageState: STORAGE_STATE_USER_PATH
        })
        const page = await ctx.newPage()
        const profilePage = new ProfilePage(page)
        await profilePage.navigate()
        await use(profilePage)
    },

    userGaragePage: async({browser}, use)=> {
        const ctx = await browser.newContext({
            storageState: STORAGE_STATE_USER_PATH
        })
        const page = await ctx.newPage()
        const garagePage = new GaragePage(page)
        await garagePage.navigate()
        await use(garagePage)
    },
        userAPIClient: async ({}, use)=> {
            const ctx = await request.newContext({
                storageState: STORAGE_STATE_USER_PATH
            })
            await use(ctx)
            await ctx.dispose()
        },
    client: async ({page}, use)=>{
        const cookie = new CookieJar()
        const options = {
            baseUrl: config.apiURL,
            cookies: cookie
        }
        const authController = new AuthController(options)
        await authController.signIn({
            email: USERS.VITALINA_TEST.email,
            password: USERS.VITALINA_TEST.password,
        })
        await use({
            cars: new CarController(options),
            auth: authController
        })
    },
    clientWithUser: async ({page}, use)=>{
        async function getClient(userData){
            const cookie = new CookieJar()
            const options = {
                baseUrl: config.apiURL,
                cookies: cookie
            }
            const authController = new AuthController(options)
            await authController.signIn(userData)

            return {
                cars: new CarController(options),
                auth: authController
            }
        }
        await use(getClient)
    },

    unauthorizedClient : async ({page}, use) => {
        const options = {
            baseUrl: config.apiURL,
        }
        const authController = new AuthController(options)
        await use({
            cars: new CarController(options),
            auth: authController
        })
    }
})
)
