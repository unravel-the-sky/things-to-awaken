'use server'

import { OrganisationDto, SubmittedFormData } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { getAwsDownloadUrl, getFileUrl, uploadImage, uploadPdf } from "./awsFuncs";

export const submitForm = async (
    formData: FormData,
    organisationId: string | undefined = undefined,
    documentFileKey = ''
  ): Promise<SubmittedFormData> => {
    const rawFormData: SubmittedFormData = {
      orgName: formData.get("orgName"),
      orgEmail: formData.get("orgEmail"),
      linkToOrg: formData.get("linkToOrg"),
      orgLogo: "",
      orgDocument: ''
    };

    // logo bit
    const orgLogoRaw = formData.get("orgLogo");
    const orgName = rawFormData.orgName as string
  
    if (typeof orgLogoRaw === 'string') {
      rawFormData.orgLogo = orgLogoRaw
    } else {
        // now upload the image to s3 and get the download url
        const image = orgLogoRaw as File;
        const uploadedFileKey = await uploadImage(
          image,
          orgName,
        );
        if (uploadedFileKey) {
          const url = await getFileUrl(uploadedFileKey); // file name here
          if (url) rawFormData.orgLogo = url;
        }
    }
  
    // org document bit
    const orgDocumentRaw = formData.get("orgDocument");
    if (typeof orgDocumentRaw === 'string') {
      rawFormData.orgDocument = orgDocumentRaw
    } else if (orgDocumentRaw) {
        documentFileKey = await uploadPdf(orgDocumentRaw, orgName) || ''
          if (documentFileKey) {
            const url = await getFileUrl(documentFileKey); // file name here
            rawFormData.orgDocument = url;
          }
    }
  
    const organisationToCreate: OrganisationDto = {
      name: rawFormData.orgName as string,
      links: [
        rawFormData.linkToOrg as string,
        rawFormData.orgDocument as string
      ],
      image: rawFormData.orgLogo as string,
      emails: [
        rawFormData.orgEmail as string
      ],
      documentFileKey
    };
  
    // if (organisationId) {
    //   await updateOrganisationById(organisationToCreate, organisationId)
    // } else {
    //   await addOrganisationToDb(organisationToCreate);
    // }
  
    revalidatePath("/admin");
    revalidatePath('/')
  
    return rawFormData;
  };

  