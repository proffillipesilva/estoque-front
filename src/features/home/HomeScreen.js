import React from 'react'
import { useAuth } from '../../shared/context/AuthContext'
import useAuthStore from '../../shared/store/auth-store';
import useUserStore from '../../shared/store/user-store';
import AdminHome from './components/AdminHome';
import StandardHome from './components/StandardHome';
import GuestHome from './components/GuestHome';

const HomeScreen = () => {
  //const {logout} = useAuth()
  const {logout} = useAuthStore();
  const {tipo, info} = useUserStore()

  React.useEffect(() => {
      // proibido metodo async
      // metodo().then(resposta => ...).catch(erro => ...)
  }, [])

  return (
    <div>
      HomeScreen <br  />
      {tipo == "ADMIN" && <AdminHome info={info} />}
      {tipo == "STANDARD" && <StandardHome info={info} />}
      {tipo == "GUEST" && <GuestHome info={info} />}
    </div>
  )
}

export default HomeScreen