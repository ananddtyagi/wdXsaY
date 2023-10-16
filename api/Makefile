# This is the makefile for the API service
# To run the commands, run `make <command name>` in your terminal.
# Please update the readme with what each new command added does.

.PHONY: setup_api
setup_api:
	poetry install

.PHONY: requirements
requirements:
	poetry export --without-hashes --format=requirements.txt > requirements.txt

.PHONY: start_api
start_api:
	poetry run uvicorn index:app --host 0.0.0.0 --port 8000 --reload
