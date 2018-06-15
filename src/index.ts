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
    const saysChild = execFile(
      `${process.cwd()}/node_modules/.bin/sissi-says`,
      { cwd: process.cwd(), shell: true }
    );
    saysChild.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    saysChild.stderr.on('data', (data) => {
      console.log(data.toString());
    });

    const packsChild = execFile(
      `${process.cwd()}/node_modules/.bin/sissi-packs`,
      { cwd: process.cwd(), shell: true }
    );
    packsChild.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    packsChild.stderr.on('data', (data) => {
      console.log(data.toString());
    });
  }
}
