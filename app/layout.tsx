import {Nunito} from "next/font/google"
import {ClientOnly, Navbar, RegisterModal, LoginModal, ToasterProvider, RentModal} from "./components/index"
import getCurrentUser from "./actions/getCurrentUser"
import './globals.css'

const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone"
}

const font = Nunito({
  subsets: ['latin']
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className = {font.className}>
        <ClientOnly>
        <ToasterProvider/>
        <RentModal/>
        <LoginModal/>
        <RegisterModal/>
        <Navbar currentUser = {currentUser}/>
        </ClientOnly>
        <div className = "pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  )
}
