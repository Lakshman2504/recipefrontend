import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddRecipe({ onAddRecipe }) {
    const [recipeData, setRecipeData] = useState({
        title: '',
        time: '',
        ingredients: '',
        instructions: '',
        file: null
    });
    const navigate = useNavigate();

    const onHandleChange = (e) => {
        const { name, value, files } = e.target;

        let val;
        if (name === "ingredients") {
            val = value.split(",");
        } else if (name === "file") {
            val = files[0] ? URL.createObjectURL(files[0]) : null; // ✅ Convert file to URL
        } else {
            val = value;
        }

        setRecipeData((prev) => ({ ...prev, [name]: val }));
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();

        // ✅ Get existing recipes from localStorage
        const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

        // ✅ Add new recipe to the array
        const updatedRecipes = [...storedRecipes, recipeData];

        // ✅ Save to localStorage
        localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

        // ✅ Update global state
        onAddRecipe(recipeData);

        // ✅ Navigate to My Recipes page
        navigate("/my-recipes");
    };
    

    return (
        <div className='container'>
            <h2 className='form-title'>Add a New Recipe</h2>
            <form className='form' onSubmit={onHandleSubmit}>
                <div className='form-control'>
                    <label>Title</label>
                    <input type="text" 
                            name="title" 
                            placeholder="Enter recipe title"
                            onChange={onHandleChange} required />
                </div>
                <div className='form-control'>
                    <label>Time (in minutes)</label>
                    <input type="number" 
                            name="time" 
                            placeholder="Enter recipe time"
                            onChange={onHandleChange} required />
                </div>
                <div className='form-control'>
                    <label>Ingredients</label>
                    <textarea name="ingredients" 
                              rows="4" 
                              placeholder="Enter recipe ingredients"
                              onChange={onHandleChange} required />
                </div>
                <div className='form-control'>
                    <label htmlFor="instructions">Instructions</label>
                    <textarea
                        id="instructions"
                        name="instructions"
                        placeholder="Enter cooking instructions"
                        rows="5"
                        onChange={onHandleChange}
                        required
                    />
                </div>
                <div className='form-control'>
                    <label>Recipe Image</label>
                    <input type="file" name="file" accept="image/*" onChange={onHandleChange} required />
                </div>
                <button type="submit" className='submit-btn'>Add Recipe</button>
            </form>
        </div>
    );
}
