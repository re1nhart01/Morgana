FROM node


WORKDIR /app


COPY package.json /app


RUN sudo npm install
RUN cd .. && sudo chmod -R 777 /app && cd /app

COPY . .

ENV PORT=8080

EXPOSE $PORT

CMD ["npm", "run", "production"]