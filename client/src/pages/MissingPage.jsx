import React from 'react';
import { Link } from 'react-router-dom';
import CuteGirl from '../assets/images/Cute_girl_holding-by_mamewym_freepix.com_.jpg'
import goldFlowerFrame from '../assets/images/gold_flower_frame_pngwing.png'

function MissingPage() {
    return (
      <>
        <main className="flex flex-col items-center justify-center min-h-screen bg-white px-6 py-24 sm:py-32 lg:px-8">

        {/* SVG Overlay */}
        <img src={goldFlowerFrame} alt="gold flower frame png from pngwing.com" className="absolute w-screen h-screen z-5 opacity-25 pointer-events-none" />

          <div className="text-center">
            <p className="font-gamja text-3xl font-semibold text-indigo-600">404</p>

            <h1 className="mt-4 font-twinkle text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>

            <img className='mt-2 block mx-auto max-w-lg w-full justify-center pointer-events-none' src={CuteGirl} alt='cute girl holding phone, by: mamewmy from freepik.com'></img>

            <p className="mt-6 font-gamja text-3xl leading-7 text-gray-600">Uh Oh!?</p>
            <p className="mt-6 font-gamja text-2xl leading-7 text-gray-600">The page you are looking for doesn't exist or is currently in progress.</p>
            
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                className="font-gamja rounded-md bg-indigo-600 px-3.5 py-2.5 text-2xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </>
    )
}

export default MissingPage;
