import React, { useState } from 'react';

const Home = ({ recipes }) => {
    const [comments, setComments] = useState({});

    // Handle comment input
    const handleCommentChange = (index, value) => {
        setComments((prev) => ({
            ...prev,
            [index]: value
        }));
    };

    // Handle comment submission
    const addComment = (index) => {
        alert(`Comment added: ${comments[index]}`);
        setComments((prev) => ({ ...prev, [index]: "" })); // Clear input after submission
    };

    // Handle sharing
    const shareRecipe = (recipe) => {
        const shareText = `Check out this recipe: ${recipe.title} 🍽️\nTime: ${recipe.time} mins\nIngredients: ${recipe.ingredients.join(", ")}\nInstructions: ${recipe.instructions}`;
        navigator.clipboard.writeText(shareText);
        alert("Recipe copied! Share it with anyone.");
    };

    return (
        <div className="home-container">
            <h1 style={{ color: "blue", backgroundColor: "orange" }}>Home Page</h1>

            {recipes.length === 0 ? (
                <p style={{ color: "blue", backgroundColor: "orange" }}>No recipes added yet. Click "Add Recipe" to create one.</p>
            ) : (
                <div className="recipe-list">
                    {recipes.map((recipe, index) => (
                        <div key={index} className="recipe-card">
                            <h2>{recipe.title}</h2>
                            {recipe.file && <img src={recipe.file} alt={recipe.title} className="recipe-image" />}
                            <p><strong>Time:</strong> {recipe.time} minutes</p>
                            <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
                            <p><strong>Instructions:</strong> {recipe.instructions}</p>

                            {/* Comment Section */}
                            <div className="comment-section">
                                <h4>Comments:</h4>
                                <input
                                    type="text"
                                    placeholder="Write a comment..."
                                    value={comments[index] || ""}
                                    onChange={(e) => handleCommentChange(index, e.target.value)}
                                />
                                <button onClick={() => addComment(index)}>Post</button>
                            </div>

                            {/* Share Options */}
                            <div className="share-section">
                                <button onClick={() => shareRecipe(recipe)}>📋 Copy Recipe</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
