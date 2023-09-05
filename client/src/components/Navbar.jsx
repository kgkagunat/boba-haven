import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUtensils, faQuestionCircle, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { GET_ME } from '../graphQL/queries';
import { useQuery } from '@apollo/client';
import AuthService from '../utils/auth';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { data } = useQuery(GET_ME);

  const userName = data?.me?.name || '';

  const currentUser = AuthService.loggedIn() ? AuthService.getProfile() : null;
  const logout = () => AuthService.logout();

  return (
    <nav className="bg-white bg-opacity-80 text-black sticky top-0 z-50 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">

        <Link to="/" className="font-gamja text-4xl font-bold hover:text-pink-400 hover:scale-110 transition ease-in-out duration-700">Bubble Haven</Link>

        {/* Centered links */}
        <div className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-pink-400 transform transition-transform hover:scale-150 ease-in-out duration-500">
            <FontAwesomeIcon icon={faHome} className="icon-1.4x p-1" />
          </a>
          {/* Drink Menu links */}
          <a href="#drink-menu" className="hover:text-pink-400 transform transition-transform hover:scale-150 ease-in-out duration-500">
            <FontAwesomeIcon icon={faUtensils} className="icon-1.4x p-1" />
          </a>
          {/* About links */}
          <Link to="/about" className="hover:text-pink-400 transform transition-transform hover:scale-150 ease-in-out duration-500">
              <FontAwesomeIcon icon={faQuestionCircle} className="icon-1.4x p-1" />
          </Link>
          {/* Cart links */}
          <Link 
              to={currentUser ? "/cart" : "#"} 
              onClick={() => !currentUser && setShowModal(true)}
              className="hover:text-pink-400 transform transition-transform hover:scale-150 ease-in-out duration-500"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="icon-1.4x p-1" />
          </Link>
        </div>

        {/* Log In */}
        <div className="flex items-center space-x-4">
        {currentUser ? (
          <>
            {/* If logged in, show user info or avatar */}
            <Link to="/profile" className="hover:text-pink-400 transform transition-transform hover:scale-150 ease-in-out duration-500">
              {/* This is a placeholder icon for the avatar. You can replace with an actual avatar image */}
              <FontAwesomeIcon icon={faUser} className="icon-1.4x p-1" />
            </Link>
            <div className='font-twinkle text-xl'>
              Welcome, {userName}!
            </div>
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
        <a href="#" className="block px-2 py-1 text-black hover:text-pink-400 transform transition-transform hover:scale-150 ease-in-out duration-500">
          <FontAwesomeIcon icon={faHome} className="icon-1.4x p-2" />
        </a>
        {/* Drink Menu Hamburger */}
        <a href="#drink-menu" className="block px-2 py-1 text-black hover:text-pink-400 transform transition-transform hover:scale-150 ease-in-out duration-500">
          <FontAwesomeIcon icon={faUtensils} className="icon-1.4x p-2" />
        </a>
        {/* About Hamburger */}
        <Link to="/about" className="block px-2 py-1 text-black hover:text-pink-400 transform transition-transform hover:scale-150 ease-in-out duration-500">
            <FontAwesomeIcon icon={faQuestionCircle} className="icon-1.4x p-2" />
        </Link>
        {/* Cart Hamburger */}
        <Link 
            to={currentUser ? "/cart" : "#"} 
            onClick={() => !currentUser && setShowModal(true)}
            className="block px-2 py-1 text-black hover:text-pink-400 transform transition-transform hover:scale-150 ease-in-out duration-500"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="icon-1.4x p-2" />
        </Link>

        {/* Login Hamburger */}
        {currentUser ? (
          <button onClick={logout} className="block px-2 py-1 text-black hover:text-pink-400 transform transition-transform hover:scale-150 ease-in-out duration-500">
            Logout
          </button>
        ) : (
          <Link to="/login" className="block px-2 py-1 text-black hover:text-pink-400 transform transition-transform hover:scale-150 ease-in-out duration-500">
            <div className="border rounded-full p-2">
              <FontAwesomeIcon icon={faUser} /> Login
            </div>
          </Link>
        )}
      </div>

      {/* Modal */}
      {
        showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-radial-gradient-white-pink rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="font-twinkle font-bold text-2xl leading-6 text-black m-3">
                      Uh oh, can't access the cart!
                    </h3>
                    <div className="mt-2">
                      <p className="font-gamja text-2xl text-blue-600">
                        You must be logged in to access the cart.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button onClick={() => setShowModal(false)} type="button" className="font-gamja text-2xl inline-flex justify-center w-full rounded-md border border-transparent shadow-md px-4 py-1 bg-red-600 font-bold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </nav>
  );
}

export default Navbar;
