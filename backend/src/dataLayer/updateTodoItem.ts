import 'source-map-support/register'
import { TodoUpdate } from '../models/TodoUpdate'
import { dynamoDbWrapper } from '../utils/dynamoDbWrapper'

const docClient = dynamoDbWrapper.doc
const todosTable = process.env.TODOS_TABLE

export async function updateTodoItem(update: TodoUpdate) : Promise<void> {
    await docClient.update({
        TableName: todosTable,
        Key: {
            todoId: update.todoId,
            userId: update.userId
        },
        UpdateExpression: 'SET #name = :name, dueDate = :dueDate, done = :done',
        ExpressionAttributeNames: {
            '#name': 'name'
        },
        ExpressionAttributeValues: {
            ':name': update.name,
            ':dueDate': update.dueDate,
            ':done': update.done
        }
    }).promise()    
}
