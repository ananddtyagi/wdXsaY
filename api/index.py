from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from insight_pipeline import generateInsights, generateQuestion

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://wdxsay.vercel.app"],  # Replace with your frontend URL(s)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/getInsights")
async def getInsights(source: str, query: str):
    question = generateQuestion(source, query)
    insights = generateInsights(question)
    return insights

if __name__ == "__main__":
    app.run()
