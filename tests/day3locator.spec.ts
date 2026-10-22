import { getLocalPageUrl } from './utils/local-page';

import { test } from '@playwright/test';
test('click the correct product button', async ({ page }) => {
  await page.goto(getLocalPageUrl('tests/pages/day3.html'));
  const tshirt = page.locator('section').filter({
    has: page.getByRole('heading', { name: 'Cotton T-shirt' })
  });
  await tshirt.getByRole('button', { name: 'Add to cart' }).click();
  console.log('Clicked Add to cart for Cotton T-shirt');
});