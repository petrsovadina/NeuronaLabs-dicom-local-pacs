# Zdravotnický systém pro správu pacientů

Aplikace pro správu a zobrazování zdravotnických dat pacientů s podporou DICOM snímků.

## Technologie

### Frontend
- Next.js s TypeScript
- Apollo Client pro GraphQL
- OHIF Viewer pro DICOM snímky
- Tailwind CSS pro styling

### Backend
- .NET 7 s Hot Chocolate (GraphQL)
- Entity Framework Core
- Supabase (PostgreSQL)
- Orthanc PACS Server

## Požadavky

- Node.js 18+
- .NET 7 SDK
- Docker a Docker Compose
- Supabase účet
- Orthanc PACS server

## Instalace

1. Klonování repozitáře:
```bash
git clone https://github.com/your-username/healthcare-system.git
cd healthcare-system
```

2. Instalace závislostí:
```bash
# Frontend
npm install

# Backend
cd Backend
dotnet restore
```

3. Konfigurace prostředí:
```bash
cp .env.example .env.local
# Upravte proměnné prostředí podle potřeby
```

4. Spuštění vývojového prostředí:
```bash
# Spuštění všech služeb
docker-compose up -d

# Frontend development server
npm run dev

# Backend development server
cd Backend
dotnet run
```

## Vývoj

### Struktura projektu
```
/
├── src/                  # Frontend Next.js aplikace
├── Backend/             # .NET backend
├── docker/              # Docker konfigurace
└── scripts/             # Utility skripty
```

### Testování
```bash
# Spuštění unit testů
npm test

# Spuštění E2E testů
npm run test:e2e

# Spuštění linteru
npm run lint
```

## Nasazení

### Produkční build
```bash
# Build a spuštění pomocí Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

### Manuální nasazení
1. Build frontendu:
```bash
npm run build
```

2. Build backendu:
```bash
cd Backend
dotnet publish -c Release
```

## Zabezpečení

- JWT autentizace
- RBAC (Role-Based Access Control)
- HTTPS
- Audit trail

## Zálohování

Automatické zálohování databáze je nastaveno pomocí skriptu `scripts/backup-db.sh`.

## Monitoring

- Aplikační logy v `/var/log/healthcare`
- Audit trail v databázi
- Docker kontejner metriky

## Dokumentace API

GraphQL API dokumentace je dostupná na `/graphql` endpointu v development módu.

## Licence

MIT

## Podpora

Pro podporu kontaktujte: support@healthcare-app.com
