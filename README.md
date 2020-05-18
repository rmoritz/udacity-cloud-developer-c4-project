# Serverless TODO Application

This is my submission for the project assignment in course 4 of the Udacity Cloud Developer Nanodegree. It is a TODO list application.

## Running frontend or backend locally

Note it is only possible to run one or the other, since both currently use TCP port 3000.

### Running the frontend locally

This will connect to my AWS serverless stack.

```
cd client
npm i
npm start
```

### Running the backend locally

```
cd backend
npm i
sls dynamodb install
sls offline start
```

Now you can query the local serverless offline instance using Postman and the included [Postman collection](https://github.com/rmoritz/udacity-cloud-developer-c4-project/blob/master/Final%20Project.postman_collection.json).
