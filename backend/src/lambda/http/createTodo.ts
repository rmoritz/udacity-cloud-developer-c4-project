import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
}
from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createTodoItem } from '../../businessLogic/createTodoItem'
import { insertTodoItem } from '../../dataLayer/todos'
import { getUserId } from '../utils'

export const handler =
middy(async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event)
  const request = getRequest(event)
  const item = createTodoItem(userId, request)

  await insertTodoItem(item)
  
  return {
    statusCode: 200,
    body: JSON.stringify({ item })
  }
})

handler.use(
  cors({ credentials: true })
)

function getRequest(event: APIGatewayProxyEvent): CreateTodoRequest {
  return JSON.parse(event.body);
}
