import fs from 'fs';
import path from 'path';
import event, { types, } from '../events';
import { Data, } from '../data';
import mustache from 'mustache';
import settings from '../../settings';

class Generator {
  addAndwers({ framework, file, }) {
    this.framework = framework;
    this.path = file;
    return this;
  }

  _readFile(cb) {
    fs.readFile(this.path, 'utf8', (err, data) => {
      if (err) event.emit(types.ERROR, err);
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
      if (err) event.emit(types.ERROR, err);
      const js = mustache.render(template, d);
      this.finishedJS = js;
      event.emit(types.TEMPLATE_RENDERED, js);
    });
  }
  writeToFile() {
    fs.writeFile(
      path.dirname(this.path) + '/actions.js',
      this.finishedJS,
      'utf8',
      err => {
        if (err) event.emit(types.ERROR, err);
      }
    );
  }
  get extension() {
    return this.framework === 'angular' ? 'ts' : 'js';
  }
}
export default Generator;
