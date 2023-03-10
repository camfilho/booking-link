# Warehouse Booking System

Warehouse Booking System is a platform that allows drivers to book a slot at a warehouse.

## Getting Started

### With Docker

The first step is to build the images by running the following command:

```bash
$ make build
```

Then run the application with `make start`.

Access `localhost:3000`

All available commands:

| command      | description                          |
| ------------ | ------------------------------------ |
| make start   | Start the application                |
| make specs   | Run all the specs                    |
| make bash    | access the bash inside the container |
| make console | access rails c console               |

### Without Docker

1. Clone repo
2. Install Postgres
3. Configure psql credentials for your current role (google it)
4. Configure `database.yml` if necessary.
5. `$ bundle install`
6. `$ bundle exec rails db:{create,migrate}`
7. `$ bundle exec rails s`
8. Access `localhost:3000`
