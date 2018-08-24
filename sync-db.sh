#!/usr/bin/env bash

HOST=abryrath.com
USER=abry
ENV_FILE=caitlinandabry-com/.env
DUMP_FILE=/tmp/caitlinandabry-com.prod.sql

SSH_OPTS="${USER}@${HOST}"


DEBUG=0
if [[ ! -z "$1" ]]; then
    DEBUG=1
fi

debug() {
    [ $DEBUG -eq 1 ] && {
        echo "$1"
    }
}

db_user=$(ssh "${SSH_OPTS}" grep -e "DB_USER" "${ENV_FILE}" | cut -d "\"" -f 2)
debug  "Got user: ${db_user}"

db_pass=$(ssh "${SSH_OPTS}" grep -e "DB_PASSWORD" "${ENV_FILE}" | cut -d "\"" -f 2)
debug "Got pass: ${db_pass}"

db_name=$(ssh "${SSH_OPTS}" grep -e "DB_DATABASE" "${ENV_FILE}" | cut -d "\"" -f 2)
debug "Got database: ${db_name}"

ssh "${SSH_OPTS}" mysqldump -u"${db_user}" -p"\"${db_pass}\"" "${db_name}" > "${DUMP_FILE}"
debug "Got SQL file"

local_user=$(grep -e "DB_USER" .env | cut -d "\"" -f 2)
debug "Got local user"

local_pass=$(grep -e "DB_PASSWORD" .env | cut -d "\"" -f 2)
debug "Got local pass"

local_name=$(grep -e "DB_DATABASE" .env | cut -d "\"" -f 2)
debug "Got local db"


debug "mysql -u\"${local_user}\" -p\"${local_pass}\" \"${local_name}\" < \"${DUMP_FILE}\""

eval mysql -u"${local_user}" -p"${local_pass}" "${local_name}" < "${DUMP_FILE}"
