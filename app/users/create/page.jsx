import Nav from '@/app/components/Nav';
import UserForm from '@/app/components/UserForm';
import Link from 'next/link';

function page() {

  return (
    <main>
        <Nav />
        <Link className='back-link' href={{pathname: '/users'}} ><img width={30} height={30} src="../back.svg" alt="back arrow" /></Link>
        <UserForm />  
    </main>
  )
}

export default page