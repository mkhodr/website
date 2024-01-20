FROM python:3.10.13-alpine3.19

EXPOSE 8000
ENV  PYTHONUNBUFFERED 1

WORKDIR /home/backend
COPY ./requirements.txt home/requirements.txt
COPY . /home/backend


EXPOSE 8000

RUN apk update && \
    apk upgrade &&\
    pip install --upgrade pip && \
    pip install -r home/requirements.txt

ENV PATH="/py/bin:$PATH"
