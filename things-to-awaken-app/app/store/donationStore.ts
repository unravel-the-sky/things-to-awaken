import { RegisterOrganisationDto } from '@/lib/types'
import { create } from 'zustand'

export type DonationStore = {
    donations: {
        [orgId: string]: {
            dates: Date[]
        }
    }
    setDonation: (payload: RegisterOrganisationDto) => void,
    removeDonation: (orgId: string) => void,
}

const useDonationStore = create<DonationStore>((set, get) => ({
    donations: {},
    setDonation: (payload: RegisterOrganisationDto) => set(
        (state) => (
            {
                donations: { ...state.donations, [payload.organisationId]: {dates: payload.dates} }
            }   
        )),
    removeDonation: (orgId: string) =>  {
        const donations = get().donations;
        const { [orgId]: value, ...removed} = donations
        set(
            (state) => (
                {
                    donations: removed
                }   
        ))
    },
}))

export default useDonationStore;