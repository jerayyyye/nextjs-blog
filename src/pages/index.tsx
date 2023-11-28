import About from '@/components/About'
import Login from '@/components/Login'
import {useSession} from 'next-auth/react'
import scss from './Home.module.scss'

const Home: React.FC = () => {
const { data: session } = useSession();

  return (
    <main className={scss.main}> 
      {session && <About />}
      {!session && <Login />}
    </main>
  );
};

export default Home;