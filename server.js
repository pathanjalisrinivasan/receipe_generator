const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');
require('dotenv').config();
const Cache = require('./utils/cache');

const app = express();
const port = process.env.PORT || 3002;

// Initialize cache with 1-hour TTL
const recipeCache = new Cache(3600000);
const detailsCache = new Cache(3600000);
const similarCache = new Cache(3600000);

// Serve static files
app.use(express.static('public'));
app.use(express.json());

// Serve default favicon
app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

// Database connection
const db = new sqlite3.Database('./database/recipes.db');

// Map moods to Spoonacular query parameters
const moodToQuery = {
    happy: { cuisine: 'mediterranean,mexican', type: 'main course', diet: 'none' },
    sad: { type: 'comfort food,dessert', cuisine: 'american,italian', diet: 'none' },
    tired: { type: 'breakfast,snack', diet: 'high-protein', maxReadyTime: 20 },
    stressed: { type: 'soup,salad', diet: 'vegetarian', maxReadyTime: 30 },
    romantic: { cuisine: 'french,italian', type: 'main course', diet: 'none' }
};

// Get recipes by mood using Spoonacular with caching
app.get('/api/recipe/:mood', async (req, res) => {
    const mood = req.params.mood;
    const cacheKey = `mood-${mood}`;
    
    // Check cache first
    const cachedRecipes = recipeCache.get(cacheKey);
    if (cachedRecipes) {
        console.log(`Serving cached recipes for mood: ${mood}`);
        return res.json(cachedRecipes);
    }

    const query = moodToQuery[mood];
    
    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
            params: {
                apiKey: process.env.SPOONACULAR_API_KEY,
                ...query,
                addRecipeInformation: true,
                addRecipeNutrition: true,
                number: 10,
                instructionsRequired: true,
                fillIngredients: true
            }
        });

        const recipes = response.data.results.map(recipe => ({
            id: recipe.id,
            name: recipe.title,
            image_url: recipe.image,
            ingredients: recipe.extendedIngredients
                .map(ing => ing.original)
                .join(', '),
            instructions: recipe.analyzedInstructions[0]?.steps
                .map(step => step.step)
                .join(' '),
            prep_time: `${recipe.readyInMinutes} minutes`,
            cuisine: recipe.cuisines[0] || 'International',
            calories: Math.round(recipe.nutrition.nutrients.find(n => n.name === "Calories").amount),
            difficulty: recipe.readyInMinutes <= 30 ? 'Easy' : 
                       recipe.readyInMinutes <= 60 ? 'Medium' : 'Hard',
            mood: mood,
            diets: recipe.diets.join(', '),
            servings: recipe.servings,
            healthScore: recipe.healthScore
        }));

        // Cache the results
        recipeCache.set(cacheKey, recipes);
        console.log(`Caching recipes for mood: ${mood}`);

        res.json(recipes);
    } catch (error) {
        console.error('Spoonacular API Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
});

// Get recipe details endpoint with caching
app.get('/api/recipe/details/:id', async (req, res) => {
    const recipeId = req.params.id;
    const cacheKey = `details-${recipeId}`;

    // Check cache first
    const cachedDetails = detailsCache.get(cacheKey);
    if (cachedDetails) {
        console.log(`Serving cached details for recipe: ${recipeId}`);
        return res.json(cachedDetails);
    }

    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
            params: {
                apiKey: process.env.SPOONACULAR_API_KEY
            }
        });

        // Cache the results
        detailsCache.set(cacheKey, response.data);
        console.log(`Caching details for recipe: ${recipeId}`);

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get similar recipes with caching
app.get('/api/recipe/similar/:id', async (req, res) => {
    const recipeId = req.params.id;
    const cacheKey = `similar-${recipeId}`;

    // Check cache first
    const cachedSimilar = similarCache.get(cacheKey);
    if (cachedSimilar) {
        console.log(`Serving cached similar recipes for: ${recipeId}`);
        return res.json(cachedSimilar);
    }

    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/similar`, {
            params: {
                apiKey: process.env.SPOONACULAR_API_KEY,
                number: 5
            }
        });

        // Cache the results
        similarCache.set(cacheKey, response.data);
        console.log(`Caching similar recipes for: ${recipeId}`);

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cache cleanup endpoint (optional, for maintenance)
app.post('/api/cache/clear', (req, res) => {
    recipeCache.clear();
    detailsCache.clear();
    similarCache.clear();
    res.json({ message: 'Cache cleared successfully' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 