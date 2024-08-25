"use server";

import mailerSend from "@/lib/mailersend";
import sgMail from "@/lib/sendgrid";
import { EmailParams, Recipient, Sender } from "mailersend";
import { DEFAULT_MAILSENDER_MAIL } from "../utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export const sendMail = async () => {
  try {
    const msg = {
      to: "shadanone@proton.me", // Change to your recipient
      from: "ririma3875@trackden.com", // Change to your verified sender
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };

    const res = await sgMail.send(msg);
    console.log("Email sent");
    console.log("response: ", res);
  } catch (error) {
    console.error(error);
  }
};

export const sendTestMail = async (receiver: string, content?: string) => {
  try {
    const senderMail = ''
    const senderName = ''
    const sender = {
        mail: DEFAULT_MAILSENDER_MAIL,
        name: 'asdf'
    }
    const sentFrom = new Sender(sender.mail, sender.name)
    
    const recepient = {
        mail: receiver,
        name: 'lol'
    }

    const recipients = [new Recipient(recepient.mail, recepient.name)]

    const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject('Yay')
    .setHtml(`<h2>Yello</h2><p>${content ?? 'no content'}</p>`)
    .setText("This is the text content");

    await mailerSend.email.send(emailParams)
    console.log('email sent')

  } catch(err){
    console.error('ooupsiiee ', err)
  }
}

const generateEmail = (orgName: string, dates: Date[]) => {
  const datesList = dates.map(date => `<li>${date.toLocaleDateString('nb')}</li>`).join('');

  const emailTemplate = `
        <div style="padding: 20px;">
            <p>Hello ${orgName},</p>
            <p>You will receive the following donations:</p>
            <ul>
                ${datesList}
            </ul>
        </div>
  `;

  return emailTemplate;
}

export const sendMailWithMailerSend = async (emails: string[], donator: string, orgName: string, dates: Date[]) => {
  try {
    const sender = {
        mail: 'MS_BEwv8P@trial-pxkjn413n99gz781.mlsender.net',
        name: 'asdf'
    }
    const sentFrom = new Sender(sender.mail, sender.name)
    
    const recepient = {
        mail: 'shadanone@proton.me',
        name: 'lol'
    }

    const recipients = emails.map(item => (new Recipient(item)))

    const emailContent = generateEmail(orgName, dates);

    const personalization = emails.map(email => (
        {
          email,
          data: {
            dates,
            org_name: orgName
          },
        }
      ))
    
    const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject('Yay')
    .setTemplateId('pxkjn41kwkqlz781')
    .setPersonalization(personalization)

    await mailerSend.email.send(emailParams)
    console.log('email sent')

  } catch(err){
    console.error('ooupsiiee ', err)
  }
}

// export const createMailTemplate = async(text: string) => {
//   const session = await getServerSession(authOptions)

//   try {
//     const res = await createOrUpdateMailTemplate(text, session?.user.email ?? '')
//     return {
//       success: true,
//       res
//     }
//   } catch(err){
//     return {
//       success: false,
//       message: err
//     }
//   }
// }

// export const getMailTemplate = async () => {
//   const res = await getMailTemplateFromDb();
//   return res;
// }