# Báo Cáo Kết Quả Kiểm Thử Thực Tế (Visual Regression Test Report)

> Đây là báo cáo lịch sử ngày 18/10/2026, trước đợt làm mới frontend. Kết quả và hướng dẫn cho phiên bản giao diện ngày 27/10/2026 nằm trong [FRONTEND_UPDATE.md](FRONTEND_UPDATE.md).

- **Tên dự án**: Student Task Manager – Visual Regression Testing
- **Thời gian thực thi**: 18/10/2026
- **Môi trường thử nghiệm**:
  - Hệ điều hành: Windows 11 Pro (64-bit)
  - Node.js: `v24.21.0` | npm: `11.19.0`
  - Playwright Engine: `@playwright/test` `v1.48.0` (Chromium 130.0)
  - Cổng dịch vụ: Native HTTP Server tại `http://localhost:3000`

---

## 1. Tổng Quan Kết Quả Thực Thi

### Kịch bản 1: Kiểm thử Hồi quy Trực quan Chuẩn (PASS Suite)
Lệnh thực thi: `npm test` hoặc `npm run demo:pass`

```text
Running 8 tests using 1 worker

  ok 1 [chromium] › tests\visual.spec.js:12:3 › TC_VISUAL_01 - Login Page Desktop View (698ms)
  ok 2 [chromium] › tests\visual.spec.js:25:3 › TC_VISUAL_02 - Login Page Error State (660ms)
  ok 3 [chromium] › tests\visual.spec.js:42:3 › TC_VISUAL_03 - Student Dashboard Full View (998ms)
  ok 4 [chromium] › tests\visual.spec.js:53:3 › TC_VISUAL_04 - Task List Component (1.1s)
  ok 5 [chromium] › tests\visual.spec.js:66:3 › TC_VISUAL_05 - Add Task Form Component (1.3s)
  ok 6 [chromium] › tests\visual.spec.js:79:3 › TC_VISUAL_06 - Admin Dashboard Portal View (1.3s)
  ok 7 [chromium] › tests\visual.spec.js:90:3 › TC_VISUAL_07 - Responsive Mobile View (375x667) (1.3s)
  ok 8 [chromium] › tests\visual.spec.js:102:3 › TC_VISUAL_08 - Responsive Tablet View (768x1024) (1.2s)

  8 passed (10.2s)
```

| Chỉ số | Giá trị | Đánh giá |
|---|---|---|
| **Tổng số ca kiểm thử** | 8 | Đầy đủ phạm vi yêu cầu |
| **Số ca kiểm thử ĐẠT (PASS)** | **8 (100%)** | Hoàn hảo |
| **Số ca kiểm thử HỎNG (FAIL)** | **0 (0%)** | Không có lỗi phát sinh |
| **Tỉ lệ pixel sai khác (Pixel Diff Ratio)** | **0.00%** | Khớp hoàn toàn với Baseline |
| **Tổng thời gian chạy** | **10.2 giây** | Nhanh, ổn định |

---

### Kịch bản 2: Mô phỏng Phát hiện Sai khác Giao diện (FAIL Suite)
Lệnh thực thi: `npm run demo:fail`

```text
Running 2 tests using 1 worker

  x 1 [chromium] › tests\visual-failure.spec.js:17:3 › DEMO_FAIL_01 - Phát hiện thay đổi màu sắc và kích thước nút Login (CSS Regression) (1.8s)
  x 2 [chromium] › tests\visual-failure.spec.js:45:3 › DEMO_FAIL_02 - Phát hiện vỡ layout Dashboard và sai lệch màu Navbar (CSS Regression) (1.5s)

  2 failed
```

| Test Case Thất Bại | Baseline Snapshot Đối Sánh | Số Pixel Bị Lệch | Tỉ lệ Sai Lệch | Trạng Thái Báo Cáo |
|---|---|---|---|---|
| **DEMO_FAIL_01** | `01-login-page-desktop.png` | **45,026 pixels** | **5.0%** diện tích ảnh | Phát hiện chính xác lỗi đổi màu nút & phình to viền form |
| **DEMO_FAIL_02** | `03-student-dashboard-full.png` | **143,803 pixels** | **15.0%** diện tích ảnh | Phát hiện chính xác lỗi vỡ Navbar tím & lệch bo góc card |

---

## 2. Bảng Chi Tiết Kết Quả Từng Test Case (Suite PASS)

| STT | Mã Test Case | Tên Ca Kiểm Thử | Tệp Baseline Được Tạo | Dung lượng Tệp | Thời gian Chạy | Trạng thái |
|---|---|---|---|---|---|---|
| 1 | `TC_VISUAL_01` | Login Page Desktop View | `01-login-page-desktop.png` | 240,176 bytes | 698ms | **PASS** |
| 2 | `TC_VISUAL_02` | Login Page Error State | `02-login-error-state.png` | 239,083 bytes | 660ms | **PASS** |
| 3 | `TC_VISUAL_03` | Student Dashboard Full View | `03-student-dashboard-full.png` | 102,600 bytes | 998ms | **PASS** |
| 4 | `TC_VISUAL_04` | Task List Component | `04-task-list-component.png` | 57,181 bytes | 1.1s | **PASS** |
| 5 | `TC_VISUAL_05` | Add Task Form Component | `05-add-task-form-component.png` | 17,840 bytes | 1.3s | **PASS** |
| 6 | `TC_VISUAL_06` | Admin Dashboard Portal View | `06-admin-dashboard-portal.png` | 107,991 bytes | 1.3s | **PASS** |
| 7 | `TC_VISUAL_07` | Responsive Mobile View (375x667) | `07-student-dashboard-mobile.png` | 30,383 bytes | 1.3s | **PASS** |
| 8 | `TC_VISUAL_08` | Responsive Tablet View (768x1024) | `08-student-dashboard-tablet.png` | 56,796 bytes | 1.2s | **PASS** |

