import 'source-map-support/register'
import { TodoItem } from '../models/TodoItem'
import { createDocumentClient } from '../utils/dynamoDb'
import { createLogger } from '../utils/logger'


const logger = createLogger('getAllTodoItemsForUser')
const docClient = createDocumentClient()
const todosTable = process.env.TODOS_TABLE
const todosIndex = process.env.TODOS_INDEX

export async function getAllTodoItemsForUser(userId: string) : Promise<TodoItem[]> {
  logger.info('Querying DynamoDB for user', userId)

  const result = await docClient.query({
      TableName: todosTable,
      IndexName: todosIndex,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
  }).promise()

  logger.info('Query result', result)
  
  return result.Items as TodoItem[]
}
