import {
  exec,
  execFile,
} from 'child_process';
import path from 'path';
import chalk from 'chalk';

import gatherOptions from '../gatherOptions';

export default function start() {
  const options = gatherOptions();

  console.log('Please wait while I make everything ready...')
  const sissiPacks = execFile(path.join(__dirname, '../../node_modules/.bin/sissi-packs'), [
    'build',
  ]);
  sissiPacks.stderr.on('data', err => console.log(err));
  sissiPacks.stdout.on('data', out => console.log(out));

  sissiPacks.on('exit', () => {
    const sissiSnaps = exec('sissi build');
    sissiSnaps.stderr.on('data', err => console.log(err));
    sissiSnaps.stdout.on('data', out => console.log(out));

    sissiSnaps.on('exit', () => {
      console.log('Done!');
      console.log(`You'll find your static website in the folder ${chalk.underline(options.buildDir)}`);

      const sissiSays = execFile(path.join(__dirname, '../../node_modules/.bin/sissi-says'), [
        `--port=${options.cmsPort}`,
      ]);
      sissiSays.stderr.on('data', err => console.log(err));
      sissiSays.stdout.on('data', out => console.log(out));
    });
  });
}
