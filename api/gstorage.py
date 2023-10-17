from firebase_admin import storage

def getVectorstore(filename: str) -> bytes:
  bucket = storage.bucket()
  blob = bucket.blob(filename)

  return blob.download_as_bytes()

