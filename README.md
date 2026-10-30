# Student Task Manager – Visual Regression Testing

Dự án kiểm thử hồi quy trực quan (**Visual Regression Testing**) cho ứng dụng web **Student Task Manager**, sử dụng công cụ kiểm thử **Playwright** (`toHaveScreenshot`) làm chủ đạo, kết hợp tùy chọn đám mây **Percy** (`@percy/playwright`).

---

## 1. Giới thiệu dự án

Visual Regression Testing (Kiểm thử hồi quy giao diện) là kỹ thuật kiểm thử tự động nhằm phát hiện những thay đổi trực quan ngoài ý muốn trên giao diện người dùng (UI) sau khi cập nhật code CSS, HTML hoặc JavaScript.

Dự án tái sử dụng mã nguồn website **Student Task Manager** từ dự án Web E2E Testing và hoạt động độc lập. Frontend đã được làm mới với giao diện sáng xanh tím; xem [FRONTEND_UPDATE.md](FRONTEND_UPDATE.md) để biết thay đổi, kết quả rà code và cách chạy kiểm tra chức năng.

### Mục tiêu dự án
- Thiết lập bộ baseline screenshots chuẩn cho các màn hình chính và thành phần quan trọng của website.
- So sánh pixel-by-pixel giữa ảnh chụp thực tế (actual) và ảnh chuẩn (baseline).
- Phát hiện kịp thời các lỗi CSS regression (vỡ layout, lệch kích thước, đổi sai màu sắc, sai font chữ).
- Xuất báo cáo HTML trực quan hiển thị ảnh Expected (Baseline), Received (Actual) và Diff (vùng sai lệch được tô màu đỏ).
- Cung cấp hai kịch bản demo trực tiếp: **PASS** (giao diện chuẩn) và **FAIL** (phát hiện lỗi cố tình).

---

## 2. Công nghệ sử dụng

