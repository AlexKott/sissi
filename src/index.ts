import * as path from 'path';
import Command from '@oclif/command';
import * as yeoman from 'yeoman-environment';

export = class Sissi extends Command {
  static args = [
    {
      name: 'command',
      options: ['new', 'start', 'move', 'build'],
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
      case 'move':
        this._move();
        return;
      case 'build':
        console.log('coming soon...');
        return;
      default:
        return;
    }
  }

  _start() {
    require(path.join(__dirname, '../node_modules/sissi-says/api-build'));
    require(path.join(__dirname, '../node_modules/sissi-packs/lib'))();
  }

  _move() {
    require(path.join(__dirname, '../node_modules/sissi-moves/lib'))();
  }
}
