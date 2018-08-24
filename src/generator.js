import path from 'path';
import Generator from 'yeoman-generator'

import { getCopyList, getTemplateList } from './fileLists';
import * as v from './validators';

export default class SissiGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.amountOfPages = 3;
    this.projectName = '';
    this.userName = '';
    this.password = '';
  }

  async prompting() {
    const answers = await this.prompt([{
      type: 'input',
      name: 'projectName',
      message: 'How should Sissi call your project?',
      default: 'myNewWebsite',
      validate: v.validateEmptyDir,
    }, {
      type: 'input',
      name: 'userName',
      message: 'Please enter the user name for the cms',
      default: 'admin',
      validate: v.validateNotEmpty,
    }, {
      type: 'input',
      name: 'password',
      message: 'Please enter the password for the cms',
      default: 'abc123',
      validate: v.validateNotEmpty,
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
        validate: v.validateNumber,
      });

      amountOfPages = Number(pagesAnswer.amountOfPages);
    }

    this.amountOfPages = amountOfPages;
    this.projectName = answers.projectName;
    this.userName = answers.userName;
    this.password = answers.password;
  }

  copyTemplates() {
    this.sourceRoot(path.join(__dirname, 'templates'))
    this.destinationRoot(path.join(process.cwd(), this.projectName));
    const copyList = getCopyList();
    const templateList = getTemplateList({
      projectName: this.projectName,
      userName: this.userName,
      password: this.password,
    });

    this.log('Setting up project...');

    copyList.forEach(fileName => {
      this.fs.copy(
        this.templatePath(fileName),
        this.destinationPath(fileName),
      );
    });

    templateList.forEach(template => {
      this.fs.copyTpl(
        this.templatePath(`${template.file}.ejs`),
        this.destinationPath(template.file),
        template.params,
      );
    });

    this.log('Installing dependencies...');
    this.npmInstall();
  }
}
