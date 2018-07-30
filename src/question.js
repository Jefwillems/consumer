import inquirer from 'inquirer';

export class Ask {
  constructor() {
    this.questions = [];
  }

  addFileQuestion() {
    this.questions.push({
      type: 'input',
      name: 'file',
      message: '🗄\tplease enter the path to the swagger file.',
    });
  }

  addFrameworkQuestion() {
    this.questions.push({
      type: 'list',
      name: 'framework',
      message:
        '🚀\tWhat framework do you want the consumer to be generated for?',
      choices: ['vue', 'angular',],
    });
  }

  addQuestion(question) {
    this.questions.push(question);
  }

  exec() {
    if (this.questions.length === 0) {
      throw new Error('Tried asking questions without adding the questions');
    }
    return inquirer.prompt(this.questions);
  }
}

export default Ask;
