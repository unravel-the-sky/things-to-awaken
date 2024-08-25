import { OrganisationDto } from "../types"
import { v4 as uuidv4 } from "uuid";

const imgUrl =
"https://www.pngall.com/wp-content/uploads/8/Sample-PNG-HD-Image.png";

export const organisationsDummy: OrganisationDto[] = Array(65).fill(true).map((item, index) => ({
    links: [
        'https://www.blakors.no/om-oss',
        'https://drive.google.com/uc?id=1-4WXGDE57rzHTFiNXEvOL-MT9oDAVrqT'
    ],
    donationDates: 'Dummy dates',
    emails: ['email1'],
    id: uuidv4(),
    image: imgUrl,
    name: `Dummy name - ${index}`,
    documentFileKey: ''
}))