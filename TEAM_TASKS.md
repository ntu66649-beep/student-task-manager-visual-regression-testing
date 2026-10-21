# Phân chia Công việc Nhóm (Team Tasks Allocation)

Dự án: **Student Task Manager – Visual Regression Testing**  
Quy mô nhóm: **4 Thành viên**

---

## 1. Bảng Phân Công Nhiệm Vụ Tổng Thể

| Thành viên | Vai trò chính | Trách nhiệm chính | File phụ trách chính | Tỉ lệ đóng góp | Trạng thái |
|---|---|---|---|---|---|
| **Thành viên 1** (Trưởng nhóm) | **QA Lead / Architect** | - Thiết lập kiến trúc dự án và cấu hình Playwright Visual Testing.<br>- Tái sử dụng source code gốc và kiểm soát toàn vẹn giao diện.<br>- Xây dựng kịch bản Demo PASS/FAIL và quản lý baseline snapshots.<br>- Viết `README.md` và tổng hợp `TEST_REPORT.md`. | `package.json`<br>`playwright.config.js`<br>`server.js`<br>`scripts/demo-pass.js`<br>`scripts/demo-fail.js`<br>`README.md`<br>`TEST_REPORT.md` | 28% | **HOÀN THÀNH** |
| **Thành viên 2** | **Test Automation Engineer A** | - Xây dựng ca kiểm thử trực quan cho Màn hình Đăng nhập (TC_VISUAL_01).<br>- Xây dựng ca kiểm thử trạng thái Lỗi Đăng nhập (TC_VISUAL_02).<br>- Xây dựng ca kiểm thử màn hình Quản trị viên Admin Portal (TC_VISUAL_06).<br>- Viết tài liệu đặc tả ca kiểm thử `TEST_CASES.md`. | `tests/visual.spec.js` (TC 01, 02, 06)<br>`tests/helpers/test-utils.js`<br>`TEST_CASES.md` | 24% | **HOÀN THÀNH** |
| **Thành viên 3** | **Test Automation Engineer B** | - Xây dựng ca kiểm thử Student Dashboard tổng thể (TC_VISUAL_03).<br>- Xây dựng ca kiểm thử component Danh sách nhiệm vụ (TC_VISUAL_04).<br>- Xây dựng ca kiểm thử component Form Thêm bài tập (TC_VISUAL_05).<br>- Thiết lập kịch bản mô phỏng lỗi CSS `visual-failure.spec.js`. | `tests/visual.spec.js` (TC 03, 04, 05)<br>`tests/visual-failure.spec.js`<br>`src/` (bảo toàn nguyên vẹn) | 24% | **HOÀN THÀNH** |
| **Thành viên 4** | **Responsive & Cloud Specialist** | - Xây dựng ca kiểm thử Responsive trên thiết bị Mobile (TC_VISUAL_07).<br>- Xây dựng ca kiểm thử Responsive trên Tablet (TC_VISUAL_08).<br>- Tích hợp module Percy đám mây tùy chọn (`percy-helper.js`).<br>- Soạn thảo cẩm nang demo và câu hỏi vấn đáp `DEMO_GUIDE.md`. | `tests/visual.spec.js` (TC 07, 08)<br>`tests/helpers/percy-helper.js`<br>`DEMO_GUIDE.md`<br>`TEAM_TASKS.md` | 24% | **HOÀN THÀNH** |

---

## 2. Chi Tiết Trách Nhiệm Từng Thành Viên

### Thành viên 1: QA Lead / System Architect
- **Mục tiêu**: Đảm bảo nền tảng kiểm thử hoạt động trơn tru, môi trường chạy ổn định trên mọi máy thành viên.
- **Nhiệm vụ cụ thể**:
  1. Khởi tạo cấu trúc dự án độc lập, sao chép an toàn source code website và native server từ dự án cũ.
  2. Cấu hình file `playwright.config.js`:
     - Thiết lập đường dẫn baseline tập trung: `snapshotPathTemplate: '{testDir}/baselines/{arg}{ext}'`.
     - Cấu hình ngưỡng so sánh pixel (`threshold: 0.2`, `maxDiffPixelRatio: 0.01`).
     - Tắt animations để triệt tiêu hiện tượng flaky khi chụp ảnh.
  3. Tạo các npm scripts cho toàn bộ quy trình: test, update baseline, demo pass/fail, xem report.
  4. Viết script điều phối `scripts/demo-pass.js` và `scripts/demo-fail.js`.
  5. Viết tài liệu `README.md` và tổng hợp kết quả chạy thực tế vào `TEST_REPORT.md`.

