import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
  await page.goto('file:///Users/nanjappa/Projects/tests/pages/day3.html');
});
test('login button is visible', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});
test('shopping cart starts empty', async ({ page }) => {
  await expect(page.locator('#cart-count')).toHaveText('Items in cart: 0');
});
test('T-shirt quantity can be changed', async ({ page }) => {
  const tshirt = page.locator('section').filter({
    has: page.getByRole('heading', { name: 'Cotton T-shirt' })
  });
  await tshirt.getByLabel('Quantity').fill('2');
  await expect(tshirt.getByLabel('Quantity')).toHaveValue('2');
});
