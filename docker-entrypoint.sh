#!/bin/sh

envsubst '${VITE_FRONT_URL} ${HOST}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"