### Thành viên 2: Test Automation Engineer A
- **Mục tiêu**: Phụ trách các luồng xác thực (Authentication) và phân quyền Quản trị (Admin Portal).
- **Nhiệm vụ cụ thể**:
  1. Xây dựng module `test-utils.js` hỗ trợ khởi tạo dữ liệu sạch trong `localStorage` trước mỗi ca test.
  2. Lập trình kịch bản kiểm thử trực quan cho Màn hình Đăng nhập (Desktop).
  3. Lập trình kịch bản bắt trạng thái hiển thị thông báo lỗi khi đăng nhập thất bại.
  4. Lập trình kịch bản chụp toàn màn hình Admin Dashboard với đầy đủ 4 thẻ thống kê hệ thống và bảng danh sách sinh viên.
  5. Hoàn thiện tài liệu đặc tả ca kiểm thử `TEST_CASES.md`.

### Thành viên 3: Test Automation Engineer B
- **Mục tiêu**: Phụ trách giao diện làm việc chính của Sinh viên và các Component quan trọng.
- **Nhiệm vụ cụ thể**:
  1. Lập trình kịch bản kiểm thử trực quan toàn trang Student Dashboard (1280x800).
  2. Nghiên cứu và áp dụng kỹ thuật chụp ảnh mức thành phần (Component-level screenshot) cho `.task-list-card` và `.add-task-card`.
  3. Xây dựng bộ test kịch bản FAIL `tests/visual-failure.spec.js`:
     - Áp dụng kỹ thuật chèn style động tại runtime bằng `page.addStyleTag()`.
     - Mô phỏng các lỗi sai màu nút, vỡ kích thước, lệch navbar mà **tuyệt đối không can thiệp hay làm hỏng file CSS gốc**.
  4. Đối soát đảm bảo các selector HTML không bị thay đổi và không chèn thêm bất kỳ emoji/icon lạ nào vào source gốc.

### Thành viên 4: Responsive & Cloud Integration Specialist
- **Mục tiêu**: Đảm bảo tính tương thích đa thiết bị và mở rộng khả năng kiểm thử đám mây.
- **Nhiệm vụ cụ thể**:
  1. Thiết lập các cấu hình Viewport tiêu chuẩn: Mobile (375x667) và Tablet (768x1024).
  2. Lập trình kịch bản kiểm thử bố cục giao diện khi co giãn (responsive layout shift).
  3. Tích hợp thư viện `@percy/playwright`:
     - Xây dựng wrapper `percy-helper.js` tự động nhận diện `process.env.PERCY_TOKEN`.
     - Cho phép dự án chạy bình thường khi không có token và tự động upload lên Percy khi có token.
  4. Soạn thảo tài liệu hướng dẫn demo từng bước cho Giảng viên và bộ câu hỏi lý thuyết `DEMO_GUIDE.md`.

---

## 3. Quy Trình Phối Hợp & Đóng Góp (Contribution Workflow)

Để đảm bảo dự án chạy ổn định và tránh xung đột mã nguồn (merge conflict), nhóm tuân thủ quy trình sau:

### Quy ước Git Branching
- Nhánh chính: `main` (chỉ chứa phiên bản ổn định đã pass toàn bộ test).
- Nhánh tính năng:
  - `feature/auth-admin-visual` (Thành viên 2)
  - `feature/dashboard-components-visual` (Thành viên 3)
  - `feature/responsive-percy` (Thành viên 4)

### Quy định về Quản lý Baseline Snapshots
- Thư mục `tests/baselines/` chứa các tệp ảnh `.png` chuẩn.
- **Quy tắc vàng**: Không chạy `npm run test:update-snapshots` tùy tiện. Chỉ được cập nhật baseline khi có sự đồng thuận của nhóm và lý do thay đổi giao diện là hợp lệ.
- Khi tạo Pull Request: Bắt buộc đính kèm ảnh chụp màn hình kết quả chạy `npm test` với 100% test case xanh (PASS).

### Nguyên tắc bảo toàn mã nguồn gốc
- Tuyệt đối không chỉnh sửa file trong thư mục `src/` (HTML, CSS, JS).
- Không tự ý thêm icon, emoji hoặc các thành phần trang trí không có trong phiên bản website ban đầu.
- Mọi mô phỏng lỗi đều phải được thực hiện thông qua script Playwright (`page.addStyleTag`) để đảm bảo tính độc lập và khả năng phục hồi tức thì.
