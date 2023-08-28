// MainContent.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

// Components Imports
import Hero from '../components/Hero';
import CardDrink from '../components/CardDrink';
import DrinkMenu from '../components/DrinkMenu';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Pages Imports
import LoginPage from './LoginPage';
import AboutPage from './AboutPage';
import SignUpPage from './SignUpPage';
import CartPage from './CartPage';

function MainContent() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/about" && location.pathname !== "/cart";
  const showFooter = location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/about" && location.pathname !== "/cart";  

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <CardDrink />
            <DrinkMenu id="drink-menu" />
          </>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/cart' element={<CartPage />} />
        {/* Add other routes here */}
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}

export default MainContent;
