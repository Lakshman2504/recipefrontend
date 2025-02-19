import React, { useEffect, useState } from "react";

const MyRecipe = ({ recipes, setRecipes }) => {
    const [editIndex, setEditIndex] = useState(null);
    const [editedRecipe, setEditedRecipe] = useState({});

    // Load recipes from localStorage when page is visited
    useEffect(() => {
        const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
        setRecipes(storedRecipes);
    }, []);

    const handleEditClick = (index) => {
        setEditIndex(index);
        setEditedRecipe(recipes[index]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedRecipe((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveEdit = () => {
        const updatedRecipes = recipes.map((recipe, index) =>
            index === editIndex ? editedRecipe : recipe
        );

        setRecipes(updatedRecipes);
        localStorage.setItem("recipes", JSON.stringify(updatedRecipes)); // ✅ Save updates to localStorage
        setEditIndex(null);
    };

    const handleDelete = (index) => {
        const updatedRecipes = recipes.filter((_, i) => i !== index);
        setRecipes(updatedRecipes);
        localStorage.setItem("recipes", JSON.stringify(updatedRecipes)); // Remove from localStorage
    };

    return (
        <div className="my-recipes-container">
            <h1 style={{maxWidth:"800px",margin:"30px auto",textAlign:"center", color: "blue", backgroundColor: "orange" }}>My Recipes</h1>

            {recipes.length === 0 ? (
                <p style={{maxWidth:"800px",margin:"30px auto", textAlign:"center", color: "blue", backgroundColor: "orange" }}>No recipes added yet.</p>
            ) : (
                <div className="recipe-list">
                    {recipes.map((recipe, index) => (
                        <div key={index} className="recipe-card">
                            {editIndex === index ? (
                                <>
                                    <input type="text" name="title" value={editedRecipe.title} onChange={handleInputChange} />
                                    <input type="text" name="time" value={editedRecipe.time} onChange={handleInputChange} />
                                    <textarea name="ingredients" value={editedRecipe.ingredients.join(", ")} onChange={(e) => setEditedRecipe({ ...editedRecipe, ingredients: e.target.value.split(",") })} />
                                    <textarea name="instructions" value={editedRecipe.instructions} onChange={handleInputChange} />
                                    <button onClick={handleSaveEdit}>Save</button>
                                    <button onClick={() => setEditIndex(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <h2>{recipe.title}</h2>
                                    {recipe.file && <img src={recipe.file} alt={recipe.title} className="recipe-image" />}
                                    <p><strong>Time:</strong> {recipe.time} minutes</p>
                                    <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
                                    <p><strong>Instructions:</strong> {recipe.instructions}</p>
                                    <button onClick={() => handleEditClick(index)}>Edit</button>
                                    <button onClick={() => handleDelete(index)}>Delete</button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRecipe;
