import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_DRINKS } from '../graphQL/queries'; 

const DrinkMenu = ({ id = "default-id" }) => {
  const navigate = useNavigate();

  // Fetch the drinks using Apollo Client's `useQuery` hook
  const { data, loading, error } = useQuery(GET_DRINKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // De-structure drinks data for cleaner usage
  const drinks = data.drinks;

  return (
    <div id={id} className="p-4 bg-gradient-to-b from-purple-100 to-white">
      <h2 className="font-gamja text-4xl font-semibold mb-6 flex justify-center slide-in-bottom">Drink Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 slide-in-bottom">
        {drinks.map((drink, index) => (
          <div 
            onClick={() => {
              navigate(`/drinks/${drink._id}`);  // Use the drink's ID instead of index
            }}
            key={drink._id}
            className="border border-3 border-slate-300 rounded-lg p-4 shadow-xl hover:animate-subtleBounce cursor-pointer"
          >
            <img src={drink.image} rel='preload' alt={drink.name} className="w-full w object-cover rounded mb-4" />
            <h3 className="font-gamja text-xl font-bold">{drink.name}</h3>
            <p className="font-gamja text-lg">{drink.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DrinkMenu;