FROM python:3.9-slim

WORKDIR /usr/app/back

RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY ./back .

RUN pip install --no-cache-dir -r requirements.txt

RUN python initDb.py

EXPOSE 3000

COPY ./back/start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]