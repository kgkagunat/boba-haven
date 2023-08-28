import React from 'react'
import { Link } from 'react-router-dom'
import purpleFlowerFrame from '../assets/images/purple_flower_frame_pngwing.png'

// This const `drinks` will come from the backend
const drinks = [
  {
   
  },
  // More products...
]

function Cart() {
  return (
    <div className="min-h-screen min-w-screen justify-center bg-gradient-to-r from-white to-purple-400">

        {/* SVG Overlay */}
        <img src={purpleFlowerFrame} alt="purple flower frame png from pngwing.com" className="absolute w-screen h-screen z-5 opacity-5 pointer-events-none" />

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <h1 className="font-twinkle text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Your Orders</h1>

        <form className="mt-12">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">
              Your drink orders
            </h2>

            {/* Drink Order list */}
            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {drinks.map((drinks) => (
                <li key={drinks.id} className="flex py-6">
                  <div className="flex-shrink-0">
                    <img
                      src={drinks.imageSrc}
                      alt={drinks.imageAlt}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-sm">
                          <a href={drinks.href} className="font-medium text-gray-700 hover:text-gray-800">
                            {drinks.name}
                          </a>
                        </h4>
                        {/* Drink Price */}
                        <p className="ml-4 text-sm font-medium text-gray-900">{drinks.price}</p>
                      </div>
                      {/* Drink Size */}
                      <p className="mt-1 text-sm text-gray-500">{drinks.size}</p>
                    </div>

                    <div className="mt-4 flex flex-1 items-end justify-between">
                      <div className="ml-4">
                        <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section aria-labelledby="summary-heading" className="mt-10">
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>

            <div>
              <dl className="space-y-4">
                <div className="flex items-center justify-between font-gamja text-2xl">
                  <dt className="text-gray-900">Subtotal</dt>
                  <dd className="ml-4 text-gray-900">$15.00</dd>
                </div>
              </dl>
              <p className="mt-1 font-gamja text-xl text-gray-500">Shipping and taxes will be calculated at checkout.</p>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className="font-gamja text-2xl w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Checkout
              </button>
            </div>

            <div className="font-gamja text-xl mt-6 text-center">
              <p>
                or

                <div className="hover:underline">
                <Link to="/" className="font-gamja text-2xl mt-5 text-indigo-600 hover:text-indigo-500">
                    Continue order / back to drinks
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
                </div>
                
              </p>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}

export default Cart;