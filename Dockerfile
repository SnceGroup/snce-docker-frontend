FROM node:9-alpine

ARG mail
ARG name

# Packages needed by node
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh libpng-dev build-base python curl fontconfig

# Avoid fontconfig variable issue during css critical path generation
RUN echo -n "export FONTCONFIG_PATH=/etc/fonts" >> /etc/profile

# Automated build to tar up dynamic ELFs required by PhantomJS on Dockerized Alpine Linux
# ref. https://github.com/dustinblackman/phantomized
RUN curl -Ls "https://github.com/dustinblackman/phantomized/releases/download/2.1.1a/dockerized-phantomjs.tar.gz" | tar xz -C /

# Set username and password for releasing
RUN git config --global user.email "$mail" \ 
    && git config --global user.name "$name"