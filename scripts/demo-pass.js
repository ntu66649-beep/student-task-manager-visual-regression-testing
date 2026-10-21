const { spawnSync } = require('child_process');

console.log('===============================================================');
console.log('  KỊCH BẢN DEMO 1: VISUAL REGRESSION TESTING - PASS SCENARIO   ');
console.log('  Kiểm thử giao diện khớp 100% so với baseline chuẩn          ');
console.log('===============================================================\n');

console.log('[1/2] Đang khởi chạy Playwright Visual Regression Test Suite...');
console.log('Lệnh: npx playwright test tests/visual.spec.js\n');

const result = spawnSync('npx', ['playwright', 'test', 'tests/visual.spec.js'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env }
});

console.log('\n---------------------------------------------------------------');
if (result.status === 0) {
  console.log(' Kết quả: TẤT CẢ TEST CASES ĐÃ PASS!');
  console.log(' Giao diện thực tế khớp hoàn toàn với baseline chuẩn (0 pixel diff).');
  console.log(' Bạn có thể xem HTML Report chi tiết bằng lệnh:');
  console.log('   npm run report');
} else {
  console.log(' Kết quả: Có test case chưa khớp baseline.');
  console.log(' Chạy "npm run test:update-snapshots" nếu bạn muốn cập nhật baseline mới.');
}
console.log('===============================================================\n');

process.exit(result.status || 0);
