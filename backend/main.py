import sqlite3
from fastapi import FastAPI, Query, Request
from fastapi.middleware.cors import CORSMiddleware
import httpx

## DB ##
def init_db():
    conn = sqlite3.connect("data/themovies.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS favorites (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT,
            movie_id INTEGER,
            title TEXT,
            poster_path TEXT
        );
    """)
    conn.commit()
    conn.close()
init_db()
## END DB ##


## CORS CONFIG ##
origins = [

    "http://localhost",
    "http://localhost:3000",
]


## END CORS CONFIG ##

## FAST API CONFIG ##
TMDB_API_KEY = "9c6686f4ff3b8821fe652363f436a316" # personal API key hard-coded. 
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
## END FAST API CONFIG


## ROUTES ##
@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}


@app.get("/api/movies")
async def get_movies(page: int = Query(1, ge=1)):
    per_page = 9
    total_results = 45
    all_results = []
    pages_needed = (total_results // 20) + 1

    async with httpx.AsyncClient() as client:
        for tmdb_page in range(1, pages_needed + 1):
            response = await client.get(
                f"https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
                params={"api_key": TMDB_API_KEY, "page": tmdb_page}
            )
            data = response.json()
            all_results.extend(data["results"])

            if len(all_results) >= total_results:
                break

    # Slice results for pagination
    start = (page - 1) * per_page
    end = start + per_page
    paginated = all_results[start:end]

    return {"results": paginated, "page": page, "total": total_results}

@app.get("/api/favorites")
async def get_favorites(user_id: str):
    conn = sqlite3.connect("data/themovies.db")
    cursor = conn.cursor()
    cursor.execute("SELECT movie_id, title, poster_path FROM favorites WHERE user_id = ?", (user_id,))
    rows = cursor.fetchall()
    conn.close()

    favorites = [{"movie_id": r[0], "title": r[1], "poster_path": r[2]} for r in rows]
    return {"favorites": favorites}

@app.delete("/api/favorites")
async def remove_favorite(request: Request):
    data = await request.json()
    user_id = data.get("user_id")
    movie_id = data.get("movie_id")

    if not user_id or not movie_id:
        return JSONResponse(content={"error": "Missing user_id or movie_id"}, status_code=400)

    conn = sqlite3.connect("data/themovies.db")
    cursor = conn.cursor()
    cursor.execute("DELETE FROM favorites WHERE user_id = ? AND movie_id = ?", (user_id, movie_id))
    conn.commit()
    conn.close()

    return {"status": "success"}

@app.post("/api/favorites")
async def save_favorite(request: Request):
    body = await request.json()
    user_id = body.get("user_id")
    movie_id = body.get("movie_id")
    title = body.get("title")
    poster_path = body.get("poster_path")

    conn = sqlite3.connect("data/themovies.db")
    
    cursor = conn.cursor()
    cursor.execute(
    "SELECT 1 FROM favorites WHERE user_id = ? AND movie_id = ?",
    (user_id, movie_id)
    )
    if cursor.fetchone():
        return {"status": "already_favorited"}
    cursor.execute(
        "INSERT INTO favorites (user_id, movie_id, title, poster_path) VALUES (?, ?, ?, ?)",
        (user_id, movie_id, title, poster_path)
    )
    conn.commit()
    conn.close()

    return {"status": "saved"}