import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./recipe.css";

function RecipeList({ recipes }) { // function for recipe list
    let recipeElements = [];
    for (let i = 0; i < recipes.length; i++) {
        recipeElements.push(
            <div key={recipes[i]._id}>
                <Link to={`/recipes/${recipes[i]._id}`}>{recipes[i].name}</Link>
            </div>
        );
    }
    return (
        <div>
            <h2>Recipe List</h2>
            {recipeElements}
        </div>
    );
}
function RecipeDetails({ recipes, setRecipes }) { // function for recipe details
    const { id } = useParams();
    const navigate = useNavigate();
    const recipe = recipes.find((recipe) => recipe._id == id);
    if (!recipe) {
        return <p>Recipe is not available</p>;
    }
    const handleDelete = async () => {
        try {
            await axios.delete(`https://silver-parakeet-g97pvgprvqq3pv9r-5000.app.github.dev/recipes/${id}`);
            setRecipes((prevRecipes) => prevRecipes.filter((r) => r._id !== id));
            navigate("/recipes");
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    };
    return (
        <div>
        <h2>{recipe.name} Details</h2>
        <p>Ingredients: {recipe.ingredients.join(", ")}</p>
        <p>Instructions: {recipe.instructions}</p>
        <button onClick={() => navigate(`/edit-recipe/${id}`)}>Edit Recipe</button>
        <button onClick={handleDelete}>Delete Recipe</button>
        </div>
    );
}
function EditRecipe({ setRecipes, recipes }) { // function to edit recipe details
    const { id } = useParams();
    const navigate = useNavigate();
    const existingRecipe = recipes.find(recipe => recipe._id == id) || { name: "", ingredients: "", instructions: "" };
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedRecipe = { 
            name, 
            ingredients: ingredients.split(",").map(item => item.trim()), 
            instructions 
        };
        try {
            await axios.put(`https://automatic-enigma-x55g6prw4rv2676p-5000.app.github.dev/recipes/${id}`, updatedRecipe);
            setRecipes(prevRecipes => prevRecipes.map(r => (r._id == id ? {r, updatedRecipe} : r)));
            navigate("/recipes");
        } catch (error) {
            console.error("Error updating recipe:", error);
        }
    };
    return (
        <div>
        <h2>Edit Recipe</h2>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
        <br />
        <label>Ingredients:</label>
        <input value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        <br />
        <label>Instructions:</label>
        <input value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
        <br />
        <button onClick={handleSubmit}>Update Recipe</button>
        </div>
    );
}
function AddRecipe({ setRecipes }) {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRecipe = { name, ingredients: ingredients.split(","), instructions };
        try {
            const response = await axios.post("https://silver-parakeet-g97pvgprvqq3pv9r-5000.app.github.dev/recipes", newRecipe);
            setRecipes(prevRecipes => [prevRecipes, response.data]);
            navigate("/recipes");
        } catch (error) {
            console.error("Error adding recipe:", error);
        }
    };
    return (
        <div>
        <h2>Add Recipe</h2>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
        <br />
        <label>Ingredients:</label>
        <input value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        <br />
        <label>Instructions:</label>
        <input value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
        <br />
        <button onClick={handleSubmit}>Add Recipe</button>
        </div>
    );
}
function App() {
    const [recipes, setRecipes] = useState([]); // useState to hold list of recipes
    const fetchRecipes = async () => {
        try {
            const response = await axios.get("https://automatic-enigma-x55g6prw4rv2676p-5000.app.github.dev/recipes");
            setRecipes(response.data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };
    return (
        <Router>
            <div>
            <h1>Recipe Finder</h1>
            <nav>
            <Link to="/recipes">Recipe List</Link>
            <Link to="/add-recipe">Add Recipe</Link>
            </nav>
            <Routes>
            <Route path="/recipes" element={<RecipeList recipes={recipes} />} />
            <Route path="/recipes/:id" element={<RecipeDetails recipes={recipes} setRecipes={setRecipes} />} />
            <Route path="/add-recipe" element={<AddRecipe setRecipes={setRecipes} />} />
            <Route path="/edit-recipe/:id" element={<EditRecipe setRecipes={setRecipes} recipes={recipes} />} />
            </Routes>
            </div>
        </Router>
    );
}
export default App;
