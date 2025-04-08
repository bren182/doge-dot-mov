# 🎬 Doge.mov — Demo Movie App

A lightweight full-stack movie browsing web app built with modern tools like **React**, **FastAPI**, and **TailwindCSS** — complete with user favorites and local login functionality.

---

# 🚀 Getting Started

> Please make sure you have installed Docker on your machine and that the Docker application is running

1. Clone the repo
2. Run docker-compose up --build
3. Visit http://localhost:3000 for the frontend; Backend runs on http://localhost:8000

## 🧠 Tech Stack Overview and rationale

### Rationale 

This project leverages a fast and lightweight stack designed for simplicity, clarity, and extensibility. 

The backend is built with Python using FastAPI for its ease of setup and rapid routing capabilities.

SQLite is used as the database to keep the project lightweight, as the dataset being stored is minimal (primarily user favorites).
 
The frontend is styled using Tailwind CSS and built with ReactJS and React Router to manage dynamic views. 

LocalStorage is used for basic user authentication — simply checking for a user_id — which allows the app to store and retrieve favorites per user from the local database. 

This setup highlights core concepts like API-driven CRUD operations (insert, delete, view) with minimal reliance on third-party APIs. It also leaves room for extending the favorite data model, for example, by including additional metadata like a movie's overview or genre to enrich the user experience.

### 🖥️ Front End

- **React** (bootstrapped with [Create React App](https://create-react-app.dev/))
- **TailwindCSS** for utility-first styling
- **Heroicons** for clean, lightweight icons
- **Framer Motion** for smooth animations & modals

### ⚙️ Back End

- **Python** with **FastAPI** — API routing
- **Httpx** for async requests to external APIs (TMDB🎬)
- **SQLite3** for storing a local user's favorites. 

### 🐳 Docker

Launch the application by using docker. 

> Please make sure you have installed Docker on your machine and that the Docker application is running

```bash
docker-compose up --build
```

## 📡 API Attribution

This project uses the [TMDB API](https://www.themoviedb.org/) for movie data and images.

> This project uses the TMDB API but is not endorsed or certified by TMDB.
