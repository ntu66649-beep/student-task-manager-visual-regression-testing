# Danh sách Ca kiểm thử Hồi quy Trực quan (Visual Regression Test Cases)

Tài liệu đặc tả chi tiết 8 ca kiểm thử hồi quy trực quan (**Visual Regression Testing**) cho hệ thống **Student Task Manager**, bao gồm mục tiêu, phạm vi chụp, các bước thực hiện, dữ liệu kiểm thử và kết quả kỳ vọng.

---

## Bảng tổng hợp Test Cases

| Mã Test Case | Tên Ca Kiểm Thử | Phạm vi / Đối tượng | Độ phân giải (Viewport) | Baseline Snapshot | Kết quả thực tế |
|---|---|---|---|---|---|
| **TC_VISUAL_01** | Kiểm thử trực quan Màn hình Đăng nhập | Toàn trang (`#auth-view`) | Desktop (1280 x 800) | `01-login-page-desktop.png` | PASS (100% khớp) |
| **TC_VISUAL_02** | Kiểm thử trực quan Trạng thái Lỗi Đăng nhập | Toàn trang (`#auth-view` + Alert) | Desktop (1280 x 800) | `02-login-error-state.png` | PASS (100% khớp) |
| **TC_VISUAL_03** | Kiểm thử trực quan Student Dashboard Tổng thể | Toàn trang (`#dashboard-view`) | Desktop (1280 x 800) | `03-student-dashboard-full.png` | PASS (100% khớp) |
| **TC_VISUAL_04** | Kiểm thử trực quan Component Danh sách Nhiệm vụ | Thành phần (`.task-list-card`) | Desktop (1280 x 800) | `04-task-list-component.png` | PASS (100% khớp) |
| **TC_VISUAL_05** | Kiểm thử trực quan Component Form Thêm Nhiệm vụ | Thành phần (`.add-task-card`) | Desktop (1280 x 800) | `05-add-task-form-component.png` | PASS (100% khớp) |
| **TC_VISUAL_06** | Kiểm thử trực quan Admin Dashboard Portal | Toàn trang (`#admin-dashboard-view`) | Desktop (1280 x 800) | `06-admin-dashboard-portal.png` | PASS (100% khớp) |
| **TC_VISUAL_07** | Kiểm thử Responsive Giao diện Di động (Mobile) | Toàn trang (`#dashboard-view`) | Mobile (375 x 667) | `07-student-dashboard-mobile.png` | PASS (100% khớp) |
| **TC_VISUAL_08** | Kiểm thử Responsive Giao diện Máy tính bảng (Tablet) | Toàn trang (`#dashboard-view`) | Tablet (768 x 1024) | `08-student-dashboard-tablet.png` | PASS (100% khớp) |

---

## Chi tiết từng Ca Kiểm Thử

### 1. TC_VISUAL_01: Login Page Desktop View
- **Mục tiêu**: Đảm bảo giao diện màn hình Đăng nhập trên màn hình máy tính hiển thị chuẩn xác: căn giữa trang, form đăng nhập, 2 ô nhập liệu (username, password), nút Đăng nhập và bảng thông tin tài khoản demo.
- **Tiền điều kiện**: Ứng dụng đã được khởi chạy tại `http://localhost:3000`, bộ nhớ `localStorage` trống (chưa có phiên đăng nhập).
- **Các bước thực hiện**:
  1. Mở trang gốc `/`.
  2. Đợi phần tử `#auth-view:not(.hidden)` hiển thị hoàn tất.
  3. Đợi font chữ và layout ổn định trong 200ms.
  4. Thực hiện so sánh ảnh toàn trang với baseline `01-login-page-desktop.png`.
- **Dữ liệu kiểm thử**: Trạng thái mặc định ban đầu.
- **Kết quả kỳ vọng**:
  - Giao diện thực tế khớp hoàn toàn với file baseline `01-login-page-desktop.png`.
  - Tỉ lệ pixel khác biệt `diffPixelRatio <= 0.01` (0%).

---

### 2. TC_VISUAL_02: Login Page Error State
- **Mục tiêu**: Kiểm tra trực quan giao diện khi xảy ra lỗi xác thực (Validation Error). Hộp thông báo màu đỏ xuất hiện phía trên form với vị trí, màu nền, đường viền và khoảng cách chính xác.
- **Tiền điều kiện**: Đang ở màn hình đăng nhập.
- **Các bước thực hiện**:
  1. Mở trang gốc `/`.
  2. Bỏ trống cả hai ô tên đăng nhập và mật khẩu.
  3. Nhấn nút "Đăng nhập" (`#login-btn`).
  4. Đợi phần tử `#auth-error` hiển thị trên màn hình.
  5. Đợi 200ms và thực hiện so sánh ảnh với baseline `02-login-error-state.png`.
