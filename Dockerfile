FROM ruby:3.2.0

ARG GITHUB_TOKEN
ARG GITHUB_USERNAME

ENV BUNDLER_VERSION 2.3.9
ENV BUNDLE_RUBYGEMS__PKG__GITHUB__COM=$GITHUB_USERNAME:$GITHUB_TOKEN

RUN apt-get update && \
  apt-get install -qy cmake && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  /usr/local/bin/gem update --system && \
  gem install bundler:$BUNDLER_VERSION

WORKDIR /var/app

COPY Gemfile Gemfile.lock ./

RUN bundle install -j$(nproc)

COPY . .

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -\
  && apt-get update -qq && apt-get install -qq --no-install-recommends \
    nodejs \
  && apt-get upgrade -qq \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*\
  && npm install -g yarn@1

ENTRYPOINT [ "./entrypoint.sh" ]

