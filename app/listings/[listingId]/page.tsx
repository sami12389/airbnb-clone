import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingId from "@/app/actions/getListingById"
import { EmptyState, ClientOnly } from "@/app/components";
import ListingClient from "../ListingClient"

 
interface Iparams {
    listingId?: string;
}

const ListingPage = async ({params} : {params: Iparams})=>{
    const listing = await getListingId(params)
    const currentUser = await getCurrentUser()
    if(!listing){
    return(
    <ClientOnly>
    <EmptyState/>
    </ClientOnly>
    )
    }
    return(
    <ClientOnly>
    <ListingClient listing = {listing}
    currentUser = {currentUser}/>
    </ClientOnly>
    )
}

export default ListingPage;