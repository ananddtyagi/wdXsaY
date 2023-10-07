
# API COMMANDS
.PHONY: docker_build_api
docker_build_api:
	docker build --quiet -t api api/

.PHONY: docker_run_api
docker_run_api:
	docker run --env-file .env -p 8000:8000 api

.PHONY: docker_start_api
docker_start_api:
	$(MAKE) docker_build_api
	$(MAKE) docker_run_api

.PHONY: docker_stop_api
docker_stop_api:
	docker rm $(docker stop $(docker ps -a -q --filter ancestor=api --format="{{.ID}}"))

# APP COMMANDS
.PHONY: docker_build_app
docker_build_app:
	docker build --quiet -t app frontend/

.PHONY: docker_run_app
docker_run_app:
	docker run -i -t -p 3000:3000 app

.PHONY: docker_start_app
docker_start_app:
	$(MAKE) docker_build_app
	$(MAKE) docker_run_app

.PHONY: docker_stop_app
docker_stop_app:
	docker rm $(docker stop $(docker ps -a -q --filter ancestor=app --format="{{.ID}}"))

# DOCKER COMPOSE COMMANDS
.PHONY: docker_compose_project
docker_compose_project:
	docker compose up

