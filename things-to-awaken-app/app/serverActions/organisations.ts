'use server'

import { organisationsDummy } from "@/lib/data/dummyOrgs";
import { sleep } from "@/lib/utils";
import { getOrganisationById } from "@/prisma/databaseActions";
import { revalidatePath } from "next/cache";
import { getAwsDownloadUrl } from "./awsFuncs";


export const fetchOrganisations = (url: string) => {
    
}

export const fetchOrganisationsDummy = async (delay = true) => {
    	// sleep a bit
	if (delay) await sleep(1000);

    const data = organisationsDummy;

    return data;
}

export const fetchOrgansationById = async (orgId: string) => {
    try {
        const org = await getOrganisationById(orgId)
        return org
    } catch(err){
        console.error('error happened in fetchOrgansationById', err)
    }
}

export const deleteOrganisationById = async (orgId: string) => {
    try {
        const res = await prisma.organisation.delete({where: {
            id: orgId
        }})

        revalidatePath('/admin')
        revalidatePath('/')
        return res;
    } catch(err) {
        console.error('error happened in deleteOrganisationById, ', err)
    }
}

export const getPresignedUrlLink = async (fileKey: string) => {
    const res = await getAwsDownloadUrl({file_key: fileKey})
    return res;
}