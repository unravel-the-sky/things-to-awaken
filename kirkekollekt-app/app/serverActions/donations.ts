'use server'

import { DonationDto, DonationLogDto, DonatorDto } from "@/lib/types"
import { getAllDonationsInDb, getDonatorById, groupAllDonationsInDbByDonator, registerDonationInDb } from "@/prisma/databaseActions"
import { fetchOrgansationById } from "./organisations"
import { sendMailWithMailerSend } from "./sendMail"

export const registerDonation = async (donation: DonationDto) => {

    try {
        // register dnoation in database
        await registerDonationInDb(donation)

        // send mail to the organisations
        const res = await sendMailToOrganisations(donation)
        return res;
    } catch (err){
        console.error('Error happened while resgistering donation ', err)
    }
}

export const sendMailToOrganisations = async (donationDto: DonationDto) => {

    const { donation, donatorEmail, donatorName } = donationDto;

    try {
      for (const orgId in donation) {
          // get all the ordIds
          const donationData = donation[orgId];
          const org = await fetchOrgansationById(orgId)
    
          if (org) {
              const { emails, name: orgName } = org
              const { dates } = donationData
              await sendMailWithMailerSend(emails, donatorName, orgName, dates)
          }
        }
  
        return {
          success: true,
          message: `Mails sent to organsations!`
        }
    } catch (err){
      console.error('error happened in MailerSend, issue: ', err)
      return {
        success: false,
        message: err
      }
    }

}

export const fetchAllDonations = async () => {
  try {
    const res = await getAllDonationsInDb();
    return res;
  } catch (err){
    console.error('ouppsie in getAllDonationsInDb ', err)
  }
}

export const fetchAllGroupedDonations = async () => {
  try {
    const res = await groupAllDonationsInDbByDonator();
    return res;
  } catch (err){
    console.error('ouppsie in getAllDonationsInDb ', err)
  }
}

export const fetchDonatorById = async (id: string): Promise<DonatorDto | undefined> => {
  try {
    const donator = await getDonatorById(id)
    return donator;
  } catch(err){
    console.error('error while fetchDonatorById: ', err)
  }
}

export const fetchDonationById = async (id: string) => {
  try {
    const donation = await prisma.donation.findUnique({where: {
      id
    }}) as DonationLogDto
    return donation;
  } catch(err) {}
}