import * as path from 'path';
import * as Generator from 'yeoman-generator'

import getTemplateMap from './templateMap';
import { validateEmptyDir, validateNumber } from './validators';

export default class SissiGenerator extends Generator {
  amountOfPages : number = 3;
  projectName : string = '';

  async prompting() {
    const answers = await this.prompt([{
      type: 'input',
      name: 'projectName',
      message: 'How should Sissi call your project?',
      default: 'myNewWebsite',
      validate: validateEmptyDir,
    }, {
      type: 'confirm',
      name: 'isSinglePage',
      message: 'Do you want it to be a single page website?',
      default: false,
    }]);

    let amountOfPages = 1;

    if (!answers.isSinglePage) {
      const pagesAnswer = await this.prompt({
        type: 'input',
        name: 'amountOfPages',
        message: 'How many pages would you like to start with?',
        default: 3,
        validate: validateNumber,
      });

      amountOfPages = Number(pagesAnswer.amountOfPages);
    }

    this.amountOfPages = amountOfPages;
    this.projectName = answers.projectName;
  }

  copyTemplates() {
    this.sourceRoot(path.join(__dirname, 'templates'))
    this.destinationRoot(path.join(process.cwd(), this.projectName));
    const templateMap = getTemplateMap({ projectName: this.projectName });

    this.log('Setting up project...');
    templateMap.forEach(template => {
      this.fs.copyTpl(
        this.templatePath(`${template.file}.ejs`),
        this.destinationPath(template.file),
        template.params,
      );
    });
  }
  //
  // console.log(`Creating project ${projectName}`);
  //
  // const packageJson = mfs
  //   .read(`${TEMP_DIR}/package.json`)
  //   .replace('PROJECT_NAME', projectName);
  //
  // mfs.write(`${destDir}/package.json`, packageJson);
  // mfs.commit(() => {
  //   console.log('done');
  // });
}
