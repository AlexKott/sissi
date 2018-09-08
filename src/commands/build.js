import { execFile } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import rimraf from 'rimraf';

import gatherOptions from '../gatherOptions';

export default async function build() {
  const {
    buildDir,
    tmpDir,
  } = gatherOptions();

  const cwd = process.cwd();
  const outPath = path.join(cwd, buildDir);
  const tmpPath = path.join(cwd, tmpDir);
  const imagePath = path.join(cwd, 'public', 'images');

  rimraf.sync(outPath);
  await fs.copy(imagePath, `${outPath}/images`);
  await fs.copy(tmpPath, outPath);
  await fs.remove(path.join(outPath, 'index.html'));
  await fs.remove(path.join(outPath, 'sissi-script.js'));

  const sissiSnaps = execFile(path.join(__dirname, '../../node_modules/.bin/sissi-snaps'), [
    `--buildDir=${buildDir}`,
    `--tmpDir=${tmpDir}`,
  ]);
  sissiSnaps.stderr.on('data', err => console.log(err));
  sissiSnaps.stdout.on('data', out => console.log(out));
}
