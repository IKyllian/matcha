#!/bin/bash

exec gunicorn --bind 0.0.0.0:3000 \
    --worker-class eventlet \
    --workers 1 \
    --access-logfile - \
    --error-logfile - \
    app.app:app