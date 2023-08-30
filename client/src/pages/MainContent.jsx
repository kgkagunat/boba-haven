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
import ProfilePage from './ProfilePage';
import MissingPage from './MissingPage';
import DrinksPage from './DrinksPage';

function MainContent() {
  const location = useLocation();
  const showNavbar = ![
    "/login",
    "/signup",
    "/about",
    "/cart",
    "/profile",
    "/404",
    "/drinks"
  ].some(path => location.pathname.startsWith(path));
  
  const showFooter = ![
    "/login",
    "/signup",
    "/about",
    "/cart",
    "/profile",
    "/404",
    "/drinks"
  ].some(path => location.pathname.startsWith(path));

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
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/404' element={<MissingPage />} />
        <Route path="/drinks/:id" element={<DrinksPage />} />
        {/* Add other routes here */}
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}

export default MainContent;
