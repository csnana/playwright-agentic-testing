import { test, expect } from '@playwright/test';

interface PostDto {
  title: string;
  body: string;
  userId: number;
}

test('GET JSON API validates a collection', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
  expect(response.status()).toBe(200);
  const todos = await response.json();
  expect(Array.isArray(todos)).toBe(true);
  expect(todos).toHaveLength(5);
  for (const todo of todos) {
    expect(todo).toHaveProperty('userId');
    expect(todo).toHaveProperty('id');
    expect(todo).toHaveProperty('title');
    expect(todo).toHaveProperty('completed');
    expect(typeof todo.completed).toBe('boolean');
  }
  console.log('Validated todos:', todos.length);
});

test('POST request sends and validates JSON payload', async ({ request }) => {
  const payload: PostDto = {
    title: 'Playwright API test',
    body: 'Learning POST requests',
    userId: 1
  };
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: payload
  });
  expect(response.status()).toBe(201);
  const data: PostDto & { id: number } = await response.json();
  expect(data.title).toBe(payload.title);
  expect(data.body).toBe(payload.body);
  expect(data.userId).toBe(payload.userId);
  expect(data.id).toBeDefined();
  expect(typeof data.id).toBe('number');
});



test('GET request validates response headers', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/todos/1');
  expect(response.status()).toBe(200);
    console.log('Status text:', response.statusText());
  console.log('Headers:', await response.headers());
  console.log('Body:', await response.text());

  const headers = response.headers();
  expect(headers['content-type']).toContain('application/json');
  console.log('Content-Type:', headers['content-type']);
});

test('GET request sends a custom header', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/todos/1', {
    headers: {
      'X-Test-Client': 'Playwright'
    }
  });
  expect(response.status()).toBe(200);
  console.log('Status:', response.status());
});