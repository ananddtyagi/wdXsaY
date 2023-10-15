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








