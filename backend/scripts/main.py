from fastapi import FastAPI
import os
from dotenv import load_dotenv
load_dotenv()

from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json
from google import genai

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
client = genai.Client(api_key=os.getenv('GEMINI_API_KEY'))

app = FastAPI()

# Allow React app to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a baseModel to validate data input
class WeatherData(BaseModel):
    r_temperature: float 
    r_humidity: float 
    r_windSpeed: float 
    r_cloudCover: float 
    r_condition: str 
    r_description: str  

# fallback tips
fallBackTips =  [
                "Use natural ventilation instead of AC when possible",
                "Walk or bike for trips under 2 km",
                "Unplug idle electronics to cut phantom power",
                "Choose locally grown seasonal produce today"
            ]


@app.post("/api/recommend")
def recommendTips(data: WeatherData):
    try:
        # Complete prompt with proper JSON output format
        prompt = f""" 
        You are a climate scientist specializing in global warming mitigation and carbon footprint reduction.

        <WEATHER_DATA>
        Temperature: {data.r_temperature}
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

        <OUTPUT_FORMAT>
        Return ONLY a valid JSON object in this exact format with no additional text:
        {{
            "tips": [
                "tip 1 text here",
                "tip 2 text here",
                "tip 3 text here",
                "tip 4 text here"
            ]
        }}
        </OUTPUT_FORMAT>
        """

        generatedTips = client.models.generate_content(
            model="gemini-2.5-flash", 
            contents=prompt
        )
        
        text = generatedTips.text
        cleaned = text.replace("```json", "").replace("```", "").strip()
        parsed_data = json.loads(cleaned)
        
        print(f"Generated tips: {parsed_data}")
        
        # Validate the response has tips
        if parsed_data and "tips" in parsed_data and isinstance(parsed_data["tips"], list) and len(parsed_data["tips"]) > 0:
            return {"tips": parsed_data["tips"]}
        else:
            raise ValueError("Invalid tips format from AI")
            
    except json.JSONDecodeError as e:
        print(f"JSON parsing error: {e}")
        print(f"Raw response: {text if 'text' in locals() else 'No response'}")
        return {
            "tips":fallBackTips
        }
    
    except Exception as e:
        print(f"Error generating tips: {e}")
        return {
            "tips":fallBackTips
        }