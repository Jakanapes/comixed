FROM node:10.15.3-alpine

MAINTAINER Patrick Sharp "jakanapes@gmail.com"

RUN npm install -g is-docker

RUN apk --no-cache add openjdk8 maven chromium
ENV JAVA_HOME=/usr/lib/jvm/java-1.8-openjdk
ENV PATH="$JAVA_HOME/bin:${PATH}"
ENV CHROME_BIN=/usr/bin/chromium-browser

RUN mkdir /comixed && mkdir /app
COPY ./ /comixed
WORKDIR /comixed

RUN mvn clean package

RUN mv comixed-app/target/comixed-app-*.jar /app/comixed-app.jar
WORKDIR /app
RUN rm -r /comixed

EXPOSE 7171
VOLUME /comic_data

CMD ["java", "-jar", "/app/comixed-app.jar"]
