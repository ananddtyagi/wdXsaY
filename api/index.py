from fastapi import FastAPI

app = FastAPI()

@app.get("/api/getInsights")
def getInsights():
    return {"message": "Hello World"}