---

## 3. Bằng Chứng So Sánh Ảnh (Baseline vs Actual vs Diff)

Khi thực thi kịch bản `npm run demo:fail`, Playwright tự động lưu trữ bộ 3 ảnh bằng chứng trong thư mục `test-results/`:

### Bằng chứng 1: Ca `DEMO_FAIL_01` (Nút Đăng Nhập & Form Viền)
1. **Expected (Ảnh chuẩn Baseline)**:
   - Đường dẫn: `tests/baselines/01-login-page-desktop.png`
   - Nút đăng nhập màu xanh dương chuẩn (`#3b82f6`), bo góc mềm mại, kích thước cân đối.
2. **Received (Ảnh chụp thực tế bị lỗi)**:
   - Đường dẫn: `test-results/.../01-login-page-desktop-actual.png`
   - Nút đăng nhập bị chuyển thành màu đỏ thẫm (`#dc2626`), chữ in hoa, padding phình to; form có viền đỏ bao quanh.
3. **Diff (Ảnh đánh dấu sai biệt)**:
   - Đường dẫn: `test-results/.../01-login-page-desktop-diff.png`
   - Playwright tô sáng màu đỏ rực rỡ đúng vị trí nút bấm và viền form bị sai lệch (45,026 pixels).

### Bằng chứng 2: Ca `DEMO_FAIL_02` (Navbar & Thẻ Thống Kê Dashboard)
1. **Expected (Ảnh chuẩn Baseline)**:
   - Đường dẫn: `tests/baselines/03-student-dashboard-full.png`
   - Thanh Navbar màu tối (`#1e293b`), các thẻ thống kê bo góc 10px, biểu tượng cân đối.
2. **Received (Ảnh chụp thực tế bị lỗi)**:
   - Đường dẫn: `test-results/.../03-student-dashboard-full-actual.png`
   - Thanh Navbar bị chuyển màu tím rực (`#7c3aed`), thẻ thống kê bị mất bo tròn và xuất hiện viền cam nhô ra.
3. **Diff (Ảnh đánh dấu sai biệt)**:
   - Đường dẫn: `test-results/.../03-student-dashboard-full-diff.png`
   - Vùng Navbar và hàng thẻ số liệu được bôi đỏ cảnh báo sai lệch toàn diện (143,803 pixels).

---

## 4. Các Vấn Đề Gặp Phải & Giải Pháp Kỹ Thuật

Trong quá trình triển khai, nhóm đã xử lý thành công các thách thức đặc thù của Visual Regression Testing:

1. **Vấn đề Flaky do Hiệu ứng Động (CSS Transitions & Animations)**:
   - *Hiện tượng*: Một số thành phần nút bấm hoặc thông báo toast có hiệu ứng chuyển động mờ dần khiến ảnh chụp giữa các lần chạy bị lệch vài pixel ngẫu nhiên.
   - *Giải pháp*: Cấu hình `animations: 'disabled'` trong `playwright.config.js` để tự động đóng băng tất cả hiệu ứng CSS animation trong lúc chụp màn hình.

2. **Vấn đề Dữ liệu Động trong `localStorage`**:
   - *Hiện tượng*: Nếu phiên làm việc trước để lại trạng thái đăng nhập dở dang hoặc danh sách task bị xóa bớt, giao diện sẽ khác với baseline.
   - *Giải pháp*: Xây dựng hàm `setupDeterministicStorage(page)` chạy trước mỗi test case qua hook `beforeEach` để xóa sạch session cũ và nạp lại bộ dữ liệu mẫu cố định.

3. **Vấn đề Đường dẫn Baseline giữa các Test Suite**:
   - *Hiện tượng*: Mặc định Playwright lưu snapshot theo tên từng file test, khiến test suite lỗi không dùng chung được baseline với test suite chuẩn.
   - *Giải pháp*: Thiết lập `snapshotPathTemplate: '{testDir}/baselines/{arg}{ext}'` để tất cả các file test cùng trỏ về một thư mục ảnh chuẩn duy nhất.

4. **Yêu cầu không làm hỏng file CSS gốc**:
   - *Giải pháp*: Thay vì chỉnh sửa vật lý file `style.css` (dễ gây quên revert hoặc lỗi git), nhóm sử dụng phương thức `page.addStyleTag()` tại runtime của Playwright. Lỗi CSS chỉ tồn tại trong bộ nhớ của phiên kiểm thử đó, source code gốc hoàn toàn an toàn và nguyên vẹn 100%.

---

## 5. Kết Luận
Bộ kiểm thử hồi quy trực quan đã hoàn thành đầy đủ 100% mục tiêu:
- Tái sử dụng trọn vẹn website cũ.
- Bảo đảm 8/8 test cases PASS với tỷ lệ lệch 0 pixel.
- Minh họa rõ ràng cơ chế phát hiện lỗi sai khác giao diện trong kịch bản FAIL.
- Báo cáo HTML trực quan và tài liệu hoàn chỉnh sẵn sàng cho buổi báo cáo.
