import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./recipe.css";

function RecipeList({ recipes }) {  
    return (
        <div>
            <h2>Recipe List</h2>
            {recipes.map((recipe) => (
                <div key={recipe._id}>
                    <Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
                </div>
            ))}
        </div>
    );
}

function RecipeDetails({ recipes, setRecipes }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const recipe = recipes.find((recipe) => recipe._id === id);

    // If recipe is not found, show a loading or error message
    if (!recipe) {
        return <p>Loading or Recipe not found...</p>;
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`https://fantastic-space-memory-x55g6prwxjq2v69x-5000.app.github.dev/recipes/${id}`);
            setRecipes((prevRecipes) => prevRecipes.filter((r) => r._id !== id));
            navigate("/recipes");
        } catch (error) {
            console.error("Error deleting recipe:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h2>{recipe.name} Details</h2>
            <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
            <button onClick={() => navigate(`/edit-recipe/${id}`)}>Edit Recipe</button>
            <button onClick={handleDelete} style={{ marginLeft: "10px", backgroundColor: "red" }}>Delete Recipe</button>
        </div>
    );
}


function EditRecipe({ setRecipes, recipes }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const existingRecipe = recipes.find(recipe => recipe._id === id) || { name: "", ingredients: "", instructions: "" };
    
    const [name, setName] = useState(existingRecipe.name);
    const [ingredients, setIngredients] = useState(existingRecipe.ingredients.join(", "));
    const [instructions, setInstructions] = useState(existingRecipe.instructions);

    useEffect(() => {
        setName(existingRecipe.name);
        setIngredients(existingRecipe.ingredients.join(", "));
        setInstructions(existingRecipe.instructions);
    }, [existingRecipe]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedRecipe = { name, ingredients: ingredients.split(","), instructions };

        try {
            await axios.put(`https://fantastic-space-memory-x55g6prwxjq2v69x-5000.app.github.dev/recipes/${id}`, updatedRecipe);
            setRecipes(recipes.map(r => (r._id === id ? { ...r, ...updatedRecipe } : r)));
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
            <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
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
            const response = await axios.post("https://fantastic-space-memory-x55g6prwxjq2v69x-5000.app.github.dev/recipes", newRecipe);
            setRecipes(prevRecipes => [...prevRecipes, response.data]);
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
            <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
            <br />
            <button onClick={handleSubmit}>Add Recipe</button>
        </div>
    );
}

function Recipe() {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get("https://fantastic-space-memory-x55g6prwxjq2v69x-5000.app.github.dev/recipes");
                setRecipes(response.data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };
        fetchRecipes();
    }, []);

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
export default Recipe;
