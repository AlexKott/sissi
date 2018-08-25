import '@babel/polyfill';
import path from 'path';
import yeoman from 'yeoman-environment';

import storeSissiModules from './storeSissiModules';

storeSissiModules();

module.exports = function run() {
  const args = process.argv.reduce((acc, arg, index) => {
    if (index === 2) {
      acc.command = arg;
    }
    return acc;
  }, {});

  const env = yeoman.createEnv();

  switch(args.command) {
    case 'new':
      env.register(require.resolve('./generator'), 'sissi:new');
      env.run('sissi:new');
      return;

    case 'dev':
      dev();
      return;

    case 'move':
      move();
      return;

    case 'build':
      build();
      return;

    default:
      return;
  }
}

function dev() {
  require(path.join(__dirname, '../node_modules/sissi-says/api-build'));
  require(global.sissiPacks)();
}

function move() {
  require(global.sissiMoves)();
}

function build() {
  require(global.sissiSnaps)();
}
