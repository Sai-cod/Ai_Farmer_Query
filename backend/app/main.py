from fastapi import FastAPI
app = FastAPI()

# decorator


@app.get("/")
def home():
    return {"message": "Hello farmer!Welcome to AI Farmer Advisory System"}
