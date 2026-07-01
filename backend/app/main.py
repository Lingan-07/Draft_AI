from fastapi import FastAPI
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import engine
from app.routers.auth import router as auth_router
from app.routers.draft import router as draft_router
from app.routers.template import router as template_router
from app.routers.dashboard import router as dashboard_router
from app.exceptions.handlers import register_exception_handlers

app = FastAPI(
    title="AI Email & Message Draft Assistant"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_exception_handlers(app)

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
app.include_router(draft_router)
app.include_router(template_router)
app.include_router(dashboard_router)