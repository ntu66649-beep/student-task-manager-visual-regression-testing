const { test, expect } = require('@playwright/test');
const { setupDeterministicStorage, loginAsStudent } = require('./helpers/test-utils');

/**
 * Visual Regression Testing - FAIL Demo Suite
 * Cố tình mô phỏng lỗi giao diện (CSS regression bugs) qua runtime style injection.
 * Giữ nguyên 100% mã nguồn gốc (không sửa file src/css/style.css).
 * Playwright sẽ phát hiện sai khác so với baseline và xuất Diff Screenshot trong HTML Report.
 */

test.describe('Student Task Manager - Visual Regression FAIL Demo', () => {

  test.beforeEach(async ({ page }) => {
    await setupDeterministicStorage(page);
  });

  test('DEMO_FAIL_01 - Phát hiện thay đổi màu sắc và kích thước nút Login (CSS Regression)', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#auth-view:not(.hidden)', { state: 'visible' });

    // Mô phỏng lỗi CSS vô tình bị thêm vào hoặc thay đổi
    await page.addStyleTag({
      content: `
        /* Lỗi: Thay đổi màu nút chính và font size */
        .btn-primary {
          background-color: #dc2626 !important; /* Đỏ thay vì xanh dương */
          padding: 18px 24px !important;
          border-radius: 30px !important;
          font-size: 1.2rem !important;
          letter-spacing: 2px !important;
        }
        .auth-card {
          border: 3px solid #dc2626 !important;
          transform: rotate(0.5deg);
        }
      `
    });

    await page.waitForTimeout(200);

    // So sánh với baseline ban đầu -> Sẽ phát hiện sai khác (FAILED)
    await expect(page).toHaveScreenshot('01-login-page-desktop.png');
  });

  test('DEMO_FAIL_02 - Phát hiện vỡ layout Dashboard và sai lệch màu Navbar (CSS Regression)', async ({ page }) => {
    await loginAsStudent(page);

    // Mô phỏng lỗi vỡ layout trên Dashboard
    await page.addStyleTag({
      content: `
        /* Lỗi: Navbar bị đổi màu tím, font chữ to bất thường */
        .navbar {
          background: #7c3aed !important;
          padding: 24px 32px !important;
        }
        /* Lỗi: Stats card bị lệch kích thước và bo góc dị thường */
        .stat-card {
          border-radius: 0px !important;
          border-left: 8px solid #f59e0b !important;
          transform: scale(1.03);
        }
        /* Lỗi: Tiêu đề danh sách task bị lệch vị trí */
        .task-list-header h3 {
          color: #dc2626 !important;
          font-size: 1.7rem !important;
        }
      `
    });

    await page.waitForTimeout(200);

    // So sánh với baseline ban đầu -> Sẽ phát hiện sai khác (FAILED)
    await expect(page).toHaveScreenshot('03-student-dashboard-full.png');
  });

});
