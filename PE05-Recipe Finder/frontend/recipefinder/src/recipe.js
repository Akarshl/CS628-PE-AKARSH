import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
  });

  // For handling individual recipe details
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipes();
    if (id) {
      fetchRecipeDetails();
    }
  }, [id]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const fetchRecipeDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/recipes/${id}`);
      setRecipe(response.data);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    const recipeData = {
      name: newRecipe.name,
      ingredients: newRecipe.ingredients.split(",").map((ing) => ing.trim()),
      instructions: newRecipe.instructions,
    };

    try {
      await axios.post("http://localhost:5000/recipes", recipeData);
      setNewRecipe({ name: "", ingredients: "", instructions: "" }); // Reset form
      fetchRecipes(); // Refresh the recipe list
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/recipes/${id}`);
      navigate("/"); // Navigate back to recipe list
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div>
      <h2>Recipe List</h2>
      <Link to="/add">Add Recipe</Link>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <Link to={`/recipe/${recipe._id}`}>{recipe.name}</Link>
          </li>
        ))}
      </ul>

      <h3>Add New Recipe</h3>
      <form onSubmit={handleAddRecipe}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={newRecipe.name}
            onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Ingredients (comma separated):</label>
          <input
            type="text"
            value={newRecipe.ingredients}
            onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Instructions:</label>
          <textarea
            value={newRecipe.instructions}
            onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
            required
          ></textarea>
        </div>
        <button type="submit">Add Recipe</button>
      </form>

      {id && recipe && (
        <div>
          <h3>Recipe Details</h3>
          <h4>{recipe.name}</h4>
          <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
          <p><strong>Instructions:</strong> {recipe.instructions}</p>
          <button onClick={handleDelete}>Delete Recipe</button>
        </div>
      )}
    </div>
  );
}

export default Recipe;
