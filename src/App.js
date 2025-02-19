import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './pages/navbar';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import AddRecipe from './pages/addRecipe';
import MyRecipe from './pages/myRecipe';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("loggedInUser") === "true"; // Fix login persistence
  });

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("loggedInUser", "true");
    } else {
      localStorage.removeItem("loggedInUser"); // Ensures proper logout
    }
  }, [isLoggedIn]);

  const [recipes, setRecipes] = useState(() => {
    return JSON.parse(localStorage.getItem("recipes")) || [];
  });

  useEffect(() => {
  if (recipes.length > 0) { // Prevent unnecessary localStorage writes
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }
}, [recipes]);

  const handleAddRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  return (
    <Router>
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />} {/* Navbar appears only when logged in */}

      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />

        {/* 🔒 Protected Routes - Redirect to Login if not authenticated */}
        <Route path="/" element={isLoggedIn ? <Home recipes={recipes} /> : <Navigate to="/login" />} />
        <Route path="/add-recipe" element={isLoggedIn ? <AddRecipe onAddRecipe={handleAddRecipe} /> : <Navigate to="/login" />} />
        <Route path="/my-recipes" element={isLoggedIn ? <MyRecipe recipes={recipes} setRecipes={setRecipes} /> : <Navigate to="/login" />} />

        {/* Catch-all route to redirect unknown paths to Home or Login */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
