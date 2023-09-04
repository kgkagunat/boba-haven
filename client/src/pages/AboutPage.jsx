import React from 'react';
import backgroundImage from '../assets/images/hand-drawn-butterfly-outline-background/butterfly_wallpaper.jpg';
import confettiImage from '../assets/images/confetti_pngwing.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const people = [
  {
    name: 'Dani Chankhour',
    role: 'CEO',
    imageUrl: '',
  },
  {
    name: 'Priyanka Mary Christine',
    role: 'CEO',
    imageUrl: '',
  },
  {
    name: 'Kamauliola Agunat',
    role: 'Boba-Viruoso',
    imageUrl: '',
  },
  {
    name: 'Karina Valencia',
    role: 'Boba-Artisan',
    imageUrl: '',
  },
  {
    name: 'Jose Seto',
    role: 'Boba-Curator',
    imageUrl: '',
  },
  // More people added here...
];

function About() {
  return (
    <div
      className="bg-gray-900 min-h-screen flex flex-col justify-between items-center"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* SVG Overlay */}
      <img src={confettiImage} alt="confetti png from pngwing.com" className="absolute z-10 opacity-10 w-full h-full" />

      <div className="z-20 mt-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-twinkle text-3xl font-bold tracking-tight text-black sm:text-4xl slide-in-top">Meet our Bubble Haven team</h2>
          <p className="font-gamja text-3xl mt-4 leading-8 text-black slide-in-top-2">
            Crafting Boba Bliss and Brewing Smiles, One Sip at a Time
          </p>
          <div className="font-gamja text-2xl mt-4 hover:text-pink-400 transform transition-transform duration-200 slide-in-top-2 hover:scale-110">
            <Link to="/" className="">
              Click me to go back home <FontAwesomeIcon icon={faHome} />
            </Link>
          </div>
        </div>
        <ul
          role="list"
          className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8 slide-in-top-2"
        >
          {people.map((person) => (
            <li key={person.name} className="rounded-2xl bg-gray-700 px-6 py-8 sm:px-8">
              <img
                className="mx-auto h-48 w-48 md:h-48 md:w-48 rounded-full"
                src={person.imageUrl}
                alt={`Image of ${person.name}`}
              />
              <h3 className="font-gamja text-2xl mt-4 leading-6 text-white">{person.name}</h3>
              <p className="font-gamja text-lg leading-5 text-gray-400">{person.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default About;
