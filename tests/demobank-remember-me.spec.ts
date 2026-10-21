import { expect, test, type Page } from '@playwright/test';

const LOGIN_URL = 'https://demo-bank.ct.digital.ai/login';
const DASHBOARD_URL = 'https://demo-bank.ct.digital.ai/dashboard';

const usernameField = (page: Page) =>
  page.locator('dx-text-box[data-auto="username"]').getByRole('textbox');

const passwordField = (page: Page) =>
  page.locator('dx-text-box[data-auto="password"]').getByRole('textbox');

const rememberMeCheckbox = (page: Page) =>
  page.getByRole('checkbox', { name: /Remember me/ });

async function signIn(page: Page, rememberMe: boolean) {
  await page.goto(LOGIN_URL);
  await rememberMeCheckbox(page).setChecked(rememberMe);
  await usernameField(page).fill('company');
  await passwordField(page).fill('company');
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  await expect(page).toHaveURL(DASHBOARD_URL);
  await expect(
    page.getByText('Welcome to your account, Tester', { exact: true }),
  ).toBeVisible();
}

test('Remember me is checked by default on the login page', async ({ page }) => {
  await page.goto(LOGIN_URL);

  await expect(rememberMeCheckbox(page)).toBeChecked();
});

test('authentication remains after reload when Remember me is checked', async ({ page }) => {
  await signIn(page, true);

  await page.reload();

  await expect(page).toHaveURL(DASHBOARD_URL);
  await expect(
    page.getByText('Welcome to your account, Tester', { exact: true }),
  ).toBeVisible();
});

test('authentication remains after reload when Remember me is unchecked', async ({ page }) => {
  await signIn(page, false);

  await page.reload();

  await expect(page).toHaveURL(DASHBOARD_URL);
  await expect(
    page.getByText('Welcome to your account, Tester', { exact: true }),
  ).toBeVisible();
});

test('a new tab in the same context is redirected to login', async ({ page }) => {
  await signIn(page, true);

  const newTab = await page.context().newPage();
  await newTab.goto(DASHBOARD_URL);

  await expect(newTab).toHaveURL(LOGIN_URL);
  await expect(newTab.getByRole('heading', { name: 'Login', exact: true })).toBeVisible();
});

test('a fresh browser context is redirected to login', async ({ page }) => {
  await page.goto(DASHBOARD_URL);

  await expect(page).toHaveURL(LOGIN_URL);
  await expect(page.getByRole('heading', { name: 'Login', exact: true })).toBeVisible();
});
