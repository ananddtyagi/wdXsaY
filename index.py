from fastapi import FastAPI

app = FastAPI()


@app.post("/api/getInsights")
def getInsights():
    return {"message": "Hello World"}


if __name__ == "__main__":
    app.run()
