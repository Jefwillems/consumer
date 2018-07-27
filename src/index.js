import program from 'commander';

program
  .command('hello')
  .option('-r, --recursive', 'Remove recursively')
  .action(cmd => {
    console.log('hello world');
    console.log(cmd);
  });
