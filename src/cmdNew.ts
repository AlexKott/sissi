import * as fs from 'fs';
import * as memFs from 'mem-fs';
import * as editor from 'mem-fs-editor';
import * as path from 'path';

const mfs = editor.create(memFs.create());

export default function cmdNew(projectName: string) {
  const templateDir = path.join(__dirname, 'templates');
  const destDir = path.join(process.cwd(), projectName);

  if (fs.existsSync(destDir)) {
    if (fs.readdirSync(destDir).length) {
      console.error(`There is already a (non-empty) directory ${projectName}. I don't dare overriding it!`);
      return;
    }
  } else {
    fs.mkdirSync(destDir);
  }

  console.log(`Creating project ${projectName}`);

  const packageJson = mfs
    .read(`${templateDir}/package.json`)
    .replace('PROJECT_NAME', projectName);

  mfs.write(`${destDir}/package.json`, packageJson);
  mfs.commit(() => {
    console.log('done');
  });
}
