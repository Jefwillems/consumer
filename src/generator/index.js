import fs from 'fs';
import event, { types, } from '../events';
import { Data, } from '../data';
import mustache from 'mustache';
import settings from '../../settings';

class Generator {
  constructor({ framework, file, }) {
    this.framework = framework;
    this.path = file;
  }

  _readFile(cb) {
    fs.readFile(this.path, 'utf8', (err, data) => {
      if (err) throw new Error(err);
      const swaggerData = JSON.parse(data);
      event.emit(types.DATA_LOADED, swaggerData);
      cb(swaggerData);
    });
  }

  generate() {
    this._readFile(data => {
      Data.init(data);
      this._parseTemplate(Data);
    });
  }

  _parseTemplate(d) {
    // ? parse template and write to dir.

    const templatePath = `${settings.ROOT_PATH}/templates/${
      this.framework
    }.template`;
    fs.readFile(templatePath, 'utf8', (err, template) => {
      if (err) throw err;
      event.emit(types.TEMPLATE_PARSED, { templatePath, template, });
      const js = mustache.render(template, d);
      console.log('\n\n\n', js);
    });
  }

  get extension() {
    return this.framework === 'angular' ? 'ts' : 'js';
  }
}
export default Generator;
