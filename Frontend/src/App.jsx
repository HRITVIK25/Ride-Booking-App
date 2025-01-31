import { Route, Routes } from "react-router-dom";
import Homes from "./pages/Homes";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import UserprotectWrapper from "./pages/UserprotectWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        
        {/* User routes */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route
          path="/home"
          element={
            <UserprotectWrapper>
              <Homes />
            </UserprotectWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserprotectWrapper>
              <UserLogout />
            </UserprotectWrapper>
          }
        />
        <Route
          path="/riding"
          element={
            <UserprotectWrapper>
              <Riding />
            </UserprotectWrapper>
          }
        />


        {/* Captain Routes */}
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
        <Route
          path="/captain-riding"
          element={
            <CaptainProtectWrapper>
              <CaptainRiding />
            </CaptainProtectWrapper>
          }
        />


      </Routes>
    </>
  );
}

export default App;
