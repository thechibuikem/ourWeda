from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
app = FastAPI() #creating a fast api instance

# allowing react app to connect to my localhost backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_methods=["*"],
    allow_headers=["*"])


# targeting the endpoint our tipscard component talks to on mount
app.mount("/",
           StaticFiles(directory="dist",html=True),name="Static")
