# Cẩm Nang Hướng Dẫn Báo Cáo & Demo (Demo Guide & Q&A)

Tài liệu hướng dẫn trình diễn thực tế dự án **Student Task Manager – Visual Regression Testing** dành cho nhóm sinh viên khi thuyết trình trước Giảng viên và Hội đồng đánh giá, kèm theo bộ câu hỏi lý thuyết cốt lõi thường gặp.

---

## Phần 1: Kịch Bản Trình Diễn Từng Bước (Step-by-Step Demo)

Thời lượng khuyến nghị: **5 – 7 phút**

### Bước 1: Mở đầu & Giới thiệu Dự án (1 phút)
- **Lời thoại gợi ý**:  
  *"Kính thưa Thầy/Cô, hôm nay nhóm em xin trình diễn đề tài Visual Regression Testing (Kiểm thử hồi quy trực quan) áp dụng trên hệ sinh thái website Student Task Manager. Mục tiêu của nhóm là tự động hóa việc phát hiện mọi sự sai lệch về mặt giao diện (pixel shift, lỗi màu sắc, vỡ layout responsive) mà các bài test chức năng E2E thông thường có thể bỏ sót."*
- **Điểm nhấn công nghệ**:
  - Công cụ chính: **Playwright** với phương thức `toHaveScreenshot()`.
  - Tùy chọn mở rộng: Nền tảng đám mây **Percy** (`@percy/playwright`).
  - Toàn bộ website gốc được bảo toàn 100%, không chèn thêm các icon hay emoji trang trí ngoài luồng.

---

### Bước 2: Trình diễn Kịch bản PASS – Khớp Baseline Chuẩn (1.5 phút)
- **Thao tác**: Mở Terminal tại thư mục dự án và chạy:
  ```bash
  npm run demo:pass
  ```
- **Hiện tượng trên màn hình**:
  - Playwright tự động bật web server tại cổng 3000.
  - Lần lượt chạy 8 ca kiểm thử: Màn hình Đăng nhập (Desktop), Báo lỗi Đăng nhập, Student Dashboard, Component Task List, Component Add Task, Admin Portal, Responsive Mobile và Responsive Tablet.
  - Bảng tổng kết màu xanh lá xuất hiện: `8 passed (10.2s)`.
- **Lời thuyết minh**:  
  *"Như Thầy/Cô thấy trên màn hình, khi giao diện khớp 100% với ảnh chụp baseline chuẩn, Playwright so sánh và xác nhận tỉ lệ khác biệt bằng 0 pixel. Tất cả 8 ca kiểm thử đều đạt trạng thái PASS."*

---

### Bước 3: Trình diễn Kịch bản FAIL – Phát hiện Lỗi CSS Regression (2 phút)
- **Mục đích**: Chứng minh khả năng "bắt lỗi" giao diện của công cụ khi có sự cố mã nguồn.
- **Thao tác**: Chạy lệnh:
  ```bash
  npm run demo:fail
  ```
- **Hiện tượng trên màn hình**:
  - Terminal hiển thị thông báo lỗi màu đỏ rực: `2 failed`.
  - Playwright báo cáo chi tiết:
    - `DEMO_FAIL_01`: Phát hiện **45,026 pixels** bị sai lệch tại màn hình Login.
    - `DEMO_FAIL_02`: Phát hiện **143,803 pixels** bị sai lệch tại màn hình Dashboard.
- **Lời thuyết minh**:  
  *"Ở kịch bản này, nhóm giả lập tình huống một lập trình viên vô tình làm đổi màu nút Đăng nhập sang đỏ rực, làm phình to kích thước và làm lệch thanh Navbar sang màu tím. Để đảm bảo tính độc lập và an toàn, nhóm không hề sửa file CSS gốc mà áp dụng kỹ thuật chèn style động tại runtime bằng `page.addStyleTag()`. Playwright đã ngay lập tức bắt trọn lỗi và lưu trữ ảnh chụp bằng chứng."*

---

### Bước 4: Khám phá Báo cáo Trực quan HTML Report (1.5 phút)
- **Thao tác**: Mở báo cáo bằng lệnh:
  ```bash
  npm run report
  ```
- **Thao tác trên giao diện trình duyệt**:
  1. Trình duyệt tự động mở trang HTML Report của Playwright.
  2. Bấm chọn vào test case `DEMO_FAIL_01`.
  3. Cuộn xuống mục **Image Diff**, chỉ cho Giảng viên thấy 3 chế độ xem:
     - **Slider**: Kéo thanh trượt qua lại giữa ảnh chuẩn (Expected) và ảnh lỗi thực tế (Actual).
     - **Diff**: Xem vùng sai lệch được Playwright tô màu đỏ rực rỡ.
     - **Side-by-Side**: Đặt 2 ảnh cạnh nhau để so sánh trực diện.
- **Lời thuyết minh**:  
  *"Đây là tính năng đắc lực nhất của Playwright Visual Testing. Người kiểm thử hoặc Designer không cần tự căng mắt tìm lỗi thủ công mà có thể nhìn thấy ngay thanh trượt so sánh và vùng đánh dấu pixel trực quan."*

---

### Bước 5: Giới thiệu Tích hợp Percy & Tổng kết (1 phút)
- **Lời thuyết minh**:  
  *"Ngoài việc chạy cục bộ, nhóm đã đóng gói module `percy-helper.js`. Khi biến môi trường `PERCY_TOKEN` được cung cấp, hệ thống sẽ tự động đồng bộ ảnh chụp lên nền tảng đám mây Percy để đội ngũ Product Manager và Designer có thể review và duyệt giao diện trực tuyến qua web. Nếu không có token, hệ thống chạy offline mượt mà không gặp bất kỳ gián đoạn nào."*

