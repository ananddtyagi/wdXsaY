from fastapi import FastAPI

from insight_pipeline import generateInsights, generateQuestion

app = FastAPI()


@app.get("/api/getInsights")
async def getInsights(source: str, query: str):
    question = generateQuestion(source, query)
    insights = generateInsights(question)
    return insights

if __name__ == "__main__":
    app.run()
