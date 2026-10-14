# Locadora Unifacisa

Sistema de locadora de filmes e jogos: back-end em Spring Boot (API REST), banco MongoDB e front-end em Angular.

## Integrantes
- Daniel Victor Bezerra Matias de Freitas, matrícula: 2525050021

## Estrutura
```
backend/             API REST (Spring Boot 3.2, Java 17, Spring Data MongoDB)
frontend/            SPA Angular 19
docker-compose.yml   MongoDB 7 local
```

## Fases (tags Git)
- **fase-1** – CRUD de Filmes e Jogos com H2 em memória (Spring Data JPA) + front Angular.
- **fase-2** – Persistência migrada para **MongoDB** (Spring Data MongoDB). Ids passam a ser `String` (ObjectId) e o front foi ajustado.

Para ver a Fase 1: `git checkout fase-1` (volte com `git checkout main`).

## Como rodar (Fase 2)
1. **MongoDB**: `docker compose up -d` (ou use um MongoDB local na porta 27017).
2. **Back-end**: abra `backend` no IntelliJ e execute `LocadoraApplication` (porta 8080), ou `cd backend && mvn spring-boot:run`.
   Outra URL do Mongo: variável de ambiente `MONGODB_URI` (padrão `mongodb://localhost:27017/locadora`).
3. **Front-end**: `cd frontend && npm install && npm start`.
4. Acesse http://localhost:4200 (o proxy encaminha `/api` para `localhost:8080`).

## Endpoints
| Método | URL | Descrição |
|---|---|---|
| GET | `/api/filmes` · `/api/jogos` | Lista todos |
| GET | `/api/filmes/{id}` · `/api/jogos/{id}` | Busca por id |
| POST | `/api/filmes` · `/api/jogos` | Cria (201) |
| PUT | `/api/filmes/{id}` · `/api/jogos/{id}` | Atualiza |
| DELETE | `/api/filmes/{id}` · `/api/jogos/{id}` | Exclui (204) |

Validação com Bean Validation (400 com erros por campo) e 404 para id inexistente.

Trabalho feito com auxílio de IA e por Daniel Victor Bezerra Matias de Freitas.