---

## Phần 2: Bộ Câu Hỏi Lý Thuyết Trọng Tâm & Gợi Ý Trả Lời

Dưới đây là các câu hỏi Giảng viên thường đặt ra trong các buổi bảo vệ đồ án Kiểm thử phần mềm tự động:

### Câu 1: Visual Regression Testing là gì? Khác biệt lớn nhất giữa nó và Functional E2E Testing là gì?
- **Trả lời**:
  - **Functional E2E Testing**: Kiểm tra *hành vi và logic* của ứng dụng (Ví dụ: Nhập tài khoản đúng thì đăng nhập thành công hay không, bấm nút Thêm bài tập thì dữ liệu có được ghi vào cơ sở dữ liệu hay không).
  - **Visual Regression Testing**: Kiểm tra *diện mạo và tính toàn vẹn hiển thị* của ứng dụng (Ví dụ: Nút bấm có đúng màu xanh `#3b82f6` không? Có bị lệch padding hay chữ tràn ra ngoài viền không? Khi co nhỏ màn hình di động các cột có bị xếp chồng đè lên nhau không?).
  - **Kết luận**: E2E Functional Testing có thể báo "PASS" vì nút vẫn bấm được, nhưng giao diện thực tế có thể đã bị vỡ hoàn toàn. Do đó cần Visual Regression Testing để đảm bảo trải nghiệm người dùng hoàn hảo.

---

### Câu 2: Playwright thực hiện so sánh ảnh bằng cơ chế nào? Các tham số `threshold` và `maxDiffPixelRatio` có ý nghĩa gì?
- **Trả lời**:
  - Playwright chụp ảnh màn hình hoặc phần tử DOM thành định dạng bitmap PNG, sau đó sử dụng thuật toán so sánh pixel tương tự thuật toán **pixelmatch**.
  - **`threshold`** (ví dụ `0.2`): Độ nhạy màu sắc giữa từng pixel (từ 0 đến 1). Ngưỡng càng nhỏ thì so sánh càng khắt khe về độ chênh lệch màu RGB.
  - **`maxDiffPixelRatio`** (ví dụ `0.01` tương ứng 1%): Tỉ lệ phần trăm số pixel khác biệt tối đa cho phép trên toàn bộ bức ảnh trước khi coi bài test là thất bại. Điều này giúp bỏ qua những sai số hiển vi do antialiasing của card đồ họa.

---

### Câu 3: Làm thế nào để loại bỏ hiện tượng "Flaky Test" (chạy lúc đỗ lúc trượt) trong Visual Testing?
- **Trả lời**: Nhóm đã áp dụng 3 giải pháp kỹ thuật triệt để:
  1. **Tắt Animations (`animations: 'disabled'`)**: Tự động đóng băng các chuyển động CSS và transition để tránh chụp đúng thời điểm hiệu ứng đang mờ dần.
  2. **Đợi nạp font chữ và layout (`waitForFonts()`)**: Playwright tự động đảm bảo font chữ đã tải hoàn tất trước khi bấm máy.
  3. **Cô lập dữ liệu (`setupDeterministicStorage`)**: Trước mỗi bài test, dọn sạch `localStorage` và nạp dữ liệu cố định để danh sách bài tập, số liệu thống kê luôn luôn giống hệt nhau ở mọi lần chạy.

---

### Câu 4: Baseline là gì? Khi nào được phép cập nhật baseline mới?
- **Trả lời**:
  - **Baseline** là ảnh chụp chuẩn đại diện cho giao diện đúng được nhóm kiểm thử và thiết kế công nhận.
  - **Khi nào cập nhật**: Chỉ chạy lệnh `npm run test:update-snapshots` khi:
    1. Ứng dụng có sự thay đổi thiết kế có chủ đích (ví dụ: redesign thương hiệu, thay đổi giao diện theo yêu cầu mới của khách hàng).
    2. Designer và Product Owner đã nghiệm thu diện mạo mới.
  - Tuyệt đối không được cập nhật baseline để che giấu một lỗi giao diện vô ý do code sai.

---

### Câu 5: Khi nào nên sử dụng Playwright Native Snapshots và khi nào nên dùng Percy?
- **Trả lời**:
  - **Playwright Native Snapshots**: Miễn phí 100%, chạy offline cực nhanh trên máy cục bộ, tích hợp sẵn trong CI/CD, có sẵn báo cáo HTML đầy đủ diff. Phù hợp cho lập trình viên và QA kiểm tra nhanh hàng ngày.
  - **Percy**: Là giải pháp điện toán đám mây trả phí chuyên nghiệp. Điểm mạnh vượt trội là có cổng Web Portal cho phép nhiều bên (Designer, Tester, Project Manager, Khách hàng) cùng xem, thảo luận, comment trực tiếp vào vị trí lỗi và bấm nút "Approve" để duyệt PR.
  - Trong dự án này, nhóm thiết kế theo mô hình lai: Playwright làm nòng cốt cục bộ, Percy là tùy chọn kết nối khi có `PERCY_TOKEN`.

---

### Câu 6: Làm thế nào nhóm đảm bảo kịch bản FAIL không làm hỏng source gốc của dự án?
- **Trả lời**:  
  Nhóm không thay đổi bất kỳ ký tự nào trong file `src/css/style.css` hay `src/index.html`. Thay vào đó, trong file kịch bản `tests/visual-failure.spec.js`, nhóm sử dụng hàm `page.addStyleTag({ content: '...' })`. Kỹ thuật này chèn thẻ `<style>` trực tiếp vào DOM ảo của phiên duyệt web đó. Khi tắt trình duyệt, trang web trở lại trạng thái ban đầu nguyên vẹn 100%.
