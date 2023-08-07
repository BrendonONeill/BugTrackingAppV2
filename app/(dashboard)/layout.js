import {MainProvider} from "@/app/components/MainContext"
import Header from '@/app/components/Header'
import '@/app/globals.css'


export const metadata = {
    title: 'Bug Tracking App',
    description: 'This is a Bug tracking App where a group of developers or a company can record their bugs on a system where they can keep track of the type of bugs and how critical the bugs are. The application is a crud system where users can log in as an admin or user, they can create bug to display to all the developers or have private bugs that they need to fix themselves. The user can filter and sort bugs to their liking as well as add comments under bugs.',
  }
  
  export default function dashboardLayout({ children }) {
    return (
      <div>
        <MainProvider >
        <Header />
        {children}
        </MainProvider>
      </div>
    )
  }