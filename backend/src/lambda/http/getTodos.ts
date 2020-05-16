import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
}
from 'aws-lambda'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils'
import { getAllTodoItemsForUser } from '../../dataLayer/todos'

export const handler =
middy(async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event)
  const items = await getAllTodoItemsForUser(userId)

  return {
    statusCode: 200,
    body: JSON.stringify({ items })
  }
})

handler.use(
  cors({ credentials: true })
)
