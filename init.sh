#!/bin/bash
set -e
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" <<-EOSQL
    CREATE DATABASE "$N8N_POSTGRES_DB";
    CREATE DATABASE "$APP_POSTGRES_DB";
EOSQL
