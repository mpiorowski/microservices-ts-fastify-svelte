yarn --cwd ./service-users migrate reset
yarn --cwd ./service-chat migrate reset

docker container stop $(docker container ls -aq) && docker container rm $(docker container ls -aq)