import React from 'react';
import HeroPic from '../assets/images/cute_pics_1/cutebubble1.jpg';
import goldenFlower from '../assets/images/gold_flower_pngwing.png'

function Hero() {
    return (
        <div className="relative isolate overflow-hidden bg-gradient-to-r from-pink-100 to-pink-300 z-0">

            {/* SVG Overlay */}
            <img src={goldenFlower} alt="confetti png from pngwing.com" className="absolute z-5 w-full opacity-10" style={{ WebkitUserDrag: 'none', userDrag: 'none' }} />

            <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">

                {/* Hero Text */}
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                    <div className="mt-24 sm:mt-32 lg:mt-16">
                </div>
                <h1 className="font-twinkle mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl slide-in-left">
                    Where every drink tells a story and every sip is your adventure!
                </h1>
                <p className="font-gamja mt-6 text-xl leading-8 text-black slide-in-left-2">
                    Whether you're a boba aficionado or new to the exciting world of boba, our curated selection of drinks will promise a splash of excitement and a whirlwind of flavors.
                </p>
                
                {/* Order Button */}
                <div className="mt-10 flex items-center gap-x-6">
                    <a
                    href="#drink-menu"
                    className="font-gamja text-2xl rounded-md bg-indigo-600 px-3.5 py-2.5 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-00 slide-in-left-2"
                    >
                    Order Now
                    </a>
                </div>
                </div>

                {/* Hero Image */}
                <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32 slide-in-right">
                    <div className="mx-auto mt-16 flex max-w-md sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:flex-none xl:ml-32">
                        <div className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:p-4">
                            <img
                                src={HeroPic}
                                alt="Boba Hero Image - Created by: pikisuperstar - Freepik.com"
                                className="w-full object-cover object-center rounded-md shadow-2xl ring-1 ring-gray-900/10"
                                style={{ WebkitUserDrag: 'none', userDrag: 'none' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;