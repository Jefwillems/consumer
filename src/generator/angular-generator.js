import fs from 'fs';
import chalk from 'chalk';
export default class AngularGenerator {
  generate(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) return reject(chalk.red(err.message, err.stack));
        resolve(JSON.parse(data));
      });
    });
  }
}
