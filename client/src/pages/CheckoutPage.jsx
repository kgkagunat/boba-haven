import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const test = [
    {
      id: 1,
      name: 'TEST TEST',
      href: '#',
      price: '46.00',
      color: 'TEST',
      size: 'TEST',
      imageSrc: '',
      imageAlt: '',
    },
    // More products...
  ]
  
function CheckoutPage() {
    return (
        <div className="bg-white">

        {/* Background color split screen for large screens */}
        <div className="fixed left-0 top-0 hidden h-full w-1/2 bg-gradient-to-t from-pink-200 to-white lg:block" aria-hidden="true" />
        <div className="fixed right-0 top-0 hidden h-full w-1/2 bg-gradient-to-t from-indigo-900 to-purple-700 lg:block" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 lg:pt-16">
            <h1 className="sr-only">Checkout</h1>


            {/* Background color split screen for small screens */}
            <section
            aria-labelledby="summary-heading"
            className="bg-gradient-to-t from-indigo-900 to-purple-700 py-12 text-indigo-300 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pb-24 lg:pt-0"
            >

            {/* Order summary */}
            <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                <h2 id="summary-heading" className="sr-only">
                Order summary
                </h2>

                <dl>
                <dt className="font-gamja text-2xl font-bold text-blue-200">Amount due</dt>
                <dd className="font-gamja mt-1 text-3xl font-bold tracking-tight text-white">$10.00</dd>
                </dl>

                <ul role="list" className="font-gamja text-2xl divide-y divide-white divide-opacity-10">
                {test.map((product) => (
                    <li key={product.id} className="flex items-start space-x-4 py-6">
                    <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-20 w-20 flex-none rounded-md object-cover object-center"
                    />
                    <div className="flex-auto space-y-1">
                        <h3 className="text-white">{product.name}</h3>
                        <p>{product.color}</p>
                        <p>{product.size}</p>
                    </div>
                    <p className="flex-none text-white">{product.price}</p>
                    </li>
                ))}
                </ul>

                <dl className="font-gamja text-2xl space-y-6 border-t border-white border-opacity-10 pt-6">
                <div className="flex items-center text-blue-200 justify-between">
                    <dt>Subtotal</dt>
                    <dd>$7.00</dd>
                </div>

                <div className="flex items-center text-blue-200 justify-between">
                    <dt>Shipping</dt>
                    <dd>$2.00</dd>
                </div>

                <div className="flex items-center text-blue-200 justify-between">
                    <dt>Taxes</dt>
                    <dd>$5.20</dd>
                </div>

                <div className="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white">
                    <dt className="font-twinkle text-4xl">Total</dt>
                    <dd className="font-twinkle text-4xl">$80.12</dd>
                </div>
                </dl>
            </div>
            </section>




            {/* Background color split screen for small screens */}
            <section
            aria-labelledby="payment-and-shipping-heading"
            className="bg-gradient-to-t from-pink-200 to-white py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pb-24 lg:pt-0"
            >
            <h2 id="payment-and-shipping-heading" className="sr-only">
                Payment and shipping details
            </h2>

            {/* Payment details */}
            <form>
                <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                <div>
                    <h3 id="contact-info-heading" className="font-twinkle text-3xl font-bold text-black">
                    Contact information
                    </h3>

                    <div className="mt-6">
                    <label htmlFor="email-address" className="block font-gamja text-2xl text-gray-700">
                        Email address
                    </label>
                    <div className="mt-1">
                        <input
                        type="email"
                        id="email-address"
                        name="email-address"
                        autoComplete="email"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    </div>
                </div>

                <div className="mt-10">
                    <h3 className="font-twinkle text-3xl font-bold text-black">Payment details</h3>

                    <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                    <div className="col-span-3 sm:col-span-4">
                        <label htmlFor="card-number" className="block font-gamja text-2xl text-gray-700">
                        Card number
                        </label>
                        <div className="mt-1">
                        <input
                            type="text"
                            id="card-number"
                            name="card-number"
                            autoComplete="cc-number"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>
                    </div>

                    <div className="col-span-2 sm:col-span-3">
                        <label htmlFor="expiration-date" className="block font-gamja text-2xl text-gray-700">
                        Expiration date (MM/YY)
                        </label>
                        <div className="mt-1">
                        <input
                            type="text"
                            name="expiration-date"
                            id="expiration-date"
                            autoComplete="cc-exp"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="cvc" className="block font-gamja text-2xl text-gray-700">
                        CVC
                        </label>
                        <div className="mt-1">
                        <input
                            type="text"
                            name="cvc"
                            id="cvc"
                            autoComplete="csc"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>
                    </div>
                    </div>
                </div>

                <div className="mt-10">
                    <h3 className="font-twinkle text-3xl font-bold text-black">Shipping address</h3>

                    <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                    <div className="sm:col-span-3">
                        <label htmlFor="address" className="block font-gamja text-2xl text-gray-700">
                        Address
                        </label>
                        <div className="mt-1">
                        <input
                            type="text"
                            id="address"
                            name="address"
                            autoComplete="street-address"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="city" className="block font-gamja text-2xl text-gray-700">
                        City
                        </label>
                        <div className="mt-1">
                        <input
                            type="text"
                            id="city"
                            name="city"
                            autoComplete="address-level2"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="region" className="block font-gamja text-2xl text-gray-700">
                        State / Province
                        </label>
                        <div className="mt-1">
                        <input
                            type="text"
                            id="region"
                            name="region"
                            autoComplete="address-level1"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="postal-code" className="block font-gamja text-2xl text-gray-700">
                        Postal code
                        </label>
                        <div className="mt-1">
                        <input
                            type="text"
                            id="postal-code"
                            name="postal-code"
                            autoComplete="postal-code"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>
                    </div>
                    </div>
                </div>

                <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                    <button
                    type="submit"
                    className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-gamja text-2xl text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                    Pay now
                    </button>
                </div>
                <div className="flex justify-center font-gamja text-xl hover:text-pink-400 transform transition-transform duration-200 hover:scale-110 mt-8">
                    <Link to="/">
                        Click me to go back home 
                        <FontAwesomeIcon icon={faHome} />
                    </Link>
                </div>

                </div>
            </form>
            </section>
        </div>
        </div>
    )
}

export default CheckoutPage;
  