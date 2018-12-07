#!/usr/bin/env bash

set -x

ssh abry@abryrath.com "cd stage.caitlinandabry.com; \
git reset --hard; \
git pull origin staging; \
composer install; \
yarn install; \
yarn run build:prod;"