FROM mcr.microsoft.com/playwright:v1.40.1-jammy

ARG HTTP_CREDENTIALS_USERNAME
ARG HTTP_CREDENTIALS_PASSWORD

ENV HTTP_CREDENTIALS_USERNAME=HTTP_CREDENTIALS_USERNAME
ENV HTTP_CREDENTIALS_PASSWORD=HTTP_CREDENTIALS_PASSWORD

COPY . /aqa-playwright-1
WORKDIR /aqa-playwright-1

RUN npm ci

CMD ["npm", "test"]