import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
}
from 'aws-lambda'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils'
import { deleteTodoItem } from '../../dataLayer/todos'

export const handler =
middy(async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event)
  const todoId = getTodoId(event)

  await deleteTodoItem(userId, todoId)
  
  return { 
    statusCode: 204, 
    body: null 
  }
})

handler.use(
  cors({ credentials: true })
)

function getTodoId(event: APIGatewayProxyEvent): string {
  return event.pathParameters.todoId
}