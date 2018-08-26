import { execFile } from 'child_process';
import path from 'path';

import gatherOptions from '../gatherOptions';

export default function dev() {
  const options = gatherOptions();

  const sissiSays = execFile(path.join(__dirname, '../../node_modules/.bin/sissi-says'), [
    `--port=${options.cmsPort}`,
  ]);
  sissiSays.stderr.on('data', err => console.log(err));
  sissiSays.stdout.on('data', out => console.log(out));

  const sissiPacks = execFile(path.join(__dirname, '../../node_modules/.bin/sissi-packs'), [
    'dev',
    `--port=${options.devPort}`,
  ]);
  sissiPacks.stderr.on('data', err => console.log(err));
  sissiPacks.stdout.on('data', out => console.log(out));
}
