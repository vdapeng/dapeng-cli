const program = require('commander');
const init = require('./bin/init')
const list = require('./bin/list')

program.version(require('./package').version, '-v, --version').usage('<command>');

program.command('init (template)')
    .description("创建新新项目")
    .alias('i')
    .action(function(){
        init();
    })
program.command('list').description('显示可使用的模板类型').alias('l').action(function () {
    list()
});

program.parse(process.argv);
if (program.args.length === 0) {
    program.help();
}