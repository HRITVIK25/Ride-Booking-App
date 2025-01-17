import { Route, Routes } from 'react-router-dom'
import Homes from './pages/Homes' 
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserprotectWrapper from './pages/UserprotectWrapper'
import UserLogout from './pages/UserLogout'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Start />}/>
        <Route path='/login' element={<UserLogin />}/>
        <Route path='/signup' element={<UserSignup />}/>
        <Route path='/captain-login' element={<CaptainLogin />}/>
        <Route path='/captain-signup' element={<CaptainSignup />}/>
        <Route path='/home' element={
          <UserprotectWrapper>
            <Homes/>
          </UserprotectWrapper>
        } />

        <Route path='/user/logout' element={
          <UserprotectWrapper>
            <UserLogout/>
          </UserprotectWrapper>
        }/>
      </Routes>
    </>
  )
}

export default App
