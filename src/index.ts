const { execFile } = require('child_process');
import Command from '@oclif/command';
import * as yeoman from 'yeoman-environment';

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
        this._start();
        return;
      case 'build':
        console.log('coming soon...');
        return;
      default:
        return;
    }
  }

  _start() {
    execFile(
      `${process.cwd()}/node_modules/.bin/sissi-packs`,
      { cwd: process.cwd() },
      (err : any) => {
        if (err) {
          return console.log(err);
        }
        console.log('Development server running on port 3000');
      }
    );
    execFile(
      `${process.cwd()}/node_modules/.bin/sissi-says`,
      { cwd: process.cwd() },
      (err : any) => {
        if (err) {
          return console.log(err);
        }
        console.log('You can visit the sissi on port 3010');
    });
  }
}
