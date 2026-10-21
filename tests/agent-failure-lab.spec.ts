import { test, expect } from '@playwright/test';

test('failure analysis lab', async ({ page }) => {
  await page.goto('https://demo-bank.ct.digital.ai/login');
  await expect(page.getByRole('heading', { name: 'Login', exact: true })).toBeVisible();
});
