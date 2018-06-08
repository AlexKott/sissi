import Command, { flags } from '@oclif/command';

import cmdNew from './cmdNew';

export default class Sissi extends Command {
  static description = 'Scaffold your sissi project';

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  };

  static args = [
    { name: 'command', options: ['new', 'start', 'build'], required: true },
    { name: 'projectName' },
  ];

  async run() {
    const { args } = this.parse(Sissi);
    const { command, projectName } = args;

    switch(command) {
      case 'new':
        cmdNew(projectName);
        break;
      case 'start':
        this.log('Starting...');
        break;
      case 'build':
        this.log('Building...');
        break;
      default:
        this.log(`Please specify, what you want sissi to do.`);
    }
  }
}
