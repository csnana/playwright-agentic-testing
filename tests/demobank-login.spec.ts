import { test, expect } from '@playwright/test';

test('logs in and verifies the account dashboard', async ({ page }) => {
  await page.goto('https://demo-bank.ct.digital.ai/login');

  const textboxes = page.getByRole('textbox');
  await textboxes.nth(0).fill('company');
  await textboxes.nth(1).fill('company');
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  await expect(page).toHaveURL('https://demo-bank.ct.digital.ai/dashboard');
  await expect(page.getByText('Welcome to your account, Tester', { exact: true })).toBeVisible();
  await expect(page.getByText('35,000$', { exact: true })).toBeVisible();

  const transactions = [
    ['03.04.23', 'Salary', '22500'],
    ['03.04.23', 'Shopping', '-19500'],
    ['03.04.23', 'Shopping', '-1000'],
    ['03.04.23', 'Salary', '19500'],
    ['03.04.23', 'Shopping', '-800'],
    ['03.04.23', 'Shopping', '-700'],
  ];
  const rows = page.getByRole('table').getByRole('row');

  await expect(rows).toHaveCount(transactions.length + 1);
  for (const [index, transaction] of transactions.entries()) {
    await expect(rows.nth(index + 1).getByRole('cell')).toHaveText(transaction);
  }
});
