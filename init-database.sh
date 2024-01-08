#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER api;
    CREATE DATABASE nodejs-eb-api;
    GRANT ALL PRIVILEGES ON DATABASE nodejs-eb-api TO api;
    CREATE DATABASE nodejs-eb-api;
    GRANT ALL PRIVILEGES ON DATABASE nodejs-eb-api TO api;
EOSQL