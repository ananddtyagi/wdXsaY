import os
from firebase_admin import storage

class MissingFirebaseEnvironVars(Exception):
  def __init__(self, message="Missing env vars for firebase credentials"):
      super().__init__(message)

def get_firebase_creds_dict() -> dict:
  try:
    creds = {
      "type": os.environ["G_FIREBASE_TYPE"],
      "project_id": os.environ["G_FIREBASE_PROJECT_ID"],
      "private_key_id": os.environ["G_FIREBASE_PRIVATE_KEY_ID"],
      "private_key": os.environ["G_FIREBASE_PRIVATE_KEY"],
      "client_email": os.environ["G_FIREBASE_CLIENT_EMAIL"],
      "client_id": os.environ["G_FIREBASE_CLIENT_ID"],
      "auth_uri": os.environ["G_FIREBASE_AUTH_URI"],
      "token_uri": os.environ["G_FIREBASE_TOKEN_URI"],
      "auth_provider_x509_cert_url": os.environ["G_FIREBASE_AUTH_PROVIDER_URL"],
      "client_x509_cert_url": os.environ["G_FIREBASE_CLIENT_URL"],
      "universe_domain": os.environ["G_FIREBASE_UNIVERSE_DOMAIN"]
    }
    return creds
  except KeyError as err:
    raise MissingFirebaseEnvironVars("ERROR: Mising env vars for firebase creds:" + str(err))

def getVectorstore(filename: str) -> bytes:
  bucket = storage.bucket()
  blob = bucket.blob(filename)

  return blob.download_as_bytes()

