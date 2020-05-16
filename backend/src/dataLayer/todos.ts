import 'source-map-support/register'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
import { dynamoDbWrapper } from '../utils/dynamoDbWrapper'

const docClient = dynamoDbWrapper.doc
const todosTable = process.env.TODOS_TABLE
const todosIndex = process.env.TODOS_INDEX

export async function insertTodoItem(item: TodoItem) : Promise<void> {
    await docClient.put({
        TableName: todosTable,
        Item: item
    }).promise()
}

export async function deleteTodoItem(userId: string, todoId: string) : Promise<void> {
    await docClient.delete({
        TableName: todosTable,
        Key: {
            todoId,
            userId
        }
    }).promise()
}

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

export async function updateTodoItem(userId: string, todoId: string, update: TodoUpdate)
        : Promise<void> {
    await docClient.update({
        TableName: todosTable,
        Key: {
            todoId,
            userId
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