# Setthi Backend
A NodeJS backend for Setthi app.

## Installation & Usage

Install all the dependencies
> yarn

Run in development mode
> yarn dev

Build the production version
> yarn build

Build and Run docker
> docker build --tag setthi && docker run -d -p 8080:8080 setthi

Stop running docker container
> docker stop $(docker ps | grep setthi | cut -d' ' -f1)