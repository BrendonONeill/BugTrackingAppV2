import {MainProvider} from "@/app/components/MainContext"
import Header from '@/app/components/Header'
import '@/app/globals.css'


export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
  }
  
  export default function BugLayout({ children }) {
    return (
      <div>
        <MainProvider >
        <Header />
        {children}
        </MainProvider>
      </div>
    )
  }






















