const { test, expect } = require("@playwright/test");
const { loginAsStudent, loginAsAdmin } = require("./helpers/test-utils");

test("Demo selection, password visibility and login validation", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#login-btn").click();
  await expect(page.locator("#auth-error")).toBeVisible();
  await page.locator('[data-demo-user="student1"]').click();
  await expect(page.locator("#username")).toHaveValue("student1");
  await expect(page.locator("#password")).toHaveValue("123456");
  await expect(page.locator("#auth-error")).toBeHidden();
  await page
    .getByRole("button", { name: "Hiện mật khẩu", exact: true })
    .click();
  await expect(page.locator("#password")).toHaveAttribute("type", "text");
  await page.getByRole("button", { name: "Ẩn mật khẩu", exact: true }).click();
  await expect(page.locator("#password")).toHaveAttribute("type", "password");
  await page.locator("#login-btn").click();
  await expect(page.locator("#dashboard-view")).toBeVisible();
});

test("Sidebar filters, search and empty state agree with visible tasks", async ({
  page,
}) => {
  await loginAsStudent(page);
  await page.locator('[data-nav="completed"]').click();
  await expect(page.locator("#task-list .task-item")).toHaveCount(1);
  await expect(page.locator("#filter-status")).toHaveValue("completed");
  await page.locator('[data-nav="high"]').click();
  await expect(page.locator("#filter-priority")).toHaveValue("high");
  await expect(page.locator("#task-list .task-item")).toHaveCount(1);
  await page.locator("#filter-status").selectOption("pending");
  await page.locator('[data-nav="all"]').click();
  await expect(page.locator("#task-list .task-item")).toHaveCount(3);
  await page.locator("#search-input").fill("Cơ sở dữ liệu");
  await expect(page.locator("#task-list .task-item")).toHaveCount(1);
  await page.locator("#search-input").fill("không tồn tại");
  await expect(page.locator("#empty-state")).toBeVisible();
  await expect(page.locator("#stat-total")).toHaveText("3");
});

test("Add, complete, reload and delete a task; progress stays accurate", async ({
  page,
}) => {
  await loginAsStudent(page);
  await page.locator("#quick-add-task").click();
  await expect(page.locator("#task-title")).toBeFocused();
  await page.locator("#btn-add-task").click();
  await expect(page.locator("#task-form-error")).toBeVisible();
  await page.locator("#task-title").fill("Bài tập frontend mới");
  await page.locator("#task-priority").selectOption("high");
  await page
    .locator("#task-desc")
    .fill("<b>Ghi chú phải hiển thị dạng văn bản</b>");
  await page.locator("#btn-add-task").click();
  const task = page
    .locator("#task-list .task-item")
    .filter({ hasText: "Bài tập frontend mới" });
  await expect(task).toHaveCount(1);
  await expect(task.locator(".task-desc b")).toHaveCount(0);
  await expect(page.locator("#stat-total")).toHaveText("4");
  await expect(page.locator("#progress-percent")).toHaveText("25%");
  await task.getByTestId("btn-toggle-task").click();
  await expect(page.locator("#study-progress")).toHaveAttribute(
    "aria-valuenow",
    "50",
  );
  await expect(task.getByTestId("btn-toggle-task")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.reload();
  await expect(task).toHaveClass(/completed/);
  await task.getByTestId("btn-delete-task").click();
  await expect(task).toHaveCount(0);
  await expect(page.locator("#progress-percent")).toHaveText("33%");
  for (let remaining = 3; remaining > 0; remaining--) {
    await page
      .locator('#task-list [data-testid="btn-delete-task"]')
      .first()
      .click();
  }
  await expect(page.locator("#progress-percent")).toHaveText("0%");
  await expect(page.locator("#study-progress")).toHaveAttribute(
    "aria-valuenow",
    "0",
  );
  await expect(page.locator("#empty-state")).toBeVisible();
  await page.reload();
  await expect(page.locator("#stat-total")).toHaveText("0");
  await page.locator("#logout-btn").click();
  await expect(page.locator("#auth-view")).toBeVisible();
});

test("Instructor can switch students and filter their tasks", async ({
  page,
}) => {
  await loginAsAdmin(page);
  await expect(page.locator("#admin-stat-students")).toHaveText("2");
  await page.locator('[data-username="student2"] button').click();
  await expect(page.locator("#admin-selected-student-name")).toHaveText(
    "Trần Thị Mai",
  );
  await expect(page.locator("#admin-task-list .task-item")).toHaveCount(2);
  await page.locator("#admin-filter-status").selectOption("completed");
  await expect(page.locator("#admin-task-list .task-item")).toHaveCount(1);
  await page.locator("#admin-logout-btn").click();
  await expect(page.locator("#auth-view")).toBeVisible();
});

test("Second student gets their own sample tasks on first login", async ({
  page,
}) => {
  await page.goto("/");
  await page.fill("#username", "student2");
  await page.fill("#password", "123456");
  await page.click("#login-btn");
  await expect(page.locator("#stat-total")).toHaveText("2");
  await expect(page.getByTestId("task-item-title").first()).toHaveText(
    "Thiết kế ERD và đặc tả bảng môn Cơ sở dữ liệu",
  );
  await page.reload();
  await expect(page.locator("#stat-total")).toHaveText("2");
  await page.evaluate(() =>
    localStorage.setItem("student_tasks_student2", "{}"),
  );
  await page.reload();
  await expect(page.locator("#stat-total")).toHaveText("2");
});

for (const width of [320, 375, 768, 1024, 1280, 1440]) {
  test(`No horizontal overflow on login, student and instructor views at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 });
    const checkWidth = async () => {
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
    };
    await page.goto("/");
    await checkWidth();
    await loginAsStudent(page);
    await checkWidth();
    await page.locator("#logout-btn").click();
    await loginAsAdmin(page);
    await checkWidth();
  });
}
