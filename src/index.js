import { execFile } from 'child_process';
import path from 'path';
import yeoman from 'yeoman-environment';

import * as commands from './commands';

module.exports = function run(args, flags) {
  const [ command ] = args;
  const env = yeoman.createEnv();

  switch(command) {
    case 'new':
      env.register(require.resolve('./generator'), 'sissi:new');
      env.run('sissi:new');
      return;

    case 'dev':
      commands.dev();
      return;

    case 'move':
      commands.move();
      return;

    case 'build':
      commands.build();
      return;

    case 'start':
      commands.start();
      return;

    default:
      return;
  }
}
