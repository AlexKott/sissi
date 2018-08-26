import { execFile } from 'child_process';
import path from 'path';

export default function move() {
  const sissiMoves = execFile(path.join(__dirname, '../../node_modules/.bin/sissi-moves'), [
    'migrate',
  ]);
  sissiMoves.stderr.on('data', err => console.log(err));
  sissiMoves.stdout.on('data', out => console.log(out));
}
