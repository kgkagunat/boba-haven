import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphQL/queries';
import AuthService from '../utils/auth';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import goldFrame from '../assets/images/gold_frame_pngwing.png';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function ProfilePage() {
  const { loading, error, data } = useQuery(GET_ME);
  const [user, setUser] = useState({
    _id: '',
    name: '',
    email: '',
    orders: [{
      _id: '',
      purchaseDate: '',
      drinks: [{
        drink: {
          _id: '',
          name: '',
          image: ''
        },
        quantity: 0,
        size: '',
        priceAtOrderTime: 0
      }]
    }],
  });

  // console.log(user);

  useEffect(() => {
    if (data && data.me) {
      setUser(data.me);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userNavigation = [
    { name: 'Order History', href: '/orders' },
    { name: 'Back to main menu', href: '/' },
    { name: 'Sign out', href: '/', action: AuthService.logout }, // Add logout action here
  ];
  
  return (
    <>
      <div className="min-h-full flex flex-col">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <h1 className="font-gamja text-4xl font-bold text-pink-400">Bubble Haven</h1>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <FontAwesomeIcon icon={faUser} className="text-white" />


                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => {
                                if (item.name === 'Sign out') {
                                  return (
                                    <a
                                      href={item.href}
                                      onClick={(e) => {
                                        e.preventDefault(); 
                                        item.action(); 
                                        window.location.href = item.href; // Redirect to the home page after logging out
                                      }}
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  );
                                } else {
                                  return (
                                    <a
                                      href={item.href}
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  );
                                }
                              }}
                            </Menu.Item>
                          ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">

                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user?.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        
        <div>
        {/* SVG Overlay */}
        <img src={goldFrame} alt="gold frame png from pngwing.com" className="absolute w-screen h-screen z-5 opacity-10 pointer-events-none" />
          
          {/* Header */}       
          <header className="bg-white shadow bg-gradient-to-t from-white to-pink-300">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-center">
              <h1 className="font-twinkle text-4xl font-bold tracking-tight text-gray-900">Welcome to your Haven</h1>
            </div>
          </header>

          {/* Profile Content goes here */}
          <main className="flex-grow min-h-screen bg-gradient-to-b from-white to-pink-400">
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

              <div className="px-4 sm:px-0">
                <h3 className="font-gamja text-4xl font-semibold leading-7 text-gray-900">Your Boba details</h3>
              </div>

                <div className="mt-6 border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="font-gamja text-3xl leading-6 text-gray-900">Full name</dt>
                      <dd className="font-gamja text-2xl mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user && user.name}</dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="font-gamja text-3xl leading-6 text-gray-900">Email address</dt>
                      <dd className="font-gamja text-2xl mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user && user.email}</dd>
                    </div>

                  </dl>
                </div>
              </div>
          </main>
        </div>
        
      </div>
    </>
  )
}

export default ProfilePage;