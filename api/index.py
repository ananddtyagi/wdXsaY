from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import storage
from firebase_admin import credentials
from dotenv import load_dotenv
import spacy
import time
import os

from insight_pipeline import generateInsightsCustom, generateQuestion
from generate_vectorstore import generateVectorStores
from gfirebase import get_firebase_creds_dict

load_dotenv()
app = FastAPI()

@app.on_event("startup")
async def startup_event():
    load_dotenv()
    cred_dict = get_firebase_creds_dict()
    cred = credentials.Certificate(cred_dict)

    firebase_admin.initialize_app(cred, {
        'storageBucket': os.environ["G_FIREBASE_BUCKET_URL"]
    })
    
    try:
        nlp = spacy.load("en_core_web_lg")
    except: # If not present, we download
        spacy.cli.download("en_core_web_lg")
        nlp = spacy.load("en_core_web_lg")

# https://wdxsay.vercel.app
# Configure CORS
allowed_origins = ["http://localhost:3000"]
if "FRONTEND_ALLOWED_ORIGIN" in os.environ:
    allowed_origins.append(os.environ["FRONTEND_ALLOWED_ORIGIN"])
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,  # Replace with your frontend URL(s)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/getInsights")
async def getInsights(source: str, query: str):
    question = generateQuestion(source, query)
    insights = generateInsightsCustom(source, question)
    return insights

@app.post("/api/uploadfile")
async def createUploadFile(file: UploadFile):

    file_path = "local_storage/" + file.filename
    with open("local_storage/" + file.filename, "wb") as tmp_file:
        contents = await file.read()
        tmp_file.write(contents)

    vs_start = time.perf_counter()
    vs_bytes = await generateVectorStores(file_path)
    vs_end = time.perf_counter()

    print(f"Generate Vectorstore For {file.filename} Took {vs_end - vs_start:0.4f} seconds")

    bucket = storage.bucket()
    file_start = time.perf_counter()
    
    # TODO: Fix bug where if .pdf doesn't exist in string.
    vectorstore_filename = file.filename.rsplit(".pdf")[0]
    blob = bucket.blob(vectorstore_filename)

    # https://cloud.google.com/python/docs/reference/storage/latest/google.cloud.storage.blob.Blob?authuser=0#google_cloud_storage_blob_Blob_upload_from_string
    blob.upload_from_string(vs_bytes, content_type="application/octet-stream")
    file_end = time.perf_counter()

    print(f"Uploading File Took {file_end - file_start:0.4f} seconds")

    return {"filename": vectorstore_filename}
