let currentMood = null;
let currentRecipes = [];
let currentRecipeIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.mood-btn').forEach(button => {
        button.addEventListener('click', async () => {
            document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            
            const recipeContainer = document.getElementById('recipe-container');
            recipeContainer.classList.add('opacity-50');
            
            currentMood = button.dataset.mood;
            currentRecipeIndex = -1;
            await fetchAndShowRecipes();
            
            recipeContainer.classList.remove('opacity-50');
            recipeContainer.classList.remove('hidden');
            setTimeout(() => {
                recipeContainer.classList.add('visible');
            }, 10);
        });
    });

    document.getElementById('new-recipe').addEventListener('click', () => {
        const container = document.getElementById('recipe-container');
        container.classList.add('opacity-50');
        
        setTimeout(() => {
            currentRecipeIndex = (currentRecipeIndex + 1) % currentRecipes.length;
            displayRecipe(currentRecipes[currentRecipeIndex]);
            container.classList.remove('opacity-50');
        }, 300);
    });
});

async function fetchAndShowRecipes() {
    try {
        const response = await fetch(`/api/recipe/${currentMood}`);
        currentRecipes = await response.json();
        
        if (currentRecipes.length > 0) {
            currentRecipeIndex = 0;
            displayRecipe(currentRecipes[0]);
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function displayRecipe(recipe) {
    document.getElementById('recipe-name').textContent = recipe.name;
    document.getElementById('recipe-ingredients').textContent = recipe.ingredients;
    document.getElementById('recipe-instructions').textContent = recipe.instructions;
    document.getElementById('recipe-image').src = recipe.image_url;
    document.getElementById('recipe-time').textContent = recipe.prep_time;
    document.getElementById('recipe-cuisine').textContent = recipe.cuisine;
    document.getElementById('recipe-calories').textContent = `${recipe.calories} cal`;
    document.getElementById('recipe-difficulty').textContent = recipe.difficulty;
    
    if (document.getElementById('recipe-health-score')) {
        document.getElementById('recipe-health-score').textContent = `${recipe.healthScore}/100`;
    }
    if (document.getElementById('recipe-diets')) {
        document.getElementById('recipe-diets').textContent = recipe.diets;
    }
    if (document.getElementById('recipe-servings')) {
        document.getElementById('recipe-servings').textContent = `${recipe.servings} servings`;
    }
}

// Example unique recipes to insert
const uniqueRecipes = [
    {
        name: "Midnight Comfort Mac",
        ingredients: "Blue cheese, butternut squash, caramelized onions, sage, pasta, cream, breadcrumbs",
        instructions: "Roast butternut squash, make cheese sauce with blue cheese, combine with caramelized onions and sage, top with crispy breadcrumbs",
        mood: "sad",
        prepTime: "45 minutes",
        cuisine: "Fusion"
    },
    {
        name: "Sunshine Buddha Bowl",
        ingredients: "Quinoa, golden beets, turmeric chickpeas, mango, avocado, yellow bell peppers, citrus dressing",
        instructions: "Cook quinoa, roast beets and chickpeas with turmeric, arrange with fresh mango and avocado, drizzle with citrus dressing",
        mood: "happy",
        prepTime: "30 minutes",
        cuisine: "Health"
    },
    {
        name: "Spicy Redemption Ramen",
        ingredients: "Fresh ramen noodles, kimchi, soft boiled egg, mushrooms, gochujang, pork belly, green onions",
        instructions: "Prepare spicy broth with gochujang, cook noodles, top with kimchi, egg, crispy pork belly, and mushrooms",
        mood: "angry",
        prepTime: "40 minutes",
        cuisine: "Korean-Japanese"
    },
    {
        name: "Dreamy Lavender Ice Cream",
        ingredients: "Heavy cream, lavender buds, honey, vanilla bean, egg yolks, blueberries",
        instructions: "Infuse cream with lavender, make custard base, strain, churn, swirl with blueberry compote",
        mood: "relaxed",
        prepTime: "1 hour plus freezing",
        cuisine: "Dessert"
    }
] 