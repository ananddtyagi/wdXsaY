from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage

import os
import time

from insight_pipeline import generateInsights, generateQuestion
from generate_vectorstore import generateVectorStores

BUCKET = "staging.wdxsay.appspot.com"

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    try:
        cred = credentials.Certificate("wdxsay-firebase-adminsdk-trxco-f704fd7e90.json")
        firebase_admin.initialize_app(cred, {
            'storageBucket': BUCKET
        })
    except Exception as err:
        print("ERROR: Failed to initialize firebase authentication:", err)

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

@app.post("/api/uploadfile")
async def createUploadFile(file: UploadFile):

    file_path = "tmp/" + file.filename
    with open("tmp/" + file.filename, "wb") as tmp_file:
        contents = await file.read()
        tmp_file.write(contents)

    vsStart = time.perf_counter()
    vs_bytes = await generateVectorStores(file_path)
    vsEnd = time.perf_counter()

    print(f"Generate Vectorstore Took {vsEnd - vsStart:0.4f} seconds")

    bucket = storage.bucket()
    fileStart = time.perf_counter()
    blob = bucket.blob(file.filename.rsplit(".")[0])

    # https://cloud.google.com/python/docs/reference/storage/latest/google.cloud.storage.blob.Blob?authuser=0#google_cloud_storage_blob_Blob_upload_from_string
    blob.upload_from_string(vs_bytes, content_type="application/octet-stream")
    fileEnd = time.perf_counter()

    print(f"Uploading File Took {fileEnd - fileStart:0.4f} seconds")

    return {"filename": file.filename}

if __name__ == "__main__":
    app.run()
