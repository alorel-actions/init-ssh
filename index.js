const {getInput, setFailed, saveState, info} = require("@actions/core");
const {dirname, join} = require('node:path');
const {existsSync, mkdirSync, writeFileSync} = require('node:fs');

try {
  const key = getInput('key', {required: true});
  const location = getInput('path') || join(require('node:os').homedir(), '.ssh', 'id_rsa');

  const sshDir = dirname(location);
  if (!existsSync(sshDir)) {
    mkdirSync(dirname(location), {recursive: true});
  }

  writeFileSync(location, key, {mode: 0o600});
  info(`Wrote ${location}`);
  saveState('path', location);
} catch (e) {
  setFailed(e);
}
