import 'source-map-support/register'
import { TodoItem } from '../models/TodoItem'
import { createDocumentClient } from '../utils/dynamoDb'

const docClient = createDocumentClient()
const todosTable = process.env.TODOS_TABLE

export async function insertTodoItem(item: TodoItem) : Promise<void> {
    await docClient.put({
        TableName: todosTable,
        Item: item
    }).promise()
}
