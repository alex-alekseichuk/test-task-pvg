# Pure test CRUD application.

- separate into 3 layers: controller, business service, and data model
- express HTTP framework
- In-memory SQLite storage
- sequalize ORM
- dependencies are loaded and provided by-hand

## Run unit tests:

```
npm test
```

## Build docker image:

```
docker build -t test-task-pvg
```

## Run in container:

```
docker run -it -p 3000:3000 --name test-task-pvg test-task-pvg
```

## Manual test:

```
curl -X POST http://localhost:3000/employee -d '{"name":"Alex"}' -H "Content-type: application/json"
curl -X POST http://localhost:3000/employee -d '{"name":"Dale"}' -H "Content-type: application/json"
curl http://localhost:3000/employee
curl http://localhost:3000/employee?name=Alex
curl http://localhost:3000/employee/1
curl -X DELETE http://localhost:3000/employee/1
curl -X PATCH http://localhost:3000/employee/2 -d '{"name":"Alice"}' -H "Content-type: application/json"
```
