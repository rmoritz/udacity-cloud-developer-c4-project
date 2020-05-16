import 'source-map-support/register'
import { TodoItem } from '../models/TodoItem'
import { dynamoDbWrapper } from '../utils/dynamoDbWrapper'

const docClient = dynamoDbWrapper.doc
const todosTable = process.env.TODOS_TABLE
const todosIndex = process.env.TODOS_INDEX

export async function getAllTodoItemsForUser(userId: string) : Promise<TodoItem[]> {
    const result = await docClient.query({
        TableName: todosTable,
        IndexName: todosIndex,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
    }).promise()
    
    return result.Items as TodoItem[]
}
