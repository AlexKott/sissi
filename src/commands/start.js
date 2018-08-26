import { execFile } from 'child_process';
import path from 'path';

import gatherOptions from '../gatherOptions';

export default function start() {
  const options = gatherOptions();

  console.log('Please wait while we make the app ready for snapshotting...')
  const sissiPacks = execFile(path.join(__dirname, '../../node_modules/.bin/sissi-packs'), [
    'build',
  ]);
  sissiPacks.stderr.on('data', err => console.log(err));
  sissiPacks.stdout.on('data', out => console.log(out));

  sissiPacks.on('exit', () => {
    console.log('Done!');

    const sissiSays = execFile(path.join(__dirname, '../../node_modules/.bin/sissi-says'), [
      `--port=${options.cmsPort}`,
    ]);
    sissiSays.stderr.on('data', err => console.log(err));
    sissiSays.stdout.on('data', out => console.log(out));
  })
}
