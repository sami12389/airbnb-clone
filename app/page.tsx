import {ClientOnly, Container, EmptyState, ListingCard} from "./components/index"
import getListings from "./actions/getListings";
import getCurrentUser from "./actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations"



export default async function Home() {
  const listings = await getListings()
  const currentUser = await getCurrentUser()

  if(listings?.length === 0){
    return(
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  return (
  <ClientOnly>
    <Container>
      <div className = "pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
       {listings?.map((listing: any)=>{
        return(
          <div>
            <ListingCard
            currentUser = {currentUser}
            key = {listing.id}
            data = {listing}
            />
          </div>
        )
       })}
      </div>
    </Container>
  </ClientOnly>
  )
}
