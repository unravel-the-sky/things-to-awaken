import { DonationDto, DonationLogDto, DonatorDto, OrganisationDto, RegisterOrganisationDto } from "@/lib/types";
import prisma from "../lib/prisma";

export const addOrganisationToDb = async (organisation: OrganisationDto) => {
  try {
    // fix this data type here, check on how to do it best way
    console.log('omg gonna send soon ', organisation)
    const res = await prisma.organisation.create({
      data: {
        ...organisation,
      },
    });
    console.log("whoa did it work: ", res);
  } catch (err) {
    console.error("error while writing to db: ", err);
  }
};

export const getAllOrganisations = async (): Promise<OrganisationDto[]> => {
  const res = await prisma.organisation.findMany(
    {
      orderBy: {
        createdAt: 'asc'
      }
    },
  ) as OrganisationDto[];
  return res;
};

export const filterAllOrgansations = async (filter: string): Promise<OrganisationDto[]> => {
  const res = await prisma.organisation.findMany(
    {
      where: {
        name: {
          contains: filter
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    },
  ) as OrganisationDto[];
  return res;
}

export const getOrganisationById = async (id: string): Promise<OrganisationDto | null> => {
  const res = await prisma.organisation.findUnique(
    {
      where: {
        id
      }
    }
  ) as OrganisationDto | null
  return res;
}

export const updateOrganisationById = async(org: OrganisationDto, id: string) => {
  try {
    const updateOrg = await prisma.organisation.update({
      where: {
        id
      }, 
      data: {
        ...org
      }
    })

    return updateOrg;
  } catch(err) {
    console.error("error while updateing org in db: ", err);
  }
}

export const registerDonationInDb = async (donationDto: DonationDto) => {
  console.log('yo')
  try {
    const { donation, donatorEmail, donatorName } = donationDto;

    let donator = await prisma.donator.findUnique({
      where: { email: donatorEmail },
    });

    if (!donator) {
      donator = await prisma.donator.create({
        data: {
          email: donatorEmail,
          name: donatorName
        }
      })
    }

    for (const orgId in donation) {
      // get all the ordIds
      const donationData = donation[orgId];
      const org = await prisma.organisation.findUnique({
        where: {
          id: orgId
        }
      })

      if (org) {
        console.log('gonna make donation to org: ', org.id)
        await prisma.donation.create({
          data: {
            donatorId: donator.id,
            organisationId: org.id,
            dates: donationData.dates
          }
        })
        console.log('done')
      }
    }

  } catch(err){
    console.error('error while registerDonationToOrganisation: ', err)
  }
}
export const getAllDonationsInDb = async (): Promise<DonationLogDto[] | undefined> => {
  try {
    const donations = await prisma.donation.findMany({orderBy: {
      Donator: {
        email: 'asc'
      },
    },
  }) as DonationLogDto[]
    return donations;
  } catch (err) {
    console.error('error while fetchAllDonationsInDb: ', err)
  }
}

export const groupAllDonationsInDbByDonator = async() => {
  try {
    const groupedDonations = await prisma.donation.findMany({
      where: {},
    })
    return groupedDonations;
  } catch(err){
    console.error('error while groupAllDonationsInDbByDonator: ', err)
  }
}

export const getDonatorById = async (id: string): Promise<DonatorDto | undefined> => {
  try {
    const donator = await prisma.donator.findUnique({where: {
      id
    }}) as DonatorDto
    return donator;
  } catch(err){
    console.error('error while getDonatorById: ', err)
  }
}

export const createOrUpdateMailTemplate = async (template: string, udpatedBy: string) => {
  try {
    const res = await prisma.mailTemplate.create({
      data: {
        template,
        udpatedBy
      }
    })
  } catch(err) {
    console.error('error while createOrUpdateMailTemplate: ', err)
  }
}

export const getMailTemplateFromDb = async () => {
  try {
    const res = await prisma.mailTemplate.findMany({
      orderBy: {
        id: 'desc',
      },
      take: 1,
    })
    return res[0];
  } catch(err) {
    console.error('error while getMagetMailTemplateFromDbilTempalte: ', err)
  }
}