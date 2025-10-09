import os
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from generateTips import router as tips_router
app = FastAPI() #creating a fast api instance

# allowing react app to connect to my localhost backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])

# include my recommendation router
app.include_router(tips_router)
