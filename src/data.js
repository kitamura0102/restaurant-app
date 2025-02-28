import { v4 as uuidv4 } from "uuid";

export const menuArray = [
  {
    name: "Pizza",
    ingredients: ["pepperoni", "mushrom", "mozarella"],
    price: 14,
    emoji: "🍕",
    uuid: uuidv4(),
    
  },
  {
    name: "Hamburger",
    ingredients: ["beef", "cheese", "lettuce"],
    price: 12,
    emoji: "🍔",
    uuid: uuidv4(),
    
  },
  {
    name: "Beer",
    ingredients: ["grain, hops, yeast, water"],
    price: 6,
    emoji: "🍺",
    uuid: uuidv4(),
    
  },
];
