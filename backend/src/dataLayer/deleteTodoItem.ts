import 'source-map-support/register'
import { createDocumentClient } from '../utils/dynamoDb'

const docClient = createDocumentClient()
const todosTable = process.env.TODOS_TABLE

export async function deleteTodoItem(userId: string, todoId: string) : Promise<void> {
    await docClient.delete({
        TableName: todosTable,
        Key: {
            todoId,
            userId
        }
    }).promise()
}
