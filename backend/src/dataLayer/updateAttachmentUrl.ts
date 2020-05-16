import 'source-map-support/register'
import { AttachmentUrlUpdate } from '../models/attachmentUrlUpdate'
import { dynamoDbWrapper } from '../utils/dynamoDbWrapper'

const docClient = dynamoDbWrapper.doc
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
