import React, { useState } from 'react';

// This function is the `Carousel`
// This will 100% be changed. This is just for "show". Full on replace
function CardDrink() {

  // `const fruits` will need to be placed on the backend(or server) in the future.
  const fruits = [
    { name: "Black Sesame", description: "Crunchy and sweet.", calories: "95 kcal" },
    { name: "Brown Sugar", description: "Soft and sweet.", calories: "105 kcal" },
    { name: "Honeydew", description: "Juicy and sweet.", calories: "45 kcal" },
    { name: "Jasmine", description: "Soft and sweet.", calories: "105 kcal" },
    { name: "Lychee", description: "Bitter and sweet.", calories: "105 kcal" },
    { name: "Mango", description: "Soft and sweet.", calories: "105 kcal" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextFruit = () => {
    if (currentIndex < fruits.length - 3) setCurrentIndex(prevIndex => prevIndex + 1);
  }

  const prevFruit = () => {
    if (currentIndex > 0) setCurrentIndex(prevIndex => prevIndex - 1);
  }

  const visibleFruits = fruits.slice(currentIndex, currentIndex + 3);

  return (
    <div className="flex flex-col items-center w-full bg-purple-100 ">

      {/* Title */}
      <h1 className="font-gamja text-4xl font-semibold mb-6">Our Ingredients</h1>

      <div className="relative flex items-center w-full">
        <button onClick={prevFruit}>&lt;</button>

        {/* Masked View */}
        <div className="overflow-x-hidden w-full bg-purple-100">
          <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * (100 / 3)}vw)` }}>
            {fruits.map((fruit, index) => (
              <div key={index} className="w-1/3 mx-2 border border-gray-400 rounded shadow-md p-4 m-5 bg-gradient-to-b from-yellow-100">
                <h2 className="font-gamja text-xl font-bold">{fruit.name}</h2>
                <p className="font-gamja text-lg">{fruit.description}</p>
                <p className="mt-2 text-xs text-gray-500">{fruit.calories}</p>
              </div>
            ))}
          </div>
        </div>

        <button onClick={nextFruit}>&gt;</button>
      </div>
    </div>
  );
}

export default CardDrink;
