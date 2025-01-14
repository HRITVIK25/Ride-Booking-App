import { Route, Routes } from 'react-router-dom'
import Homes from './pages/Homes' 
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Homes />}/>
        <Route path='/login' element={<UserLogin />}/>
        <Route path='/signup' element={<UserSignup />}/>
        <Route path='/captain-login' element={<CaptainLogin />}/>
        <Route path='/captain-signup' element={<CaptainSignup />}/>
      </Routes>
    </>
  )
}

export default App