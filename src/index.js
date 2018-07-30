import program from 'commander';
import { Ask, } from './question';
import generator from './generator';
import chalk from 'chalk';
const clear = require('clear');

clear();
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
    console.log(cmd.file);
    if (!cmd.file) {
      ask.addFileQuestion();
    }
    if (!cmd.type) {
      ask.addFrameworkQuestion();
    }
    ask.exec().then(answers => {
      generator.getGenerator(answers.framework).generate(answers.file);
    });
  });

program.parse(process.argv);
