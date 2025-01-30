# Mood-Based Recipe Recommender 🍳

A web application that suggests recipes based on your current mood, powered by the Spoonacular API. Features a sleek dark mode interface and mobile-responsive design.

## Features ✨

- **Mood-Based Recommendations**: Get recipes tailored to 5 different moods:
  - 😊 Happy: Mediterranean and Mexican cuisine
  - 😢 Sad: Comfort food and desserts
  - 😴 Tired: High-protein breakfast and snacks
  - 😰 Stressed: Vegetarian soups and salads
  - 💝 Romantic: French and Italian cuisine

- **Recipe Details Include**:
  - Preparation time
  - Cuisine type
  - Calorie information
  - Difficulty level
  - Full ingredients list
  - Step-by-step instructions
  - Health score
  - Serving size

- **Technical Features**:
  - Server-side caching (1-hour TTL)
  - Mobile-responsive design
  - Dark mode interface
  - Smooth animations
  - API rate limiting protection

## Tech Stack 🛠

- **Frontend**:
  - HTML5
  - CSS3 with Tailwind CSS
  - JavaScript
  - Font Awesome icons
  
- **Backend**:
  - Node.js
  - Express.js
  - SQLite3
  
- **APIs & Services**:
  - Spoonacular API
  - Custom caching system

## Getting Started 🚀

### Prerequisites

- Node.js (v14 or higher)
- npm
- Spoonacular API key

### Installation

1. Clone the repository:
~~~ bash
git clone https://github.com/yourusername/mood-recipes.git
cd mood-recipes
~~~

2. Install dependencies:
~~~ bash
npm install
~~~

3.  Create a `.env` file in the root directory:
~~~ bash
SPOONACULAR_API_KEY=your_api_key_here
PORT=3002
~~~

4.  Start the server:
~~~ bash
npm start
~~~

5. Visit `http://localhost:3002` in your browser

## API Endpoints 📡

- `GET /api/recipe/:mood` - Get recipes by mood
- `GET /api/recipe/details/:id` - Get detailed recipe information
- `GET /api/recipe/similar/:id` - Get similar recipes
- `POST /api/cache/clear` - Clear the server cache

## Caching System 📦

The application implements a TTL (Time To Live) based caching system with:
- 1-hour cache duration
- Separate caches for:
  - Mood-based recipes
  - Recipe details
  - Similar recipes
- Automatic cache invalidation

## Environment Variables 🔐

- `PORT`: Server port (default: 3002)
- `SPOONACULAR_API_KEY`: Your Spoonacular API key

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- [Spoonacular API](https://spoonacular.com/food-api)
- [Tailwind CSS](https://tailwindcss.com)
- [Font Awesome](https://fontawesome.com)
- [Pexels](https://www.pexels.com) for recipe images
