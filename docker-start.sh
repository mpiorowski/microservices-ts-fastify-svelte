yarn
yarn --cwd ./api-gateway
yarn --cwd ./chat-service
yarn --cwd ./users-service
yarn --cwd ./users-service migrate dev

docker-compose up