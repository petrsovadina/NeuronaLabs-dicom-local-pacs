#!/bin/bash

# Skript pro zálohování Supabase databáze
BACKUP_DIR="/backups/db"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.sql"

# Vytvoření záložní složky
mkdir -p $BACKUP_DIR

# Provedení zálohy
pg_dump $DATABASE_URL > $BACKUP_FILE

# Komprese zálohy
gzip $BACKUP_FILE

# Vymazání starých záloh (ponechání posledních 7 dnů)
find $BACKUP_DIR -type f -mtime +7 -name '*.sql.gz' -delete
