FROM ubuntu:latest
LABEL authors="gk"

ENTRYPOINT ["top", "-b"]