import 'source-map-support/register'
import { TodoUpdate } from '../models/TodoUpdate'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

export function createTodoUpdate(request: UpdateTodoRequest) : TodoUpdate {
  return {
    ...request
  }
}
