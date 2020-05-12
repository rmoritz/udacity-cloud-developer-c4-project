import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
}
from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { TodoItem } from '../../models/TodoItem'
import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import * as uuid from 'uuid'
import { getUserId } from '../utils'
import { JsonWebTokenError } from 'jsonwebtoken'

const XAWS = AWSXRay.captureAWS(AWS)
const docClient = new XAWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE

export const handler =
middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event)
  const request = parseEventBody(event)

  const newItem = await createTodoItem(userId, request)
  return {
    statusCode: 200,
    body: JSON.stringify({ item: newItem })
  }
})

handler.use(
  cors({
    credentials: true
  })
)

function parseEventBody(event: APIGatewayProxyEvent): CreateTodoRequest {
  return JSON.parse(event.body);
}

async function createTodoItem(userId: string, newTodo: CreateTodoRequest) : Promise<TodoItem> {
  const todoId = uuid.v4()
  const createdAt = new Date().toISOString()
  const done = false
  const attachmentUrl = null

  const newItem = {
    todoId,
    createdAt,
    done,
    attachmentUrl,
    userId,
    ...newTodo
  }

  console.log('Storing new todo item', newItem)

  await docClient.put({
    TableName: todosTable,
    Item: newItem
  }).promise()

  return newItem
}
