from fastapi import FastAPI
from sqlalchemy import text

from app.core.database import engine
from app.routers.auth import router as auth_router

app = FastAPI(
    title="AI Email & Message Draft Assistant"
)


@app.get("/")
def health_check():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "success",
            "message": "Backend and Database connected successfully.",
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e),
        }


# Register Routers
app.include_router(auth_router)