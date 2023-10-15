# What does X say about Y

https://github.com/ananddtyagi/wdXsaY

## Setup

### Pre-requirements

```commandline
python3
npm
poetry
make
```

You can set up the entire project with the following command

```commandline
make setup_project
```

You will also need to add a OPEN_AI_KEY environment variable for this project.
Follow these steps:
1. Get an API Key from OPEN AI.
2. Run the following in your terminal:
   1. `export OPEN_AI_KEY=<your key>`

## Running the project

You can run the project with the following command:

```commandline
make start_project_local
```

This will start running all the services needed to run the project locally. It should also support hot refresh development.
To access the project, go to: http://localhost:3000/
