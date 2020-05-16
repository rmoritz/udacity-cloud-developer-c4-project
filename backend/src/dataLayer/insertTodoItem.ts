import 'source-map-support/register'
import { TodoItem } from '../models/TodoItem'
import { dynamoDbWrapper } from '../utils/dynamoDbWrapper'

const docClient = dynamoDbWrapper.doc
const todosTable = process.env.TODOS_TABLE

export async function insertTodoItem(item: TodoItem) : Promise<void> {
    await docClient.put({
        TableName: todosTable,
        Item: item
    }).promise()
}
