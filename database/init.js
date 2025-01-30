const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/recipes.db');

// Drop existing table to update schema
db.run("DROP TABLE IF EXISTS recipes");

const recipes = [
    // Happy Mood Recipes
    {
        name: "Rainbow Pad Thai",
        ingredients: "Rice noodles, tofu, carrots, bell peppers, bean sprouts, peanuts, lime, tamarind sauce",
        instructions: "Soak noodles, stir-fry vegetables and tofu, combine with sauce, garnish with peanuts and lime",
        mood: "happy",
        prep_time: "30 minutes",
        cuisine: "Thai",
        image_url: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg",
        calories: 450,
        difficulty: "Medium"
    },
    {
        name: "Colorful Mediterranean Bowl",
        ingredients: "Quinoa, chickpeas, cherry tomatoes, cucumber, feta, olives, hummus, za'atar",
        instructions: "Cook quinoa, arrange vegetables and chickpeas, top with feta and za'atar",
        mood: "happy",
        prep_time: "20 minutes",
        cuisine: "Mediterranean",
        image_url: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        calories: 380,
        difficulty: "Easy"
    },
    
    // Sad Mood Recipes
    {
        name: "Ultimate Grilled Cheese",
        ingredients: "Sourdough bread, cheddar, gruyere, caramelized onions, butter",
        instructions: "Layer cheeses and onions between bread, grill until golden and melty",
        mood: "sad",
        prep_time: "15 minutes",
        cuisine: "American",
        image_url: "https://images.pexels.com/photos/4193870/pexels-photo-4193870.jpeg",
        calories: 520,
        difficulty: "Easy"
    },
    {
        name: "Creamy Tomato Soup",
        ingredients: "Tomatoes, cream, basil, garlic, onion, vegetable stock, butter",
        instructions: "Sauté vegetables, blend with stock, finish with cream and fresh basil",
        mood: "sad",
        prep_time: "35 minutes",
        cuisine: "Comfort",
        image_url: "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg",
        calories: 310,
        difficulty: "Medium"
    },
    
    // Tired Mood Recipes
    {
        name: "Energy Boost Smoothie Bowl",
        ingredients: "Banana, spinach, berries, chia seeds, almond milk, granola, honey",
        instructions: "Blend fruits with almond milk, top with granola and seeds",
        mood: "tired",
        prep_time: "10 minutes",
        cuisine: "Healthy",
        image_url: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg",
        calories: 280,
        difficulty: "Easy"
    },
    {
        name: "Quick Power Oatmeal",
        ingredients: "Oats, banana, peanut butter, cinnamon, maple syrup, walnuts",
        instructions: "Cook oats, stir in peanut butter and banana, top with walnuts",
        mood: "tired",
        prep_time: "8 minutes",
        cuisine: "Breakfast",
        image_url: "https://images.pexels.com/photos/4397910/pexels-photo-4397910.jpeg",
        calories: 340,
        difficulty: "Easy"
    },
    
    // Stressed Mood Recipes
    {
        name: "Calming Chamomile Pasta",
        ingredients: "Pasta, olive oil, garlic, lemon, parmesan, pine nuts, herbs",
        instructions: "Cook pasta, toss with olive oil, garlic, and herbs, top with pine nuts",
        mood: "stressed",
        prep_time: "20 minutes",
        cuisine: "Italian",
        image_url: "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg",
        calories: 410,
        difficulty: "Easy"
    },
    {
        name: "Mindful Miso Soup",
        ingredients: "Tofu, seaweed, green onions, miso paste, mushrooms, dashi",
        instructions: "Simmer dashi, dissolve miso, add tofu and vegetables",
        mood: "stressed",
        prep_time: "15 minutes",
        cuisine: "Japanese",
        image_url: "https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg",
        calories: 180,
        difficulty: "Easy"
    },
    
    // Romantic Mood Recipes
    {
        name: "Chocolate Covered Strawberries",
        ingredients: "Fresh strawberries, dark chocolate, white chocolate, sea salt",
        instructions: "Melt chocolates, dip strawberries, drizzle with contrasting chocolate",
        mood: "romantic",
        prep_time: "25 minutes",
        cuisine: "Dessert",
        image_url: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg",
        calories: 220,
        difficulty: "Medium"
    },
    {
        name: "Heart-Warming Risotto",
        ingredients: "Arborio rice, mushrooms, white wine, parmesan, butter, truffle oil",
        instructions: "Gradually add stock to rice, stir in mushrooms and cheese, finish with truffle oil",
        mood: "romantic",
        prep_time: "40 minutes",
        cuisine: "Italian",
        image_url: "https://images.pexels.com/photos/5638527/pexels-photo-5638527.jpeg",
        calories: 480,
        difficulty: "Hard"
    }
];

db.serialize(() => {
    // Create enhanced recipes table
    db.run(`
        CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            ingredients TEXT,
            instructions TEXT,
            mood TEXT,
            prep_time TEXT,
            cuisine TEXT,
            image_url TEXT,
            calories INTEGER,
            difficulty TEXT
        )
    `);

    // Insert recipes
    const stmt = db.prepare(`
        INSERT INTO recipes (
            name, ingredients, instructions, mood, 
            prep_time, cuisine, image_url, calories, difficulty
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    recipes.forEach(recipe => {
        stmt.run(
            recipe.name,
            recipe.ingredients,
            recipe.instructions,
            recipe.mood,
            recipe.prep_time,
            recipe.cuisine,
            recipe.image_url,
            recipe.calories,
            recipe.difficulty
        );
    });

    stmt.finalize();
    console.log('Recipe database populated!');
});

db.close(); 