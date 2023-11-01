# Frontend package for What does X say about Y

The frontend for this service is written in Typescript and uses the NextJS framework.

### Pre-requirements

```commandline
npm
make
```

### Setup and Running the Frontend

Here are the list of relevant make commands that can be run.

| command               | what it does        | 
|-----------------------|---------------------|
| `make setup_frontend` | Setups the frontend |
| `make start_frontend` | Starts the frontend |

### Environment Variables

These are the environment variables for the frontend.

Create a `.env` file in the `./frontend` directory and contact the owners for the values of the env vars.

We utilize nextjs functionality of bundling env vars for the browser. More info can be found at [next-js](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser)

```
NEXT_PUBLIC_BACKEND_URL
```