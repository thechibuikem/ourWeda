from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Personal(BaseModel):
    name:str
    surName:str
    age:int

@app.get('/api/details')#targetting the endpoint
def personData(data:Personal):
    fullName = data.name + " " + data.surName 
    age = data.age
    return ("my name is "+ fullName +"and I am"+age+ "years old") 