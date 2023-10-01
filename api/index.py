from fastapi import FastAPI

from api.insight_pipeline import generateInsights, generateQuestion

app = FastAPI()


@app.get("/api/getInsights")
async def getInsights(source: str, query: str):
    question = generateQuestion(source, query)
    insights = generateInsights(question)
    return {"message": insights['answer']}


if __name__ == "__main__":
    app.run()
