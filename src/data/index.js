export default class Data {
  constructor(data) {
    this.info = data.info;
    this.host = data.host;
    this.basePath = data.basePath;
    this.schemes = data.schemes;
    this.consumes = data.consumes;
    this.produces = data.produces;
    this.paths = data.paths;
    this.definitions = data.definitions;
  }

  get view() {
    return {
      test: 'Hello data world!',
    };
  }
}
