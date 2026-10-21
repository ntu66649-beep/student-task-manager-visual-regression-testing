const { test, expect } = require('@playwright/test');
const { takePercySnapshot } = require('./helpers/percy-helper');
const { setupDeterministicStorage, loginAsStudent, loginAsAdmin } = require('./helpers/test-utils');

test.describe('Student Task Manager - Visual Regression Suite', () => {

  test.beforeEach(async ({ page }) => {
    await setupDeterministicStorage(page);
  });

  // TC_VISUAL_01: Login Page (Desktop View)
  test('TC_VISUAL_01 - Login Page Desktop View', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#auth-view:not(.hidden)', { state: 'visible' });
    await page.waitForTimeout(200);

    // Playwright visual regression comparison
    await expect(page).toHaveScreenshot('01-login-page-desktop.png');

    // Optional Percy Snapshot
    await takePercySnapshot(page, 'TC_VISUAL_01 - Login Page Desktop');
  });

  // TC_VISUAL_02: Login Page - Error State (Validation)
  test('TC_VISUAL_02 - Login Page Error State', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#auth-view:not(.hidden)', { state: 'visible' });
    
    // Trigger validation error by clicking login with empty credentials
    await page.click('#login-btn');
    await expect(page.locator('#auth-error')).toBeVisible();
    await page.waitForTimeout(200);

    // Playwright visual regression comparison
    await expect(page).toHaveScreenshot('02-login-error-state.png');

    // Optional Percy Snapshot
    await takePercySnapshot(page, 'TC_VISUAL_02 - Login Error State');
  });

  // TC_VISUAL_03: Student Dashboard - Full View
  test('TC_VISUAL_03 - Student Dashboard Full View', async ({ page }) => {
    await loginAsStudent(page);

    // Playwright visual regression comparison
    await expect(page).toHaveScreenshot('03-student-dashboard-full.png');

    // Optional Percy Snapshot
    await takePercySnapshot(page, 'TC_VISUAL_03 - Student Dashboard Full');
  });

  // TC_VISUAL_04: Task List Component (Component Screenshot)
  test('TC_VISUAL_04 - Task List Component', async ({ page }) => {
    await loginAsStudent(page);
    const taskListCard = page.locator('.task-list-card');
    await expect(taskListCard).toBeVisible();

    // Component-level screenshot
    await expect(taskListCard).toHaveScreenshot('04-task-list-component.png');

    // Optional Percy Snapshot
    await takePercySnapshot(page, 'TC_VISUAL_04 - Task List Component', { scope: '.task-list-card' });
  });

  // TC_VISUAL_05: Add Task Form Component (Component Screenshot)
  test('TC_VISUAL_05 - Add Task Form Component', async ({ page }) => {
    await loginAsStudent(page);
    const addTaskCard = page.locator('.add-task-card');
    await expect(addTaskCard).toBeVisible();

    // Component-level screenshot
    await expect(addTaskCard).toHaveScreenshot('05-add-task-form-component.png');

    // Optional Percy Snapshot
    await takePercySnapshot(page, 'TC_VISUAL_05 - Add Task Form Component', { scope: '.add-task-card' });
  });

  // TC_VISUAL_06: Admin Dashboard - System Portal View
  test('TC_VISUAL_06 - Admin Dashboard Portal View', async ({ page }) => {
    await loginAsAdmin(page);

    // Playwright visual regression comparison
    await expect(page).toHaveScreenshot('06-admin-dashboard-portal.png');

    // Optional Percy Snapshot
    await takePercySnapshot(page, 'TC_VISUAL_06 - Admin Dashboard Portal');
  });

  // TC_VISUAL_07: Responsive Layout - Mobile View (375x667)
  test('TC_VISUAL_07 - Responsive Mobile View (375x667)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await loginAsStudent(page);

    // Playwright visual regression comparison
    await expect(page).toHaveScreenshot('07-student-dashboard-mobile.png');

    // Optional Percy Snapshot
    await takePercySnapshot(page, 'TC_VISUAL_07 - Mobile View 375x667');
  });

  // TC_VISUAL_08: Responsive Layout - Tablet View (768x1024)
  test('TC_VISUAL_08 - Responsive Tablet View (768x1024)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await loginAsStudent(page);

    // Playwright visual regression comparison
    await expect(page).toHaveScreenshot('08-student-dashboard-tablet.png');

    // Optional Percy Snapshot
    await takePercySnapshot(page, 'TC_VISUAL_08 - Tablet View 768x1024');
  });

});
