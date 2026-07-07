import './App.css';
import { HomePage } from './Components/Pages/HomePage.jsx';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ProductPage } from "./Components/Pages/ProductPage";
import { AboutPage } from "./Components/Pages/AboutPage";
import { ContactPage } from "./Components/Pages/ContactPage";
import { DistributorPage } from "./Components/Pages/DistributorPage";
import { ProfilePage } from "./Components/Pages/ProfilePage";
import { Cart } from './Components/Cart';
import { PaymentPage } from './Components/PaymentPage.jsx';
import { ScrollToTop } from './Components/ScrollToTop';
import { ProductDetailPage } from './Components/Pages/ProductDetailPage';
import { AuthProvider } from './Context/AuthContext';
import { LoginPage } from './Components/Pages/LoginPage';
import { SignupPage } from './Components/Pages/SignupPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();
  
  return (
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} pauseOnHover={false} closeOnClick={true} />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<HomePage/>} />
          <Route path='/ProductPage' element={<ProductPage />} />
          <Route path='/product/:id' element={<ProductDetailPage />} />
        <Route path='/CartPage' element={<Cart/>} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/distributors' element={<DistributorPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
    </AnimatePresence>
    </AuthProvider>
  );
}

export default App;