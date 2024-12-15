FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

# RUN npm install

COPY --chown=node:node . .

RUN chmod +x ./bin/render-build.sh && ./bin/render-build.sh
RUN chmod +x ./bin/render-start.sh 

EXPOSE 3333

CMD ["./bin/render-start.sh"]