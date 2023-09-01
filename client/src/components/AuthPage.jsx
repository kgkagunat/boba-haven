import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import blueFrame from '../assets/images/blue_frame1_pngwing.png';

// Import auth
import { useAuth } from '../utils/AuthContext';

// // Import apollo, mutations
// import { useMutation } from '@apollo/client';
// import { LOGIN_USER, SIGNUP_USER } from '../utils/mutations';



function AuthPage({ pageTitle, buttonText, bgColorGradient, redirectLink, bottomParagraphText, bottomLinkText }) {

  // This will log the pageTitle every time the component is rendered.
  console.log("Page title:", pageTitle);

  // Declare and initialize state variables
  const navigate = useNavigate();
  const { login, signup, errors } = useAuth(); // Destructure the required functions and errors from the context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');  // only needed for signup

  const isLoginPage = pageTitle === 'Log In';

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
        if (isLoginPage) {
            await login(email, password);  // Use the login function from the AuthContext
        } else {
            await signup(username, email, password);  // Use the signup function from the AuthContext
        }
        navigate('/profile');  // Navigate after successful submission
    } catch (err) {
        console.error('Error during authentication:', err);
    }
  };

  return (
    <>
      <div className={`flex min-h-screen justify-center items-center px-6 py-12 lg:px-8 ${bgColorGradient} z-0`}>

      {/* SVG Overlay */}
      <img src={blueFrame} loading="lazy" alt="blue frame png from pngwing.com" className="absolute w-screen h-screen z-5 opacity-25 pointer-events-none" />

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="font-twinkle mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            {pageTitle}
          </h2>
        
          {/* Form */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 mt-6" onSubmit={handleFormSubmit}>

          {/* Username (only displayed for signup) */}
          {!isLoginPage && (
                <div>
                  <label htmlFor="username" className="font-gamja block text-2xl font-medium leading-6 text-gray-900">
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </div>
                </div>
              )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="font-gamja block text-2xl font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={email}  // bind to state
                  onChange={(event) => setEmail(event.target.value)}  // update state on change
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="font-gamja text-2xl block font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={password}  // bind to state
                  onChange={(event) => setPassword(event.target.value)}  // update state on change
                />
              </div>
            </div>
            
            {/* Button */}
            <div>
              <button
                type="submit"
                className="font-twinkle text-2xl flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {buttonText}
              </button>
            </div>
          </form>
          </div>

          {/* Bottom Paragraph */}
          <div className="font-gamja text-xl mt-10 mb-10 text-center text-gray-500">
          <p>
              {bottomParagraphText}{' '}
                  <Link to={redirectLink} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-800 hover:underline">
                      {bottomLinkText}
                  </Link>
          </p>
          <div className="hover:text-slate-800 transform transition-transform duration-200 hover:scale-110 mt-5">
            <Link to="/">
                Click me to go back home 
                <FontAwesomeIcon icon={faHome} />
            </Link>
            </div>
          </div>
          
          {/* Error Message */}
          {(errors.loginError || errors.signupError) && (
            <div className="mt-2 text-red-500 text-sm">
                {isLoginPage ? errors.loginError?.message : errors.signupError?.message}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AuthPage;
