import LoginForm from '../components/LoginForm';
import LoginHeader from '../components/LoginHeader';

function page() {
  return (
    <main>
      <LoginHeader />
      <div className='login-container'>
      <LoginForm />   
      </div>
    </main>
  )
}

export default page