require('dotenv').config();
const express = require("express");
const app = express();

const { Auth } = require("./middleware/auth");

app.use(express.json());

const PORT = process.env.PORT || 4001;

// Database (Array)
const FoodMenu = [
  { id: 1, food: "Chowmein", category: "veg", price: 500 },
  { id: 2, food: "Butter Naan", category: "veg", price: 100 },
  { id: 3, food: "Chicken", category: "non-veg", price: 1000 },
  { id: 4, food: "Mutton", category: "non-veg", price: 1500 },
  { id: 5, food: "Momo", category: "veg", price: 300 },
  { id: 6, food: "Chai", category: "veg", price: 50 },
  { id: 7, food: "Rajma", category: "veg", price: 300 },
  { id: 8, food: "Roti", category: "veg", price: 20 },
  { id: 9, food: "Lolipop", category: "non-veg", price: 700 },
  { id: 10, food: "Kebab", category: "non-veg", price: 400 },
  { id: 11, food: "Paneer", category: "veg", price: 800 },
  { id: 12, food: "Egg Curry", category: "non-veg", price: 300 },
  { id: 13, food: "Salad", category: "veg", price: 100 },
  { id: 14, food: "Shourma", category: "veg", price: 300 },
  { id: 15, food: "Butter Chicken", category: "non-veg", price: 900 },
  { id: 16, food: "Mushroom", category: "veg", price: 700 },
];

const cart = [];



// ✅ GET all food
app.get("/food", (req, res) => {
  res.status(200).json(FoodMenu);
});



// ✅ Protect admin routes
app.use("/admin", Auth);



// ✅ ADD food (Admin)
app.post("/admin", (req, res) => {
  const { id, food, category, price } = req.body;

  if (!id || !food || !category || !price) {
    return res.status(400).send("Missing fields");
  }

  const exists = FoodMenu.find(item => item.id === id);
  if (exists) {
    return res.status(409).send("Item with this ID already exists");
  }

  FoodMenu.push({ id, food, category, price });
  res.status(201).send("Item Added Successfully");
});



// ✅ DELETE food (Admin)
app.delete("/admin/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = FoodMenu.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).send("Item Doesn't Exist");
  }

  FoodMenu.splice(index, 1);
  res.status(200).send("Successfully Deleted");
});



// ✅ UPDATE food (PATCH - partial)
app.patch("/admin/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const fooddata = FoodMenu.find(item => item.id === id);

  if (!fooddata) {
    return res.status(404).send("Item not exist");
  }

  if (req.body.food) fooddata.food = req.body.food;
  if (req.body.category) fooddata.category = req.body.category;
  if (req.body.price) fooddata.price = req.body.price;

  res.status(200).send("Successfully Updated");
});



// ✅ ADD to cart (User)
app.post("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const foodItem = FoodMenu.find(item => item.id === id);

  if (!foodItem) {
    return res.status(404).send("Item Out of Stock");
  }

  const exists = cart.find(item => item.id === id);
  if (exists) {
    return res.status(409).send("Item already in cart");
  }

  cart.push(foodItem);
  res.status(200).send("Item added successfully");
});



// ✅ REMOVE from cart
app.delete("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = cart.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).send("Item is not present in cart");
  }

  cart.splice(index, 1);
  res.status(200).send("Item removed successfully");
});



// ✅ GET cart
app.get("/user", (req, res) => {
  if (cart.length === 0) {
    return res.status(200).send("Cart is Empty");
  }

  res.status(200).json(cart);
});



// Start server
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});