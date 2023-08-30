import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrinkDispatch } from '../utils/DrinkContext';
import { ACTIONS } from '../utils/drinkReducer';


// Image imports
import blackSesameMilkTea from '../assets/images/Drinks_pics/Black Sesame Milk Tea.png';
import brownSugarMilkTea from '../assets/images/Drinks_pics/Brown Sugar Milk Tea.png';
import honeyDewMilkTea from '../assets/images/Drinks_pics/Honeydew Milk Tea.png';
import jasmineMilkTea from '../assets/images/Drinks_pics/Jasmine Milk Tea.png';
import lycheeMilkTea from '../assets/images/Drinks_pics/Lychee Milk Tea.png';
import mangoMilkTea from '../assets/images/Drinks_pics/Mango Milk Tea.png';
import matchaGreenTea from '../assets/images/Drinks_pics/Matcha Green Tea.png';
import strawberryMilkTea from '../assets/images/Drinks_pics/Strawberry Milk Tea.png';
import taroMilkTea from '../assets/images/Drinks_pics/Taro Milk Tea.png';
import thaiMilkTea from '../assets/images/Drinks_pics/Thai Milk Tea.png';

const DrinkMenu = ({ id = "default-id" }) => {
  const dispatch = useDrinkDispatch();
  const navigate = useNavigate();

  // `const drinks` will need to be placed on the backend(or server) in the future.
  const drinks = [
    { name: "Black Sesame Milk Tea", description: "Taste the mystique of roasted sesame in a milky blend! Dive deep into the luscious, velvety flavor of an ancient seed.", price: "$4.50", image: blackSesameMilkTea },
    { name: "Brown Sugar Milk Tea", description: "Indulge in the caramelized goodness of brown sugar. A nostalgic sip that'll remind you of sweet childhood memories!", price: "$4.75", image: brownSugarMilkTea },
    { name: "Honeydew Milk Tea", description: "Experience a refreshing splash of summer with every sip! Honeydew's subtle sweetness is a dream in creamy liquid form.", price: "$4.95", image: honeyDewMilkTea },
    { name: "Jasmine Milk Tea", description: "Elegance in a cup! Let the fragrant allure of jasmine blossoms whisk you away on an aromatic journey.", price: "$4.25", image: jasmineMilkTea },
    { name: "Lychee Milk Tea", description: "Tropical delight! Dance to the rhythm of island vibes with the exotic taste of lychee pearls.", price: "$5.00", image: lycheeMilkTea },
    { name: "Mango Milk Tea", description: "A tropical treasure! Dive into the sun-kissed sweetness of ripe mangoes, blended to perfection.", price: "$5.10", image: mangoMilkTea },
    { name: "Matcha Green Tea", description: "Awaken your senses! Dive into the earthy richness of matcha, a timeless Japanese classic.", price: "$4.80", image: matchaGreenTea },
    { name: "Strawberry Milk Tea", description: "A rosy rendezvous! Sip on the pure, sweet essence of farm-fresh strawberries and cream.", price: "$4.90", image: strawberryMilkTea },
    { name: "Taro Milk Tea", description: "A sip of purple magic! Let the creamy, nutty flavors of taro transport you to a realm of flavor fantasy.", price: "$4.70", image: taroMilkTea },
    { name: "Thai Milk Tea", description: "A journey to Thailand in a cup! Embrace the rich and creamy symphony of spices and sweetness.", price: "$4.85", image: thaiMilkTea },
  ];

  return (
    <div id={id} className="p-4 bg-gradient-to-b from-purple-100 to-white">
      <h2 className="font-gamja text-4xl font-semibold mb-6 flex justify-center slide-in-bottom">Drink Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 slide-in-bottom">
        {drinks.map((drink, index) => (
          <div 
            onClick={() => {
              dispatch({ type: ACTIONS.SET_SELECTED_DRINK, payload: drink });
              navigate(`/drinks/${index}`);  // <-- Updated this line
            }}
            key={index}
            className="border border-3 border-slate-300 rounded-lg p-4 shadow-xl hover:animate-subtleBounce cursor-pointer"
          >
            <img src={drink.image} rel='preload' alt={drink.name} className="w-full w object-cover rounded mb-4" />
            <h3 className="font-gamja text-xl font-bold">{drink.name}</h3>
            <p className="font-gamja text-lg">{drink.description}</p>
            <p className="mt-2 font-bold">{drink.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DrinkMenu