
start:
	docker compose up -d

stop:
	docker compose down

restart:
	docker compose down
	docker compose up -d

bash:
	docker compose exec app bash

rebuild:
	docker compose down
	docker compose up -d --build

check:
	docker compose exec app npm run check

build:
	docker compose exec app npm run build