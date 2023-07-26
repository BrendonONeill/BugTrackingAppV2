import Form from '@/app/components/Form';
import Nav from '@/app/components/Nav';
import Link from 'next/link';
import NonMobileAdminNav from "@/app/components/NonMobileAdminNav"

function page() {

  return (
    <main>
        <Nav />
        <div className="form-grid-container">
        <NonMobileAdminNav />
        <div className="form-content-container">
        <Link className='back-link' href={{pathname: '/bugs'}} ><img width={30} height={30} src="../back.svg" alt="back arrow" /></Link>
        <Form />
        </div>
        </div>
    </main>
  )
}

export default page