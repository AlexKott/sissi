import { execFile } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import rimraf from 'rimraf';

import gatherOptions from '../gatherOptions';

export default async function build() {
  const options = gatherOptions();
  const cwd = process.cwd();
  const buildDir = path.join(cwd, options.buildDir);
  const tmpDir = path.join(cwd, 'tmp');
  const imageDir = path.join(cwd, 'public', 'images');

  rimraf.sync(buildDir);
  await fs.copy(tmpDir, buildDir);
  await fs.copy(imageDir, `${buildDir}/images`);
  await fs.move(`${buildDir}/index.html`, `${buildDir}/_tmp.html`);

  const sissiSnaps = execFile(path.join(__dirname, '../../node_modules/.bin/sissi-snaps'), [
    `--buildDir=${options.buildDir}`,
    `--port=${options.snapsPort}`,
    `--snapshotDelay=${options.snapshotDelay}`,
  ]);
  sissiSnaps.stderr.on('data', err => console.log(err));
  sissiSnaps.stdout.on('data', out => console.log(out));

  sissiSnaps.on('exit', () => {
    fs.remove(`${buildDir}/_tmp.html`);
    fs.remove(`${buildDir}/sissi-script.js`);
  });
}
