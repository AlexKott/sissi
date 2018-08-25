import path from 'path';

export default function storeSissiModules() {
  global.sissiPacks = path.join(__dirname, '../node_modules/sissi-packs/src');
  global.sissiMoves = path.join(__dirname, '../node_modules/sissi-moves/lib');
  global.sissiSnaps = path.join(__dirname, '../node_modules/sissi-snaps/lib');
}
