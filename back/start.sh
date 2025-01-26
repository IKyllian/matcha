#!/bin/bash

exec gunicorn --bind ${HOST:-0000}:3000 \
    --worker-class eventlet \
    --workers 1 \
    --access-logfile - \
    --error-logfile - \
    app.app:app