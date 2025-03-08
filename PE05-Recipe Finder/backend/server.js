const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://lakshmanaakarsh:Akarsh4419*@cs628akarsh.ldeev.mongodb.net/recipes?retryWrites=true&w=majority", {
    dbName: "recipes",
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("MongoDB connection error:", error));
const recipeSchema = new mongoose.Schema({ //defining schemas for recipes
    name: String,
    ingredients: [String],
    instructions: String,
});
const Recipe = mongoose.model("Recipe", recipeSchema, "recipes"); 
app.get("/recipes", async (req, res) => { //route to fetch all recipes
    const recipes = await Recipe.find();
    res.json(recipes);
});
app.post("/recipes", async (req, res) => {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.json(newRecipe);
});
app.delete("/recipes/:id", async (req, res) => { //route to delete a recipe
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted" });
});
app.put("/recipes/:id", async (req, res) => {
    try {
        const recipeId = req.params.id;
        const updatedData = req.body;
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, updatedData, { new: true });
        res.json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ error: "Error updating recipe" });
    }
});
app.listen(5000, () => console.log("Server running on port 5000")); //use port 5000
