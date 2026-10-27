# Cập nhật frontend — 27/10/2026

Giao diện sáng xanh tím cho Student Task Manager, giữ HTML/CSS/JavaScript thuần và các ID / data-testid hiện có.

## Những gì đã cập nhật

- Đăng nhập hai cột trên desktop, minh họa bằng HTML/CSS/SVG; bố cục một cột trên điện thoại.
- Chọn nhanh tài khoản demo và bật/tắt hiển thị mật khẩu.
- Thanh điều hướng lọc nhiệm vụ theo trạng thái hoặc ưu tiên, đồng bộ với bộ lọc trong danh sách.
- Dashboard đặt danh sách nhiệm vụ trước form thêm việc; nút thêm nhanh đưa focus vào tên nhiệm vụ.
- Thanh tiến độ lấy số liệu thực tế, cập nhật khi thêm, hoàn thành hoặc xóa nhiệm vụ; hỗ trợ trạng thái chưa có nhiệm vụ.
- Trang quản trị dùng cùng hệ thống màu, typography, thẻ thống kê và icon SVG.
- Bố cục responsive, trạng thái focus bàn phím, aria-pressed cho nút hoàn thành và tùy chọn reduced motion.
- Không tải font, icon hoặc hình minh họa từ dịch vụ bên ngoài.

## Kết quả rà soát code

1. **Đã sửa: seed dữ liệu sai tài khoản.** `loadTasks()` trước đây luôn dùng `DEFAULT_SAMPLE_TASKS`, kể cả khi `student2` đăng nhập lần đầu. Nay chọn đúng dữ liệu mẫu của từng tài khoản; dữ liệu lỗi JSON hoặc không phải mảng được phục hồi bằng bản sao riêng.
2. **Đã sửa: độ ổn định của ảnh test.** Helper đăng nhập trước đây chỉ chờ 300 ms, nên ảnh có thể chứa toast chào mừng. Nay chờ toast đóng và font sẵn sàng; ảnh trang chụp toàn bộ nội dung để kiểm tra cả danh sách lẫn form trên mobile.
3. **Đã sửa: bố cục quản trị trên màn hình hẹp.** Quy tắc `.admin-grid` cũ khai báo sau media query `.content-grid`, khiến bố cục quản trị có thể giữ hai cột trên mobile. Bố cục mới chuyển về một cột, có kiểm tra tràn ngang.
4. **Giới hạn có sẵn của dự án:** đăng nhập, phân quyền và dữ liệu đều mô phỏng ở frontend/localStorage. Phù hợp demo kiểm thử; muốn dùng với dữ liệu thật cần backend xác thực và phân quyền phía server.
5. **Dependency:** lần `npm ci` trong môi trường này báo 22 cảnh báo bảo mật (9 moderate, 13 high) trong cây dependency kiểm thử hiện có. `package-lock.json` được giữ nguyên; đợt cập nhật này không nâng cấp Playwright/Percy hoặc sửa toàn bộ dependency.

## Chạy ứng dụng và kiểm tra

Yêu cầu Node.js 18+ và Chromium của Playwright.

```bash
npm ci
npx playwright install chromium
npm start
```

Mở http://localhost:3000. Tài khoản: `student1 / 123456`, `student2 / 123456`, `admin / admin123`.

```bash
npm test                       # 8 visual tests, so sánh baseline đã duyệt
npm run test:functional         # 11 test thao tác và responsive
npm run test:all                # toàn bộ 19 test chính
npm run test:fail               # 2 test cố tình gây lỗi; kết quả mong đợi là FAILED
npm run test:update-snapshots   # chỉ dùng khi chủ động duyệt thiết kế mới
```

Baseline được tạo trên Windows / Chromium với locale `vi-VN`, múi giờ `Asia/Ho_Chi_Minh`. Font hệ thống và cách render có thể khác giữa hệ điều hành; so sánh baseline nên dùng cùng môi trường. Không tăng ngưỡng sai khác để làm test pass.

`npm run test:all` chỉ chạy bộ kiểm tra chính, loại hai demo cố tình thất bại. Percy vẫn là tùy chọn.

## Kết quả xác minh phiên bản bàn giao

- Base commit: `bd2d2d7ec775639c32f930ef77edfd84a24f1aa0` trên nhánh `main`.
- Môi trường chạy thực tế: Windows, Node.js `v24.21.0`, Playwright `1.64.1` (từ lockfile hiện có).
- `npm run test:all`: **19/19 PASSED**, gồm 8 visual test và 11 test thao tác / responsive, khoảng 1,2 phút.
- 8 baseline được chụp lại cho thiết kế mới, xem xét trực quan rồi chạy so sánh thông thường, không dùng `--update-snapshots` trong lần xác minh cuối.
- Chống tràn ngang: login, dashboard sinh viên và quản trị ở các chiều rộng 320, 375, 768, 1024, 1280, 1440 px.
- `npm run test:fail`: **2/2 FAILED đúng kỳ vọng**, đều thất bại ở phép so sánh ảnh: demo login lệch 34.751 pixel; dashboard lệch 92.012 pixel và chiều cao trang. Đây là hai ca cố tình gây lỗi, không thuộc 19 test chính.
- `git diff --check`: đạt.

## Bàn giao

- `student-task-manager-frontend.zip`: source hoàn chỉnh, baseline mới và các test; giải nén rồi chạy các lệnh ở trên. Không chứa `node_modules`, `.git`, token hoặc báo cáo chạy tạm.
- `frontend-refresh.patch`: bản vá có cả ảnh nhị phân, áp dụng trên base commit nêu trên bằng `git apply frontend-refresh.patch`. Đã kiểm tra bản vá đảo chiều trên cây source cuối.
