/**
 * Utility functions for Visual Regression Testing
 */

/**
 * Resets local storage and session data to default clean state
 * @param {import('@playwright/test').Page} page
 */
async function setupDeterministicStorage(page) {
  await page.addInitScript(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

/**
 * Perform login as Student and wait for Dashboard rendering
 * @param {import('@playwright/test').Page} page
 */
async function loginAsStudent(page) {
  await page.goto('/');
  await page.fill('#username', 'student1');
  await page.fill('#password', '123456');
  await page.click('#login-btn');
  await page.waitForSelector('#dashboard-view:not(.hidden)', { state: 'visible' });
  await page.waitForSelector('#stat-total', { state: 'visible' });
  // Wait for any potential layout or font rendering to stabilize
  await page.waitForTimeout(300);
}

/**
 * Perform login as Admin and wait for Admin Dashboard rendering
 * @param {import('@playwright/test').Page} page
 */
async function loginAsAdmin(page) {
  await page.goto('/');
  await page.fill('#username', 'admin');
  await page.fill('#password', 'admin123');
  await page.click('#login-btn');
  await page.waitForSelector('#admin-dashboard-view:not(.hidden)', { state: 'visible' });
  await page.waitForSelector('#admin-stat-students', { state: 'visible' });
  await page.waitForTimeout(300);
}

module.exports = {
  setupDeterministicStorage,
  loginAsStudent,
  loginAsAdmin,
};
