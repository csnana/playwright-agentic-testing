# Playwright Agentic Testing

A small community learning project for exploring browser automation and agent-style software testing with Playwright.

The examples cover common testing topics such as locators, assertions, waits, forms, CSS comparisons, API testing, helpers, and Demo Bank workflows.

The project is integrated with GitHub Actions to run the Playwright test suite automatically on pushes, pull requests, and can be scheduled.

## Agentic Testing Integration

The project supports agentic testing through the Playwright MCP server, allowing AI agents to discover pages, interact with browser elements, inspect accessibility snapshots, run code, and validate test results.

The examples can be used with models available through the Copilot SDK in VS Code. The specific model is selected in the Copilot/VS Code environment and is not pinned by this project, so the examples can work across compatible coding and reasoning models.

## Getting Started

Make sure Node.js and npm are installed.

```bash
npm install
npx playwright install
```

## Run the Tests

Run all tests:

```bash
npm test
```

Run one test file:

```bash
npx playwright test tests/demobank-login.spec.ts
```

Run tests in Chromium, Firefox, and WebKit:

```bash
npm run test:cross-browser
```

## Test Reports

After a test run, open the generated Playwright HTML report:

```bash
npx playwright show-report
```

## Contributing

Community contributions are welcome. Feel free to open an issue or submit a pull request with an example, improvement, or bug fix.