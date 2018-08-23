#!/usr/bin/env bash

HOST=abryrath.com
USER=abry
ENV_FILE=caitlinandabry-com/.env
DUMP_FILE=/tmp/caitlinandabry-com.prod.sql

SSH_OPTS="${USER}@${HOST}"

db_user=$(ssh "${SSH_OPTS}" grep -e "DB_USER" "${ENV_FILE}" | gcut -d "\"" -f 2)
printf "."
db_pass=$(ssh "${SSH_OPTS}" grep -e "DB_PASSWORD" "${ENV_FILE}" | gcut -d "\"" -f 2)
printf "."
#echo "Got pass: ${db_pass}"
db_name=$(ssh "${SSH_OPTS}" grep -e "DB_DATABASE" "${ENV_FILE}" | gcut -d "\"" -f 2)
printf "."
#echo "Got name: ${db_name}"

ssh "${SSH_OPTS}" mysqldump -u"${db_user}" -p"\"${db_pass}\"" "${db_name}" > "${DUMP_FILE}"
printf "."

local_user=$(grep -e "DB_USER" .env | gcut -d "\"" -f 2)
printf "."
local_pass=$(grep -e "DB_PASSWORD" .env | gcut -d "\"" -f 2)
printf "."
local_name=$(grep -e "DB_DATABASE" .env | gcut -d "\"" -f 2)
printf "."

echo mysql -u"${local_user}" -p"\"${local_pass}\"" "${local_name}" < "${DUMP_FILE}"

mysql -u"${local_user}" -p"\"${local_pass}\"" "${local_name}" < "${DUMP_FILE}"