- **Visual Testing Engine**: [Playwright](https://playwright.dev/) (`@playwright/test`)
  - Phương thức so sánh: `expect(page).toHaveScreenshot()` và `expect(locator).toHaveScreenshot()`
  - Thuật toán so sánh pixel: Ngưỡng `threshold: 0.2`, `maxDiffPixelRatio: 0.01`
  - Vô hiệu hóa hiệu ứng động tự động (`animations: 'disabled'`) để đảm bảo tính ổn định (deterministic).
- **Cloud Visual Platform (Tùy chọn)**: [Percy](https://percy.io/) (`@percy/playwright`, `@percy/cli`)
  - Chạy linh hoạt: Tự động kích hoạt khi có biến môi trường `PERCY_TOKEN`, bỏ qua an toàn khi chạy offline cục bộ.
- **Web Application**:
  - Giao diện: HTML5 Semantic, CSS3 thuần, JavaScript ES6+ Vanilla
  - Web Server: Node.js Native HTTP Server (chạy tại cổng 3000)
- **Reporting**:
  - Playwright HTML Report (`playwright show-report`) với chế độ so sánh 3 ảnh: Slider, Side-by-Side và Diff.

---

## 3. Cấu trúc thư mục

```text
student-task-manager-visual-regression-testing/
├── package.json                   # Danh sách thư viện và npm scripts
├── playwright.config.js            # Cấu hình Playwright, webServer và snapshotPathTemplate
├── server.js                      # Native HTTP Server phục vụ website tại port 3000
├── src/                           # Mã nguồn frontend hiện tại
│   ├── index.html                 # Giao diện chính (Login, Student Dashboard, Admin Portal)
│   ├── css/
│   │   └── style.css              # Design tokens, layout và responsive
│   └── js/
│       └── app.js                 # Xử lý logic và lưu trữ localStorage
├── tests/
│   ├── baselines/                 # 8 ảnh baseline cho giao diện hiện tại
│   │   ├── 01-login-page-desktop.png
│   │   ├── 02-login-error-state.png
│   │   ├── 03-student-dashboard-full.png
│   │   ├── 04-task-list-component.png
│   │   ├── 05-add-task-form-component.png
│   │   ├── 06-admin-dashboard-portal.png
│   │   ├── 07-student-dashboard-mobile.png
│   │   └── 08-student-dashboard-tablet.png
│   ├── helpers/
│   │   ├── percy-helper.js        # Module hỗ trợ Percy snapshot có kiểm tra PERCY_TOKEN
│   │   └── test-utils.js          # Helper đăng nhập và reset localStorage
│   ├── visual.spec.js             # Bộ 8 visual test cases chính (Kịch bản PASS)
│   └── visual-failure.spec.js     # Bộ test mô phỏng lỗi CSS (Kịch bản FAIL - không sửa file gốc)
├── scripts/
│   ├── demo-pass.js               # Script chạy demo kịch bản PASS
│   └── demo-fail.js               # Script chạy demo kịch bản FAIL
├── playwright-report/             # Báo cáo HTML trực quan được sinh ra tự động
├── test-results/                  # Thư mục lưu vết actual, diff và trace khi có lỗi
├── README.md                      # Tài liệu tổng quan và hướng dẫn dự án
├── TEST_CASES.md                  # Đặc tả chi tiết 8 ca kiểm thử hồi quy trực quan
├── TEAM_TASKS.md                  # Bảng phân chia công việc cho nhóm 4 thành viên
├── TEST_REPORT.md                 # Báo cáo kết quả kiểm thử thực tế
└── DEMO_GUIDE.md                  # Cẩm nang hướng dẫn demo và câu hỏi vấn đáp cho Giảng viên
```

---

## 4. Hướng dẫn cài đặt & Khởi chạy

### Yêu cầu tiên quyết
- Đã cài đặt [Node.js](https://nodejs.org/) (phiên bản 18 trở lên).
- Trình duyệt Chromium được Playwright hỗ trợ.

### Bước 1: Cài đặt thư viện dependencies
Mở Terminal tại thư mục dự án và chạy:
```bash
npm install
```

*(Tùy chọn: Nếu chưa tải trình duyệt Playwright Chromium)*:
```bash
npx playwright install chromium
```

### Bước 2: Khởi động Web Server (Nếu muốn mở thủ công trên trình duyệt)
```bash
npm start
```
Truy cập tại: `http://localhost:3000`  
*(Lưu ý: Khi chạy test qua Playwright, server sẽ được cấu hình tự động bật/tắt trong file `playwright.config.js`).*

---

## 5. Danh sách npm scripts

| Lệnh | Ý nghĩa | Mục đích |
|---|---|---|
| `npm test` | Chạy 8 visual test cases | Kiểm chứng hồi quy so với baseline (kỳ vọng PASS) |
| `npm run test:functional` | Chạy 11 test chức năng và responsive | Kiểm tra thao tác, lưu dữ liệu, lọc và tràn ngang |
| `npm run test:all` | Chạy 19 test chính | Visual và chức năng, không gồm demo cố tình FAIL |
| `npm run test:update-snapshots` | Chụp lại và ghi đè baseline | Dùng khi có thay đổi thiết kế có chủ đích |
| `npm run test:fail` | Chạy bộ test mô phỏng lỗi | Kích hoạt phát hiện lỗi CSS và sinh diff |
| `npm run demo:pass` | Chạy kịch bản Demo PASS | Dành cho demo nhanh trước Giảng viên |
| `npm run demo:fail` | Chạy kịch bản Demo FAIL | Dành cho demo bắt lỗi CSS và xem ảnh diff |
| `npm run report` | Mở HTML Report trên trình duyệt | Xem trực quan ảnh Baseline, Actual và Diff |
| `npm run test:percy` | Chạy test kết hợp Percy CLI | Gửi snapshot lên dashboard Percy (nếu có Token) |

---

## 6. Kịch bản Demo thực tế

### Kịch bản 1: DEMO PASS (Giao diện khớp baseline)
Chạy lệnh:
```bash
npm run demo:pass
```
- Playwright khởi động server nội bộ tại `http://localhost:3000`.
- Chạy lần lượt 8 test cases.
- So sánh ảnh chụp thực tế với ảnh trong `tests/baselines/`.
- Kết quả: **8/8 PASSED** (Độ lệch 0 pixel).

### Kịch bản 2: DEMO FAIL (Phát hiện sai lệch CSS & hiển thị Diff)
Chạy lệnh:
```bash
npm run demo:fail
```
- Test mô phỏng trường hợp một lập trình viên vô tình đổi màu nút Login từ xanh sang đỏ rực, phóng to padding, làm lệch Navbar và bo góc card.
- Thay đổi này được chèn động trong bộ nhớ qua `page.addStyleTag()` trong phiên kiểm thử, **hoàn toàn không làm hỏng file `style.css` gốc**.
- Playwright ngay lập tức báo FAILED với số lượng pixel sai lệch cụ thể.
- Mở báo cáo để quan sát ảnh diff:
```bash
npm run report
```
Trên báo cáo, chọn test case bị fail, nhấp vào tab **Image Diff** để kéo thanh trượt (slider) so sánh giữa **Expected** (ảnh chuẩn) và **Actual** (ảnh lỗi).

---

## 7. Tích hợp Percy (Tùy chọn nâng cao)

Để gửi snapshot lên nền tảng đám mây Percy:
1. Đăng ký tài khoản tại [percy.io](https://percy.io) và tạo dự án mới.
2. Lấy `PERCY_TOKEN` từ trang cài đặt dự án của Percy.
3. Thiết lập biến môi trường và chạy:
   - Trên Windows PowerShell:
     ```powershell
     $env:PERCY_TOKEN="your_token_here"
     npm run test:percy
     ```
   - Trên Command Prompt (cmd):
     ```cmd
     set PERCY_TOKEN=your_token_here
     npm run test:percy
     ```
Nếu không cung cấp `PERCY_TOKEN`, hệ thống tự động bỏ qua Percy và chạy cục bộ hoàn toàn bình thường mà không gây lỗi.


## StudyFlow shared interface

The login and workspace now use the common StudyFlow design across all seven projects. See [STUDYFLOW_SYNC.md](STUDYFLOW_SYNC.md) for the palette, preserved testing behavior, run instructions and verification limits.
