import { test, expect } from '@playwright/test';
test('prepare test data through API', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'Prepared by API',
      body: 'Test data for UI automation',
      userId: 1
    }
  });
  expect(response.status()).toBe(201);
  const post = await response.json();
  expect(post.title).toBe('Prepared by API');
  console.log('Test data prepared with ID:', post.id);
});