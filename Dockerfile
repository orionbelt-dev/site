FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

# RUN npm install

COPY --chown=node:node . .

RUN chmod +x ./build/render-build.sh && ./build/render-build.sh
RUN chmod +x ./build/render-start.sh 

EXPOSE 3333

CMD ["./build/render-start.sh"]