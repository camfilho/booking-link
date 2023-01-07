#!/bin/bash

rm -f /var/app/tmp/pids/server.pid
bundle check > /dev/null 2>&1 || bundle install -j4

if [ "$#" == 0 ]
then
    bundle exec rake db:create db:test:prepare
    bundle exec rake db:migrate RAILS_ENV=development
    echo "booting the application..."
    exec bundle exec rails server -u puma -b '0.0.0.0'
fi

exec $@

