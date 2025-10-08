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
    You have been provided <WEATHER DETAILS> in key value pairs delimited by tripple bacticks

        ```       
        Temperature: {data.r_temperature}
        Humidity: {data.r_humidity}
        Wind Speed: {data.r_windSpeed}
        Cloud Cover: {data.r_cloudCover}
        Condition: {data.r_condition}
        Description: {data.r_description}
        ```

        
    your task is to analyze the <WEATHER DETAILS> ./ 
    then generate <TIPS> that a user can take to improve the ozone layer and the ecosystem ./
      depending on the result of your analysis ./

    --- To achieve this task, you must follow the following steps ---
    STEP 1: Read though all the keys and values in <WEATHER DETAILS> ./
    STEP 2: Deduce how the current climate values in  <WEATHER DETAILS> affect global warming and climate change ./
    STEP 3: Check if the deductions you made are accurate and true, as corresponding with real world <VALID> sources ./
    STEP 4:Based on your deductions, generate 4 tips that a user can take to save the ozone ldayer in real time ./
    STEP 5:Make sure the tips are written in informal grammar ./
    STEP 6:Summarize tips, making sure each tip is not more than 10 words ./
    STEP 7:Return strict valid json the format denoted below by tripple bacticks below
    ```json    {{"tips": ["tip1","tip2","tip3","tip4"] }}    ```
    STEP 8:Only output the tips
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
 