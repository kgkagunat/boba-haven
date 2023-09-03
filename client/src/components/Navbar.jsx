import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUtensils, faQuestionCircle, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

// Import AuthService
import AuthService from '../utils/auth';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const currentUser = AuthService.loggedIn() ? AuthService.getProfile() : null;
  const logout = () => AuthService.logout();

  return (
    <nav className="bg-white bg-opacity-80 text-black sticky top-0 z-50 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">

        <Link to="/" className="font-gamja text-4xl font-bold hover:text-pink-400 hover:scale-110 transition ease-in-out duration-500">Bubble Haven</Link>

        {/* Centered links */}
        <div className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-pink-400 transform transition-transform duration-200 hover:scale-150">
            <FontAwesomeIcon icon={faHome} className="icon-1.4x p-1" />
          </a>
          {/* Drink Menu links */}
          <a href="#drink-menu" className="hover:text-pink-400 transform transition-transform duration-200 hover:scale-150">
            <FontAwesomeIcon icon={faUtensils} className="icon-1.4x p-1" />
          </a>
          {/* About links */}
          <Link to="/about" className="hover:text-pink-400 transform transition-transform duration-200 hover:scale-150">
              <FontAwesomeIcon icon={faQuestionCircle} className="icon-1.4x p-1" />
          </Link>
          {/* Cart links */}
          <Link to="/cart" className="hover:text-pink-400 transform transition-transform duration-200 hover:scale-150">
              <FontAwesomeIcon icon={faShoppingCart} className="icon-1.4x p-1" />
          </Link>
        </div>

        {/* Log In */}
        <div className="flex items-center space-x-4">
        {currentUser ? (
          <>
            {/* If logged in, show user info or avatar */}
            <div>
              {/* Display any user-specific info like currentUser.email */}
              Welcome, {currentUser.email}!
            </div>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="hidden md:block text-black hover:text-pink-400">
            <div className="border rounded-full p-2">
              <FontAwesomeIcon icon={faUser} /> Login
            </div>
          </Link>
        )}

          {/* Hamburger */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex items-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm1 5a1 1 0 0 0-1 1v1a1 1 0 1 0 2 0v-1a1 1 0 0 0-1-1zm14 0a1 1 0 0 0-1 1v1a1 1 0 1 0 2 0v-1a1 1 0 0 0-1-1zM4 16a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>

      </div>
      {/* Hamburger links */}
      <div className={`md:hidden ${isOpen ? 'flex' : 'hidden'} flex-col items-center mt-2`}>
        <a href="#" className="block px-2 py-1 text-black hover:text-gray-800 transform transition-transform duration-200 hover:scale-150">
          <FontAwesomeIcon icon={faHome} className="icon-1.4x p-2" />
        </a>
        {/* Drink Menu Hamburger */}
        <a href="#drink-menu" className="block px-2 py-1 text-black hover:text-gray-800 transform transition-transform duration-200 hover:scale-150">
          <FontAwesomeIcon icon={faUtensils} className="icon-1.4x p-2" />
        </a>
        {/* About Hamburger */}
        <Link to="/about" className="block px-2 py-1 text-black hover:text-gray-800 transform transition-transform duration-200 hover:scale-150">
            <FontAwesomeIcon icon={faQuestionCircle} className="icon-1.4x p-2" />
        </Link>
        {/* Cart Hamburger */}
        <Link to="/cart" className="block px-2 py-1 text-black hover:text-gray-800 transform transition-transform duration-200 hover:scale-150">
            <FontAwesomeIcon icon={faShoppingCart} className="icon-1.4x p-2" />
        </Link>
        {/* Login Hamburger */}
        {currentUser ? (
          <button onClick={logout} className="block px-2 py-1 text-black hover:text-gray-800 transform transition-transform duration-200 hover:scale-150">
            Logout
          </button>
        ) : (
          <Link to="/login" className="block px-2 py-1 text-black hover:text-gray-800 transform transition-transform duration-200 hover:scale-150">
            <div className="border rounded-full p-2">
              <FontAwesomeIcon icon={faUser} /> Login
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
