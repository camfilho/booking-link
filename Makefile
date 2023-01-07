start:
	docker-compose up
specs:
	docker-compose exec web bundle exec rake

bash:
	docker-compose exec web bash

console:
	docker-compose exec web bundle exec rails c

