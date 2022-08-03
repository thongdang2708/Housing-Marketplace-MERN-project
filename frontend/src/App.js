import React from 'react';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import HomePage from './pages/HomePage';
import OfferPage from './pages/OfferPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgetPage from './pages/ForgetPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AddForm from './pages/AddForm';
import Private from './components/layouts/Private';
import UpdatePassword from './pages/UpdatePassword';
import SellPage from './pages/SellPage';
import RentPage from './pages/RentPage';
import SinglePageDisplay from './pages/SinglePageDisplay';
import ContactLandlordForm from './pages/ContactLandlordForm';

function App() {
  return (
    <>
    <Router>
    <div className="App">

      <div>
      <Routes>
        
        <Route exact path="/" element={<HomePage />}/>
        <Route path="/offer" element={<OfferPage />}/>
        <Route path="profile" element={<Private />}>
        <Route path="/profile" element={<ProfilePage />}/>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/forgetpassword" element={<ForgetPage />}/>
        <Route path="/resetPassword/:resetToken" element={<ResetPasswordPage />}/>
        <Route path="/updatepassword" element={<Private />}>
            <Route path="/updatepassword" element={<UpdatePassword />}/>
        </Route>
        <Route path="/addform" element={<Private />}>
        <Route path="/addform" element={<AddForm />}/>
        </Route>
        <Route path="/rent" element={<RentPage />}/>
        <Route path="/sell" element={<SellPage />} />
        <Route path="/category/:housingId" element={<SinglePageDisplay />}/>
        <Route path="/contactlandlord" element={<ContactLandlordForm />} />
      </Routes>
      </div>

      <div>
      <Navbar />
      </div>
    </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