- **Dữ liệu kiểm thử**: Tên đăng nhập trống, mật khẩu trống.
- **Kết quả kỳ vọng**:
  - Hộp cảnh báo lỗi `#auth-error` hiển thị với tông màu cảnh báo nguy hiểm (`--danger: #ef4444`).
  - Giao diện khớp chính xác với `02-login-error-state.png`.

---

### 3. TC_VISUAL_03: Student Dashboard Full View
- **Mục tiêu**: Kiểm thử trực quan toàn bộ bảng điều khiển của Sinh viên (Student Dashboard) bao gồm thanh điều hướng Navbar, lời chào người dùng, hàng 4 thẻ thống kê (Stats Cards), bố cục 2 cột (Thêm nhiệm vụ bên trái và Danh sách nhiệm vụ bên phải).
- **Tiền điều kiện**: Tài khoản `student1` tồn tại với bộ bài tập mẫu chuẩn.
- **Các bước thực hiện**:
  1. Điều hướng đến `/`.
  2. Điền `username = student1`, `password = 123456`.
  3. Nhấn "Đăng nhập".
  4. Chờ `#dashboard-view` hiển thị và thẻ số liệu `#stat-total` tải xong.
  5. Thực hiện so sánh ảnh toàn trang với baseline `03-student-dashboard-full.png`.
- **Dữ liệu kiểm thử**: Tài khoản `student1 / 123456`.
- **Kết quả kỳ vọng**:
  - Navbar màu tối hiển thị đúng tên hệ thống và nút Đăng xuất.
  - Hàng thẻ thống kê có 4 thẻ cân đối: Tổng (3), Chờ (2), Hoàn thành (1), Ưu tiên cao (1).
  - Không có hiện tượng tràn viền hoặc xô lệch các phần tử.

---

### 4. TC_VISUAL_04: Task List Component
- **Mục tiêu**: Kiểm tra trực quan mức thành phần (Component-level Visual Testing) riêng biệt cho thẻ danh sách công việc (`.task-list-card`), bao gồm thanh công cụ lọc/tìm kiếm, các item bài tập, huy hiệu môn học, nhãn độ ưu tiên và nút thao tác (Hoàn thành / Xóa).
- **Tiền điều kiện**: Sinh viên đã đăng nhập và đang ở Dashboard.
- **Các bước thực hiện**:
  1. Đăng nhập với tài khoản `student1`.
  2. Định vị thành phần selector `.task-list-card`.
  3. Thực hiện chụp ảnh riêng thành phần bằng `expect(taskListCard).toHaveScreenshot()`.
  4. So sánh với baseline `04-task-list-component.png`.
- **Kết quả kỳ vọng**:
  - Chỉ chụp đúng phạm vi container `.task-list-card`.
  - Huy hiệu trạng thái và độ ưu tiên hiển thị đúng màu sắc đặc trưng (Đỏ cho Cao, Vàng cho Trung bình, Xanh lá cho Đã hoàn thành).
  - Khớp 100% với baseline.

---

### 5. TC_VISUAL_05: Add Task Form Component
- **Mục tiêu**: Kiểm tra trực quan mức thành phần riêng biệt cho Form nhập liệu Thêm nhiệm vụ (`.add-task-card`), đảm bảo các trường tiêu đề, môn học, hạn nộp, độ ưu tiên, ghi chú chi tiết và nút "Lưu nhiệm vụ" sắp xếp thẳng hàng, chuẩn lề và đúng kiểu dáng thiết kế.
- **Tiền điều kiện**: Sinh viên đã đăng nhập và đang ở Dashboard.
- **Các bước thực hiện**:
  1. Đăng nhập với tài khoản `student1`.
  2. Định vị thành phần selector `.add-task-card`.
  3. Thực hiện chụp ảnh riêng thành phần bằng `expect(addTaskCard).toHaveScreenshot()`.
  4. So sánh với baseline `05-add-task-form-component.png`.
- **Kết quả kỳ vọng**:
  - Phạm vi ảnh chụp chuẩn xác bao quanh thẻ thêm nhiệm vụ.
  - Các input và label hiển thị đúng font chữ, kích cỡ và khoảng cách đệm (padding/margin).
  - Khớp 100% với baseline.

---

### 6. TC_VISUAL_06: Admin Dashboard Portal View
- **Mục tiêu**: Kiểm tra trực quan màn hình quản trị viên (Admin / Giảng viên), bao gồm thanh thông báo phân quyền Admin Portal, 4 thẻ thống kê hệ thống (Tổng sinh viên, Tổng nhiệm vụ, Đã xong, Đang chờ), cột danh sách sinh viên bên trái và danh sách bài tập của sinh viên được chọn bên phải.
- **Tiền điều kiện**: Đăng nhập với tài khoản Giảng viên / Quản trị viên `admin`.
- **Các bước thực hiện**:
  1. Điều hướng đến `/`.
  2. Điền `username = admin`, `password = admin123`.
  3. Nhấn "Đăng nhập".
  4. Chờ `#admin-dashboard-view` hiển thị và thẻ số liệu `#admin-stat-students` sẵn sàng.
  5. Thực hiện so sánh ảnh toàn trang với baseline `06-admin-dashboard-portal.png`.
