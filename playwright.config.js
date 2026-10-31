const { defineConfig, devices } = require('@playwright/test');
const baseURL = `http://localhost:${process.env.PORT || 3000}`;

/**
 * Visual Regression Testing Configuration
 * See https://playwright.dev/docs/test-configuration.
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Maximum time one test can run for */
  timeout: 30 * 1000,
  expect: {
    /* Visual snapshot comparison configuration */
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
      threshold: 0.2,
      animations: 'disabled',
    },
  },
  /* Unified baseline directory for consistent visual comparison */
  snapshotPathTemplate: '{testDir}/baselines/{arg}{ext}',
  /* Run tests sequentially for deterministic visual rendering */
  fullyParallel: false,
  workers: 1,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 0,
  /* Reporter to use. Generates comprehensive HTML report with baseline/actual/diff */
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }]
  ],
  /* Shared settings for all the projects below. */
  use: {
    baseURL,
    locale: 'vi-VN',
    timezoneId: 'Asia/Ho_Chi_Minh',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
    viewport: { width: 1280, height: 720 },
  },

  /* Configure projects for major browsers and viewports */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
        deviceScaleFactor: 1,
      },
    },
  ],

  /* Run local dev server before starting the tests */
  webServer: {
    command: 'node server.js',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 10 * 1000,
  },
});
