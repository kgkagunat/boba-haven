import React from 'react'
import backgroundImage from '../assets/images/hand-drawn-butterfly-outline-background/butterfly_wallpaper.jpg' // From freepik.com, by freepik
import confettiImage from '../assets/images/confetti_pngwing.png'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const people = [
    {
      name: 'Dani',
      role: 'Senior Boba-barista',
      imageUrl:'',
    },
    {
      name: 'Priyanka',
      role: 'CEO',
      imageUrl:'',
    },
    {
      name: 'Jose',
      role: 'Boba-barista',
      imageUrl:'',
    },
    // More people added here...
  ]
  
function About() {
    return (
      <div className="bg-gray-900 min-h-screen flex justify-center items-center" style={{ backgroundImage: `url(${backgroundImage})` }}>

        {/* SVG Overlay */}
        <img src={confettiImage} alt="confetti png from pngwing.com" className="absolute max-w-screen max-h-screen z-10 opacity-10" />

        <div className="absolute z-20 mt-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-twinkle text-3xl font-bold tracking-tight text-black sm:text-4xl slide-in-top">Meet our Bubble Haven team</h2>
            <p className="font-gamja text-3xl mt-4 leading-8 text-black slide-in-top-2">
              Crafting Boba Bliss and Brewing Smiles, One Sip at a Time
            </p>
            <div className="font-gamja text-2xl mt-4 hover:text-pink-400 transform transition-transform duration-200 slide-in-top-2 hover:scale-110">
            <Link to="/" className="">
                Click me to go back home 
                <FontAwesomeIcon icon={faHome} className="mr-2" />
            </Link>
            </div>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 mb-4 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8 slide-in-top-2"
          >
            {people.map((person) => (
              <li key={person.name} className="rounded-2xl bg-gray-700 px-8 py-10">
                <img className="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56" src={person.imageUrl} alt="" />
                <h3 className="font-gamja text-3xl mt-6 leading-7 tracking-tight text-white">{person.name}</h3>
                <p className="font-gamja text-xl leading-6 text-gray-400">{person.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

export default About;
  