- **Dữ liệu kiểm thử**: Tài khoản `admin / admin123`.
- **Kết quả kỳ vọng**:
  - Giao diện Admin Portal mang tông màu nhận diện riêng biệt.
  - Danh sách sinh viên và bài tập mẫu được tải đầy đủ.
  - Khớp 100% với baseline `06-admin-dashboard-portal.png`.

---

### 7. TC_VISUAL_07: Responsive Mobile View (375 x 667)
- **Mục tiêu**: Kiểm tra trực quan tính tương thích giao diện trên thiết bị di động cỡ nhỏ (mô phỏng theo tỉ lệ màn hình iPhone SE: 375x667). Đảm bảo giao diện chuyển đổi mượt mà từ dạng lưới 2 cột sang dạng cột dọc duy nhất (single column layout), các nút bấm co giãn phù hợp với ngón tay người dùng.
- **Tiền điều kiện**: Thiết lập kích thước cửa sổ trình duyệt `viewport = { width: 375, height: 667 }`.
- **Các bước thực hiện**:
  1. Đặt viewport `{ width: 375, height: 667 }`.
  2. Đăng nhập tài khoản `student1`.
  3. Đợi trang hoàn tất render.
  4. Thực hiện so sánh ảnh toàn trang với baseline `07-student-dashboard-mobile.png`.
- **Kết quả kỳ vọng**:
  - Toàn bộ nội dung cuộn dọc tự nhiên, không bị vỡ bố cục hay phát sinh thanh cuộn ngang ngoài ý muốn (`overflow-x: hidden`).
  - Hàng thẻ thống kê và form nhập liệu hiển thị trật tự, đẹp mắt.
  - Khớp 100% với baseline `07-student-dashboard-mobile.png`.

---

### 8. TC_VISUAL_08: Responsive Tablet View (768 x 1024)
- **Mục tiêu**: Kiểm tra trực quan tính tương thích giao diện trên máy tính bảng (mô phỏng iPad / Tablet: 768x1024). Đảm bảo các thành phần thích ứng linh hoạt giữa màn hình mobile và desktop.
- **Tiền điều kiện**: Thiết lập kích thước cửa sổ trình duyệt `viewport = { width: 768, height: 1024 }`.
- **Các bước thực hiện**:
  1. Đặt viewport `{ width: 768, height: 1024 }`.
  2. Đăng nhập tài khoản `student1`.
  3. Đợi trang hoàn tất render.
  4. Thực hiện so sánh ảnh toàn trang với baseline `08-student-dashboard-tablet.png`.
- **Kết quả kỳ vọng**:
  - Bố cục thích ứng đúng theo breakpoint CSS của tablet.
  - Khớp 100% với baseline `08-student-dashboard-tablet.png`.

---

## Các Ca Kiểm Thử Mô Phỏng Thất Bại (Demo Failure Cases)

Để chứng minh năng lực phát hiện lỗi hồi quy trực quan của công cụ, dự án xây dựng 2 ca kiểm thử cố tình đưa vào các biến đổi CSS tại runtime:

### 1. DEMO_FAIL_01: Phát hiện thay đổi màu sắc và kích thước nút Login
- **Mô tả**: Tác động CSS làm nút Đăng nhập chuyển sang màu đỏ rực `#dc2626`, kích thước đệm phình to `padding: 18px 24px`, bo tròn bất thường và khung auth card bị lệch xoay `0.5deg`.
- **Kết quả so sánh**:
  - Playwright phát hiện **45,026 pixels khác biệt** (tỉ lệ 5%).
  - Trạng thái: **FAILED** (Đúng như kỳ vọng demo).
  - Tự động sinh ảnh diff tô màu đỏ vùng nút và viền form.

### 2. DEMO_FAIL_02: Phát hiện vỡ layout Dashboard và sai lệch màu Navbar
- **Mô tả**: Tác động CSS làm thanh Navbar chuyển sang màu tím `#7c3aed`, các thẻ thống kê bị mất bo góc, thêm dải màu vàng viền trái và tiêu đề danh sách bài tập bị đổi sang màu đỏ.
- **Kết quả so sánh**:
  - Playwright phát hiện **143,803 pixels khác biệt** (tỉ lệ 15%).
  - Trạng thái: **FAILED** (Đúng như kỳ vọng demo).
  - Tự động sinh ảnh diff tô màu đỏ toàn bộ dải Navbar và hàng thống kê.
