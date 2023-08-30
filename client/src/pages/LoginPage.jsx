import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import blueFrame from '../assets/images/blue_frame1_pngwing.png';

import Auth from '../utils/auth';

function LoginPage() {

  const [formState, setFormState] = useState({ email: '', password: '' });
  //const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await LoginPage({
        variables: { ...formState },
      });
  
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  
    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
    return (
      <>
        <div className="flex min-h-screen justify-center items-center px-6 py-12 lg:px-8 bg-gradient-to-r from-white to-pink-400 z-0">

        {/* SVG Overlay */}
        <img src={blueFrame} alt="blue frame png from pngwing.com" className="absolute w-screen h-screen z-5 opacity-25 pointer-events-none" />

          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="font-twinkle mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
              Log In
            </h2>
          
            {/* Form */}
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleFormSubmit} className="space-y-6 mt-6" action="#" method="POST">
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
                    onChange = {handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="font-gamja text-2xl block font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-gamja text-xl text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange = {handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              
  
              <div>
                <button
                  type="submit"
                  className="font-twinkle text-2xl flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log In
                </button>
              </div>
            </form>
            </div>
  
            {/* Bottom Paragraph */}
            <div className="font-gamja text-xl mt-10 mb-10 text-center text-gray-500">
            <p>
                Don't have an account?{' '}
                    <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-800 hover:underline">
                        Sign Up Here
                    </Link>
            </p>
              <div className="hover:text-slate-800 transform transition-transform duration-200 hover:scale-110 mt-5">
              <Link to="/">
                  Click me to go back home 
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
              </Link>
              </div>
            </div>
            
          </div>
        </div>
      </>
    )
  }
  
export default LoginPage;