import fs from 'fs';
import path from 'path';

const defaultOptions = {
  buildDir: 'build',
  cmsPort: 3010,
  devPort: 3000,
  snapsPort: 3020,
  snapshotDelay: 700,
};

export default function gatherOptions() {
  let options = defaultOptions;

  try {
    const optionsFile = fs.readFileSync(path.join(process.cwd(), '.sissi'));
    const options = {
      ...defaultOptions,
      ...JSON.parse(optionsFile),
    };
  } catch(error) {
    console.log('Couldn\'t read your .sissi file. Please make sure it exists and is readable');
  }

  return options;
}
