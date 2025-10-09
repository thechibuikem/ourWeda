from fastapi import FastAPI #to connect python script to frontend
# to load enviromental variables
import os
from dotenv import load_dotenv
# loading in environmental variables
load_dotenv()

from pydantic import BaseModel #a model to validate data being sent in from the frontend
from fastapi.middleware.cors import CORSMiddleware #to allow resource sharing between servers

import json

from google import genai

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
client = genai.Client(api_key=os.getenv('GEMINI_API_KEY'))

# 

# model = genai.GenerativeModel('gemini-1.5-pro')
app = FastAPI() #creating a fast api instance

# allowing react app to connect to my 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# creating a baseModel to validate data input
class WeatherData(BaseModel):
    r_temperature:float 
    r_humidity:float 
    r_windSpeed:float 
    r_cloudCover:float 
    r_condition:str 
    r_description:str  


# targeting the endpoint our tipscard component talks to on mount
@app.post("/api/recommend")
def recommendTips(data:WeatherData):

# prompt to generate tips
    prompt = f""" 
    You are a climate scientist specializing in global warming mitigation and carbon footprint reduction.

    <WEATHER_DATA>
    Temperature: {data.r_temperature}°C
    Humidity: {data.r_humidity}%
    Wind Speed: {data.r_windSpeed} km/h
    Cloud Cover: {data.r_cloudCover}%
    Condition: {data.r_condition}
    Description: {data.r_description}
    </WEATHER_DATA>

    <MISSION>
    Generate 4 practical tips that help users reduce their carbon footprint and combat global warming.
    Tips must be specifically tailored to the current weather conditions provided above.
    </MISSION>

    <FOCUS_AREAS>
    1. Energy consumption - heating, cooling, electricity usage
    2. Transportation emissions - walking, biking, driving alternatives
    3. Carbon-smart daily choices - water use, food, waste reduction
    4. Weather-specific climate actions - leveraging natural conditions
    </FOCUS_AREAS>

    <TIP_REQUIREMENTS>
    - Length: Each tip must be 8-12 words maximum
    - Relevance: Tips must directly relate to current weather conditions
    - Tone: Use friendly, actionable language (e.g., "Try this" not "You must")
    - Impact: Focus on HIGH-IMPACT actions that meaningfully reduce greenhouse gases
    - Specificity: Avoid generic advice, be weather-contextual and precise
    - Timeframe: Include actions users can do within the next 24 hours
    </TIP_REQUIREMENTS>

    <WEATHER_TO_TIP_EXAMPLES>

    ===HOT_WEATHER (Temperature > 28°C)===
    """

    generatedTips = client.models.generate_content(
    model="gemini-2.5-flash", contents=prompt)
    text = generatedTips.text
    cleaned = text.replace("```json","").replace("```","").strip()
    data = json.loads(cleaned)
    print(data)
    # return(data)
    if data:
        # get the tips
        tips = data["tips"]
        if not tips:
            tips = ["Use renewable energy", "Reduce emissions", "Plant trees", "ai tips empty"]
        return {"tips": tips}
    else:
        return {"tips": ["Use renewable energy", "Reduce emissions", "Plant trees", "ai tips failed "]}
 