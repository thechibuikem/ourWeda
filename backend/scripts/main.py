import os
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
app = FastAPI() #creating a fast api instance

# allowing react app to connect to my localhost backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=["*"],
    allow_headers=["*"])


# # Get path relative to this file
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# DIST_PATH = os.path.join(BASE_DIR, "..", "dist")

# app.mount("/", StaticFiles(directory=DIST_PATH, html=True), name="Static")