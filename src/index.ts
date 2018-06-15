import Command from '@oclif/command';
import * as yeoman from 'yeoman-environment';

import cmdStart from './cmdStart';

export = class Sissi extends Command {
  static args = [
    {
      name: 'command',
      options: ['new', 'start', 'build'],
      required: true,
      description: 'What do you want sissi to do?',
    },
  ];

  async run() {
    const { args } = this.parse(Sissi);
    const env = yeoman.createEnv();

    switch(args.command) {
      case 'new':
        env.register(require.resolve('./generator'), 'sissi:new');
        env.run('sissi:new');
        return;
      case 'start':
        cmdStart();
        return;
      case 'build':
        console.log('coming soon...');
        return;
      default:
        return;
    }
  }
}
