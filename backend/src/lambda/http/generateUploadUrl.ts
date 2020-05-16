import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
}
from 'aws-lambda'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils'
import { createAttachmentUrlUpdate } from '../../businessLogic/createAttachmentUrlUpdate'
import { updateAttachmentUrl } from '../../dataLayer/updateAttachmentUrl'
import { getUploadUrl } from '../../dataLayer/getUploadUrl'

const attachmentsBucket = process.env.ATTACHMENTS_BUCKET
const bucketUri = `https://${attachmentsBucket}.s3.amazonaws.com`

export const handler =
middy(async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event)
  const todoId = getTodoId(event)
  const imageUrl = `${bucketUri}/${todoId}`
  const update = createAttachmentUrlUpdate(userId, todoId, imageUrl)

  await updateAttachmentUrl(update)
  const uploadUrl = await getUploadUrl(todoId)

  return {
    statusCode: 200,
    body: JSON.stringify({ uploadUrl })
  }
})

handler.use(
  cors({ credentials: true })
)

function getTodoId(event: APIGatewayProxyEvent): string {
  return event.pathParameters.todoId
}
