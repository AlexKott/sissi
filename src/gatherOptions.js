import fs from 'fs';
import path from 'path';

const defaultOptions = {
  buildDir: 'build',
  tmpDir: 'tmp',
  cmsPort: 3010,
  devPort: 3000,
};

export default function gatherOptions() {
  let options = defaultOptions;

  try {
    const optionsFile = fs.readFileSync(path.join(process.cwd(), '.sissi'));
    options = {
      ...defaultOptions,
      ...JSON.parse(optionsFile),
    };

  } catch(error) {
    console.log('Couldn\'t read your .sissi file. Please make sure it exists and is readable');

  } finally {
    return options;
  }
}
