import 'dotenv/config'
import { MailerSend, Sender } from 'mailersend'

// https://github.com/mailersend/mailersend-nodejs?tab=readme-ov-file#installation

const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY
})

export default mailerSend

