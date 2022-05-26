import { registerAs } from "@nestjs/config";

export default registerAs('google-OAuth-config',():any =>({
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
}))