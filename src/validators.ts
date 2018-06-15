import * as path from 'path';
import * as fs from 'fs';

export function validateNotEmpty(input : string) {
  return input.trim() !== '' ? true : 'It mustn\'t be empty!';
}

export function validateNumber(input : string) {
  return !!Number(input) ? true : 'Please enter a number!';
}

export function validateEmptyDir(dirName : string) {
  const destDir = path.join(process.cwd(), dirName);

  if (fs.existsSync(destDir)) {
    if (fs.readdirSync(destDir).length) {
      return `There is already a (non-empty) directory "${dirName}". I don't dare overriding it!`;
    }
  }
  return true;
}
