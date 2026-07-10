from fastapi import FastAPI

from app.database.db import engine
from app.database.models import Base
from app.routes.course import router as course_router
from app.routes.venue import router as venue_router
from app.routes.invigilator import router as invigilator_router
import app.routes.timetable as timetable_router
import app.routes.dashboard as dashboard_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as auth_router
from app.routes.history import router as history_router



Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="AI Exam Timetable System",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
   

app.include_router(course_router)
app.include_router(venue_router)
app.include_router(invigilator_router)
app.include_router(timetable_router.router)
app.include_router(dashboard_router.router)
app.include_router(auth_router)
app.include_router(history_router)

@app.get("/")
def home():
    return {
        "message": "AI Exam Timetable API is running"
    }