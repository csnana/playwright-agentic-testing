import { getLocalPageUrl } from './utils/local-page';

import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
  await page.goto(getLocalPageUrl('tests/pages/day3.html'));
});
test('1. Shopping page loads', async ({ page }) => {
  await expect(page).toHaveTitle('Day 3 Shopping Cart');
  await expect(page.getByRole('heading', { name: 'Shopping Page' })).toBeVisible();
});
test('2. Login fields are visible', async ({ page }) => {
  await expect(page.getByLabel('Username')).toBeVisible();
  await expect(page.getByLabel('Password')).toBeVisible();
});
test('3. Cart starts empty', async ({ page }) => {
  await expect(page.locator('#cart-count')).toHaveText('Items in cart: 0');
});
test('4. T-shirt quantity can be changed', async ({ page }) => {
  const tshirt = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Cotton T-shirt' }) });
  await tshirt.getByLabel('Quantity').fill('2');
  await expect(tshirt.getByLabel('Quantity')).toHaveValue('2');
});
test('5. Adding two T-shirts updates cart', async ({ page }) => {
  const tshirt = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Cotton T-shirt' }) });
  await tshirt.getByLabel('Quantity').fill('2');
  await tshirt.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.locator('#cart-count')).toHaveText('Items in cart: 2');
});
test('6. Adding three polos updates cart', async ({ page }) => {
  const polo = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Cotton Polo' }) });
  await polo.getByLabel('Quantity').fill('3');
  await polo.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.locator('#cart-count')).toHaveText('Items in cart: 3');
});
test('7. Adding both products accumulates cart count', async ({ page }) => {
  const tshirt = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Cotton T-shirt' }) });
  const polo = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Cotton Polo' }) });
  await tshirt.getByLabel('Quantity').fill('2');
  await tshirt.getByRole('button', { name: 'Add to cart' }).click();
  await polo.getByLabel('Quantity').fill('3');
  await polo.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.locator('#cart-count')).toHaveText('Items in cart: 5');
});

test('8. Product search filters displayed products', async ({ page }) => {
  await page.getByLabel('Search products').fill('T-shirt');
  const tshirt = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Cotton T-shirt' }) });
  const polo = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Cotton Polo' }) });
  await expect(tshirt).toBeVisible();
  await expect(polo).toBeHidden();
  console.log('Search correctly filtered products');
});

test.afterEach(async ({}, testInfo) => {
  console.log(`Test "${testInfo.title}" finished in worker ${testInfo.workerIndex}`);
//   await new Promise(resolve => setTimeout(resolve, 3000));
});