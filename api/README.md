# API for What would X say about Y

This api exposes the getInsights endpoint. 
It uses the FastAPI package.

## Setup:

# Pre-requirements:

```commandline
python3
poetry
make
```

### Setup and Running the API

Here are the list of relevant make commands that can be run.

| command             | what it does                                                                                                                          | 
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| `make setup_api`    | Setups the api |
| `make start_api`    | Starts up the service. Exposes the 8000 port which can be called to access the api endpoint.                                          |
| `make requirements` | Exports the requirements stored in poetry to a requirements.txt file. This is useful when spinning up the service using Docker files. |

### Environment Variables

These are the environment variables required to get the service running.

Create a `.env` file in the `./api` directory and contact the owners for the values of the env vars.

- The open ai key
```
OPEN_AI_KEY
```

- Allowed requests from frontend.
```
FRONTEND_ALLOWED_ORIGIN
```
- For the url of firebase bucket
```
G_FIREBASE_BUCKET_URL
```

- For firebase auth
```
G_FIREBASE_TYPE
G_FIREBASE_PROJECT_ID
G_FIREBASE_PRIVATE_KEY_ID
G_FIREBASE_PRIVATE_KEY
G_FIREBASE_CLIENT_EMAIL
G_FIREBASE_CLIENT_ID
G_FIREBASE_AUTH_URI
G_FIREBASE_TOKEN_URI
G_FIREBASE_AUTH_PROVIDER_URL
G_FIREBASE_CLIENT_URL
G_FIREBASE_UNIVERSE_DOMAIN
```






