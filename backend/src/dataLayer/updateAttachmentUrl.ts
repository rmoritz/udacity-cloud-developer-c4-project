import 'source-map-support/register'
import { AttachmentUrlUpdate } from '../models/attachmentUrlUpdate'
import { createDocumentClient } from '../utils/dynamoDb'

const docClient = createDocumentClient()
const todosTable = process.env.TODOS_TABLE

export async function updateAttachmentUrl(update: AttachmentUrlUpdate) : Promise<void> {
    await docClient.update({
        TableName: todosTable,
        Key: {
            todoId: update.todoId,
            userId: update.userId
        },
        UpdateExpression: 'SET attachmentUrl = :attachmentUrl',
        ExpressionAttributeValues: {
            ':attachmentUrl': update.attachmentUrl,
        }
    }).promise()    
}
