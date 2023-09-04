import React from 'react';
import backgroundImage from '../assets/images/hand-drawn-butterfly-outline-background/butterfly_wallpaper.jpg';
import confettiImage from '../assets/images/confetti_pngwing.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

// Image Imports
import daniImage from '../assets/images/About_pics/panda_pngwing.png';
import priyankaImage from '../assets/images/About_pics/cat_smile_pngwing.png';
import kamauliolaImage from '../assets/images/About_pics/koala_avatar_pngwing.png';
import karinaImage from '../assets/images/About_pics/kawaii_kitty_pngwing.png';
import joseImage from '../assets/images/About_pics/pig_illustration_pngwing.png';

const people = [
  {
    name: 'Dani Chankhour',
    role: 'CEO',
    imageUrl: daniImage,
    description: "Meet Dani Chankhour, the visionary behind Bubble Haven's sweet success! With an entrepreneurial spirit as vibrant as the boba pearls, Dani embarked on a journey to create a haven where every sip is a delightful escape.",
    imageUrlDescription: "panda avatar from pngwing.com",
  },
  {
    name: 'Priyanka Mary Christine',
    role: 'CEO',
    imageUrl: priyankaImage,
    description: "Priyanka Mary Christine, the other half of our dynamic CEO duo, brings her endless energy and a sprinkle of stardust to Bubble Haven. With her creative flair, she turns each boba cup into a work of art.",
    imageUrlDescription: "cat smile from pngwing.com",
  },
  {
    name: 'Kamauliola Agunat',
    role: 'Boba-Virtuoso',
    imageUrl: kamauliolaImage,
    description: "Kamauliola Agunat, our Boba-Virtuoso, dances through the kitchen like a maestro composing symphonies of flavor. Mixing, shaking, and stirring, Kamauliola turns simple tea into a masterpiece of joy.",
    imageUrlDescription: "koala avatar from pngwing.com",
  },
  {
    name: 'Karina Valencia',
    role: 'Boba-Artisan',
    imageUrl: karinaImage,
    description: "Karina Valencia, the Boba-Artisan, weaves magic with every tapioca pearl and tea infusion. Her hands craft boba drinks that are not only delicious but also beautiful enough to belong in an art gallery.",
    imageUrlDescription: "kawaii kitty from pngwing.com",
  },
  {
    name: 'Jose Seto',
    role: 'Boba-Curator',
    imageUrl: joseImage,
    description: "Jose Seto, the Boba-Curator, approaches each boba creation with the precision of a sommelier. With an uncanny knack for pairing flavors, Jose transforms sips into delightful adventures for your taste buds.",
    imageUrlDescription: "pig illustration from pngwing.com",
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
                alt={person.imageUrlDescription}
              />
              <h3 className="font-gamja text-3xl font-bold m-2 leading-6 text-white">{person.name}</h3>
              <p className="font-gamja text-2xl font-bold mt-2 leading-5 text-gray-400">{person.role}</p>
              <p className="font-gamja text-xl mt-2 leading-5 text-gray-400">{person.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default About;
