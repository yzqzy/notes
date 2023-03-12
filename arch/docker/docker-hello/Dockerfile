FROM node:16

WORKDIR /usr/app

COPY . .
 
RUN npm install cnpm -g --registry=https://registry.npmmirror.com
RUN cnpm install
RUN npm run build
RUN cnpm install serve -g

EXPOSE 3000

CMD ["serve", "dist"]


