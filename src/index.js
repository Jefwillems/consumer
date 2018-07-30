import program from 'commander';
import inquirer from 'inquirer';

program
  .command('create')
  .alias('c')
  .description('create a rest api consumer')
  .option(
    '-f, --file [path]',
    'Path to Swagger docs file. , will default to ./api.json',
    'api.json'
  )
  .option(
    '-t, --type [vue|angular]',
    'optional. framework the consumer will be generated for. Will ask if not specified'
  )
  .action(function(cmd) {
    console.log('file:\t', cmd.file);
    console.log('type:\t', cmd.type);
    if (!cmd.type) {
      inquirer.prompt([
        {
          type: 'list',
          name: 'framework',
          message:
            'What framework do you want the consumer to be generated for?',
          choices: ['vue', 'angular',],
          when: function(answers) {
            return answers.comments !== 'Nope, all good!';
          },
        },
      ]);
    }
  });

program.parse(process.argv);
