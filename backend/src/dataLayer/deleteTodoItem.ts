import 'source-map-support/register'
import { dynamoDbWrapper } from '../utils/dynamoDbWrapper'

const docClient = dynamoDbWrapper.doc
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
