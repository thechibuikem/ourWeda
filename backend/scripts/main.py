# from fastapi import FastAPI
# from pydantic import BaseModel
# from fastapi.middleware.cors import CORSMiddleware
# app = FastAPI() #creating a fast api instance

# # allowing react app to connect to my localhost backend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=['http://localhost:5173'],
#     allow_methods=["*"],
#     allow_headers=["*"]
# )

# # creating a baseModel to validate data input
# class WeatherData(BaseModel):
#     weather: str
#     temperature: float

# # targeting the endpoint our tipscard component talks to on mount
# @app.post("/api/recommend")
# def recommend (data:WeatherData):
#     tips = []#creating tips container that would hold tips we generate
#     if data.weather == "clouds" and data.temperature > 3:
#         tips.append("Avoid dumping waste")
#         tips.append("Use degradable materials only")
#         tips.append("Use degradable materials only")
#         tips.append("Use degradable materials only")
#     else:
#         tips.append("it freaking works bro")
#     return tips