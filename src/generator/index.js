import fs from 'fs';
import event, { types, } from '../events';
import Data from '../data';

class Generator {
  constructor({ framework, file, }) {
    this.framework = framework;
    this.path = file;
  }

  _readFile(cb) {
    fs.readFile(this.path, (err, data) => {
      if (err) throw new Error(err);
      const swaggerData = JSON.parse(data);
      event.emit(types.DATA_LOADED, swaggerData);
      cb(swaggerData);
    });
  }

  generate() {
    this._readFile(data => {
      const d = new Data(data);
      this._parseTemplate(d);
    });
  }

  _parseTemplate() {
    // ? parse template and write to dir.
  }
}
export default Generator;
