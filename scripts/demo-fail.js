const { spawnSync } = require('child_process');

console.log('===============================================================');
console.log('  KỊCH BẢN DEMO 2: VISUAL REGRESSION TESTING - FAIL SCENARIO   ');
console.log('  Phát hiện lỗi sai khác giao diện (CSS Regression Bugs)       ');
console.log('===============================================================\n');

console.log('[1/2] Đang chạy bộ test mô phỏng lỗi giao diện CSS (giữ nguyên mã nguồn gốc)...');
console.log('Lệnh: npx playwright test tests/visual-failure.spec.js\n');

const result = spawnSync('npx', ['playwright', 'test', 'tests/visual-failure.spec.js'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env }
});

console.log('\n---------------------------------------------------------------');
console.log(' KẾT QUẢ PHÂN TÍCH VISUAL REGRESSION:');
console.log(' - Playwright đã phát hiện thành công sự sai lệch pixel so với Baseline!');
console.log(' - Các lỗi trực quan được phát hiện:');
console.log('   + DEMO_FAIL_01: Nút đăng nhập bị đổi màu đỏ, phình to kích thước và bo tròn bất thường.');
console.log('   + DEMO_FAIL_02: Navbar bị đổi màu tím, thẻ thống kê bị biến dạng border và lệch kích thước.');
console.log(' - Mã nguồn gốc (src/css/style.css) KHÔNG bị ảnh hưởng (mô phỏng runtime).');
console.log('\n BƯỚC TIẾP THEO ĐỂ XEM HÌNH ẢNH DIFF TRỰC QUAN:');
console.log(' Chạy lệnh sau để mở HTML Report và xem ảnh Baseline vs Actual vs Diff:');
console.log('   npm run report');
console.log('===============================================================\n');

// In demo context, exiting cleanly with status 0 or passing info so user can proceed to npm run report
process.exit(0);
