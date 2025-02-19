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
    return localStorage.getItem("loggedInUser") !== null;
  });

  // ✅ Save login state when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("loggedInUser", "true");
    }
  }, [isLoggedIn]);

  const [recipes, setRecipes] = useState(() => {
    return JSON.parse(localStorage.getItem("recipes")) || [];
  });

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const handleAddRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  return (
    <Router>
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />} {/* Show Navbar only when logged in */}

      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />

        {/* 🔒 Protected Routes (Redirects to Login if not logged in) */}
        <Route path="/" element={isLoggedIn ? <Home recipes={recipes} /> : <Navigate to="/login" />} />
        <Route path="/add-recipe" element={isLoggedIn ? <AddRecipe onAddRecipe={handleAddRecipe} /> : <Navigate to="/login" />} />
        <Route path="/my-recipes" element={isLoggedIn ? <MyRecipe recipes={recipes} setRecipes={setRecipes} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
