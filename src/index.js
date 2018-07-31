import program from 'commander';
import { Ask, } from './question';
import Generator from './generator';
import chalk from 'chalk';
//const clear = require('clear');

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
  .action(function(cmd) {
    const ask = new Ask();
    if (!cmd.file) {
      ask.addFileQuestion();
    }
    if (!cmd.type) {
      ask.addFrameworkQuestion();
    }
    if (ask.questions.length !== 0) {
      return ask.exec().then(answers => {
        const a = {
          file: cmd.file,
          framework: cmd.type,
          ...answers,
        };
        const gen = new Generator(a);
        gen.generate();
      });
    }
    const gen = new Generator({
      file: cmd.file,
      framework: cmd.type,
    });
    gen.generate();
  });

program.parse(process.argv);
