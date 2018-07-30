import VueGenerator from './vue-generator';
import AngularGenerator from './angular-generator';
class Generator {
  constructor() {}

  getGenerator(framework) {
    if (!this.types.includes(framework)) {
      throw new Error();
    }
    switch (framework) {
    case 'vue':
      return new VueGenerator();
    case 'angular':
      return new AngularGenerator();
    default:
      throw new Error('Type is not valid');
    }
  }
}
export default new Generator();
