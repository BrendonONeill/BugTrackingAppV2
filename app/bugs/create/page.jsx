import Form from '@/app/components/Form';
import Nav from '@/app/components/Nav';
import Link from 'next/link';

function page() {

  return (
    <main>
        <Nav />
        <Link className='back-link' href={{pathname: '/bugs'}} ><img width={30} height={30} src="../back.svg" alt="back arrow" /></Link>
        <Form />
    </main>
  )
}

export default page