import dotenv from 'dotenv'

dotenv.config()

console.log("Using env : ", process.env.ENV)

export const config = {
    baseURL: process.env.BASE_URL,
    apiURL: process.env.API_URL,
    httpCredentials: {
        username: process.env.HTTP_CREDENTIALS_USERNAME,
        password: process.env.HTTP_CREDENTIALS_PASSWORD
    }
}