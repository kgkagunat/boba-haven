import React from 'react'
import { CalendarIcon, IdentificationIcon } from '@heroicons/react/24/outline'

export default function Example() {
  return (
    <div className="relative isolate overflow-hidden bg-radial-gradient-white-pink py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="font-twinkle text-3xl font-bold tracking-tight text-black sm:text-4xl"> Boba Haven's Magical Monthly Brigade!</h2>
            <p className="font-gamja mt-4 text-xl leading-8 text-black">
              Hey Boba Brigade crew! Celebrate with use with our new incoming drink called the "Fall Magic"! Enjoy the taste of autumn swirls flavors, with enchanting aromas of pumpkin spice, and a hint of cinnamon.
              Be among the first to taste this limited edition drink!
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
              />
              <button
                type="submit"
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
    </div>
  )
}
