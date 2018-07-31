import program from 'commander';
import { Ask, } from './question';
import Event, { types, } from './events';
import Generator from './generator';
import chalk from 'chalk';
//const clear = require('clear');

const gen = new Generator();
//clear();
console.log(
  chalk.blue(
    `%c ________________________________________
  < mooooooooooooooooooooooooooooooooooooo >
   ----------------------------------------
          \\   ^__^
           \\  (oo)\\_______
              (__)\\       )\\/\\
                  ||----w |
                  ||     ||`
  )
);

program
  .command('create')
  .alias('c')
  .description('create a rest api consumer')
  .option('-f, --file <path>', 'Path to Swagger docs file.')
  .option(
    '-t, --type [vue|angular]',
    'optional. framework the consumer will be generated for. Will ask if not specified.'
  )
  .option('-p, --print', 'Print output to console instead of creating a file.')
  .action(function(cmd) {
    const ask = new Ask();
    if (!cmd.file) {
      ask.addFileQuestion();
    }
    if (!cmd.type) {
      ask.addFrameworkQuestion();
    }
    Event.on(types.TEMPLATE_RENDERED, data => {
      if (cmd.print) {
        console.log(data);
      } else {
        gen.writeToFile();
      }
    });
    if (ask.questions.length !== 0) {
      return ask.exec().then(answers => {
        const a = {
          file: cmd.file,
          framework: cmd.type,
          ...answers,
        };
        gen.addAndwers(a).generate();
      });
    }
    gen
      .addAndwers({
        file: cmd.file,
        framework: cmd.type,
      })
      .generate();
  });

Event.on(types.ERROR, error => {
  console.log(error.message);
});

program.parse(process.argv);
