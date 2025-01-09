FROM python:alpine3.21

WORKDIR /usr/app/back

COPY ./back .

RUN pip3 install --upgrade pip && pip install --no-cache-dir -r requirements.txt
RUN python initDb.py

EXPOSE 3000

# CMD ["gunicorn", "-w", "4", "app:app", "-b", "localhost:3000"]
CMD ["python", "app.py"]