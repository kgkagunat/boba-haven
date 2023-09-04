import React, { useState } from 'react'
import { CalendarIcon, IdentificationIcon } from '@heroicons/react/24/outline'

export default function Example() {
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState('');

  const handleSubscribe = (event) => {
    event.preventDefault()
    setShowModal(true)
    setEmail('')
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="relative isolate overflow-hidden bg-radial-gradient-white-pink py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="font-twinkle text-3xl font-bold tracking-tight text-black sm:text-4xl"> Boba Haven's Magical Monthly Brigade!</h2>
            <p className="font-gamja mt-4 text-xl leading-8 text-black">
            Hey, Boba Brigade crew! Come celebrate with us and try our upcoming new drink, the 'Fall Magic'! 
            Enjoy the taste of autumn's swirling flavors, featuring enchanting aromas of pumpkin spice and a hint of cinnamon. Be among the first to savor this limited-edition drink!
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-black shadow-lg ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
              <button
                type="submit"
                onClick={handleSubscribe}
                className="font-gamja text-xl flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Subscribe
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarIcon className="h-6 w-6 text-black" aria-hidden="true" />
              </div>
              <dt className="font-twinkle text-2xl mt-4 font-semibold text-black">Bubble Workshops!</dt>
              <dd className="font-gamja text-xl mt-2 leading-7 text-black">
                Ever wondered how we create our magic boba? Join us for a workshop every Saturday this month for a fun-filled workshops. Learn to craft your drink and take home a piece of Boba Haven with you!
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <IdentificationIcon className="h-6 w-6 text-black" aria-hidden="true" />
              </div>
              <dt className="font-twinkle text-2xl mt-4 font-semibold text-black">Buddy Brigade!</dt>
              <dd className="font-gamja text-xl mt-2 leading-7 text-black">
                Now introducing our "Buddy Brigade Cards"! With every purchase of a drink, earn boba stars that take you closer to free drinks, secret recipes, and merchandise.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      {/* Modal */}
      {
        showModal && (
          <div className="fixed z-max inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-radial-gradient-white-pink rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="font-twinkle font-bold text-2xl leading-6 text-black m-3">
                      Thank you for signing up!
                    </h3>
                    <div className="mt-2">
                      <p className="font-gamja text-2xl text-blue-600">
                        We're excited to have you on board with Boba Haven's Magical Monthly Brigade!
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
    </div>
  )
}
