/**
 * Percy Visual Testing Optional Helper
 * Only executes Percy snapshots when PERCY_TOKEN is present in process.env.
 * Otherwise gracefully logs and skips without causing failures.
 */
let percySnapshot = null;
try {
  percySnapshot = require('@percy/playwright');
} catch (e) {
  // Graceful fallback if module cannot be loaded
  percySnapshot = null;
}

/**
 * Capture Percy snapshot if PERCY_TOKEN is provided.
 * @param {import('@playwright/test').Page} page
 * @param {string} snapshotName
 * @param {object} options
 */
async function takePercySnapshot(page, snapshotName, options = {}) {
  if (process.env.PERCY_TOKEN) {
    if (typeof percySnapshot === 'function') {
      console.log(`[Percy] Uploading snapshot: "${snapshotName}"...`);
      try {
        await percySnapshot(page, snapshotName, options);
      } catch (err) {
        console.warn(`[Percy] Warning: Percy snapshot upload failed: ${err.message}`);
      }
    } else {
      console.log(`[Percy] PERCY_TOKEN is present, but @percy/playwright is not initialized.`);
    }
  }
}

module.exports = {
  takePercySnapshot,
};
