import '@babel/polyfill';
import path from 'path';
import yeoman from 'yeoman-environment';

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

    case 'start':
      start();
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

function start() {
  require(path.join(__dirname, '../node_modules/sissi-says/api-build'));
  require(path.join(__dirname, '../node_modules/sissi-packs/src'))();
}

function move() {
  require(path.join(__dirname, '../node_modules/sissi-moves/lib'))();
}

function build() {
  require(path.join(__dirname, '../node_modules/sissi-snaps/lib'))();
}
