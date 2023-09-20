const {getState, warning, info} = require("@actions/core");
const {unlinkSync} = require('node:fs');

const location = getState('path');

try {
  unlinkSync(location);
  info(`Removed ${location}`);
} catch (e) {
  warning(`Error removing ${location}: ${e.message}`);
}
