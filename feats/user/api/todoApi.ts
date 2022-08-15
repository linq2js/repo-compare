import { define } from 'rativ/api';
import { rest } from 'rativ/rest';

type Todo = { id: number; title: string };
type IdPayload = number;

const getById = rest.get<IdPayload, Todo>('https://jsonplaceholder.typicode.com/todos/{id}', {
  params: (id) => ({ id }),
});

const updateTodo = rest.patch<Todo>('https://jsonplaceholder.typicode.com/todos/{id}', {
  params: (todo) => ({ id: todo.id }),
  body: (todo) => todo,
});

const todoApi = define({
  getById,
  updateTodo,
});

export { todoApi };
