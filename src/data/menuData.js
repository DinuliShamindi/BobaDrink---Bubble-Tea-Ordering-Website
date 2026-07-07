export const MENU_DATA = [
  {
    id: "classic-milk-tea",
    name: "Classic Milk Tea",
    category: "milk-tea",
    price: 650,
    color: "#B08968",
    liquid: "#C9A27A",
    description: "Black tea steeped strong, rounded out with creamy milk. The one that started it all.",
    tags: ["Best seller"]
  },
  {
    id: "brown-sugar-boba",
    name: "Brown Sugar Boba",
    category: "milk-tea",
    price: 780,
    color: "#6B3E26",
    liquid: "#8A5A34",
    description: "Fresh milk marbled with hand-cooked brown sugar syrup and chewy pearls.",
    tags: ["Signature"]
  },
  {
    id: "taro-milk-tea",
    name: "Taro Milk Tea",
    category: "milk-tea",
    price: 720,
    color: "#7B5EA7",
    liquid: "#9B82C2",
    description: "Naturally nutty taro root blended into a silky lavender-purple milk tea.",
    tags: []
  },
  {
    id: "thai-milk-tea",
    name: "Thai Milk Tea",
    category: "milk-tea",
    price: 700,
    color: "#E2703A",
    liquid: "#EE8F5C",
    description: "Spiced Thai tea leaves, condensed milk, and a bold orange hue.",
    tags: []
  },
  {
    id: "matcha-milk-tea",
    name: "Matcha Milk Tea",
    category: "milk-tea",
    price: 750,
    color: "#5C7C58",
    liquid: "#7A9B76",
    description: "Stone-ground ceremonial matcha whisked with fresh milk, lightly sweetened.",
    tags: []
  },
  {
    id: "lychee-green-tea",
    name: "Lychee Green Tea",
    category: "fruit-tea",
    price: 680,
    color: "#E8879C",
    liquid: "#F2A9B6",
    description: "Jasmine green tea infused with fragrant lychee and real fruit bits.",
    tags: []
  },
  {
    id: "passionfruit-tea",
    name: "Passionfruit Tea",
    category: "fruit-tea",
    price: 700,
    color: "#E8A23A",
    liquid: "#F0B85F",
    description: "Tangy passionfruit pulp shaken with green tea over ice. Bright and citrusy.",
    tags: []
  },
  {
    id: "mango-pop-tea",
    name: "Mango Pop Tea",
    category: "fruit-tea",
    price: 720,
    color: "#F2A63A",
    liquid: "#F7C36B",
    description: "Ripe mango puree, black tea, and popping mango pearls that burst with juice.",
    tags: ["New"]
  },
  {
    id: "strawberry-yakult",
    name: "Strawberry Yakult",
    category: "fruit-tea",
    price: 690,
    color: "#E85D6B",
    liquid: "#F08893",
    description: "Muddled strawberries shaken with probiotic Yakult for a tart, milky finish.",
    tags: ["New"]
  },
  {
    id: "cheese-foam-oolong",
    name: "Cheese Foam Oolong",
    category: "specialty",
    price: 850,
    color: "#4A3B2A",
    liquid: "#6E5A42",
    description: "Roasted oolong crowned with a whipped, lightly salted cream-cheese foam.",
    tags: ["Signature"]
  },
  {
    id: "okinawa-milk-tea",
    name: "Okinawa Milk Tea",
    category: "specialty",
    price: 800,
    color: "#7A5230",
    liquid: "#9C7247",
    description: "Black sugar brown tea layered under fresh milk, finished with sea salt cream.",
    tags: []
  },
  {
    id: "black-sugar-fresh-milk",
    name: "Black Sugar Fresh Milk",
    category: "specialty",
    price: 730,
    color: "#3B2A20",
    liquid: "#5A4130",
    description: "No tea at all — just fresh milk striped with deep, smoky black sugar syrup.",
    tags: []
  }
];

export const CATEGORY_LABELS = {
  "milk-tea": "Milk Teas",
  "fruit-tea": "Fruit Teas",
  "specialty": "Specialty"
};

export const TOPPINGS = [
  { id: "pearls", name: "Tapioca Pearls", price: 0 },
  { id: "popping-boba", name: "Popping Boba", price: 60 },
  { id: "cheese-foam", name: "Cheese Foam", price: 120 },
  { id: "grass-jelly", name: "Grass Jelly", price: 60 },
  { id: "pudding", name: "Pudding", price: 80 },
  { id: "red-bean", name: "Red Bean", price: 60 }
];

export const SUGAR_LEVELS = ["0%", "25%", "50%", "75%", "100%"];
export const ICE_LEVELS = ["No Ice", "Less Ice", "Regular Ice", "Extra Ice"];

export function findDrink(id) {
  return MENU_DATA.find((d) => d.id === id);
}
