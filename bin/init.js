let co = require('co');
let prompt = require('co-prompt');
let chalk = require('chalk');
let templates = require("../templates");
let download = require('download-git-repo');
let ora = require('ora');
let fs  = require('fs');
let util  = require('./util');
let join = require('path').join;

module.exports = function() {
    co(generator());
}

let generator = function *() {
    console.log('    可用模板列表:')
    for (let key in templates.list) {
        let temp = templates.list[key]
        console.log(
            ' ' + chalk.green('★') +
            ' ' + chalk.green(temp.name) +
            '_' + temp.desc
        )
    }
    const tempName = yield prompt("    请选择模板类型:")
    const template =util.getTemplate(tempName);
    if(template) {
        console.log('    ----------------------------------------')
        let projectName = yield prompt(`    请输入项目名称:`)
        if(!projectName) {
            projectName = "demo"
        }
        console.log('    ----------------------------------------')
        downloadTemplates(template.path,projectName);
    } else {
        console.log(chalk.red(`   ✘模版[${tempName}]不存在`))
        process.exit(0);
    }
}

function downloadTemplates(path,projectName) {
    let spanner = ora("   正在构建，客官請稍等......");
    spanner.start();
    if(fs.existsSync('download')){
        //刪除原文件
        util.rmdirSync('download');
    }
    download(path,__dirname+'/download', function(err) {
        if(err) {
            spanner.stop();
            console.log('    ','----------------------------------------')
            console.log('    ',chalk('x构建失败'), err);
            process.exit(0);
        }
        startBuildProject(spanner,projectName)
    })

}

function startBuildProject(spanner,projectName) {
    let targetPath = join(process.cwd(), projectName);
    util.copyDirSync(__dirname + '/download', targetPath)
    console.log('\n', '----------------------------------------')
    console.log('\n\t', chalk.green('★'), chalk.green('项目构建成功'));
    spanner.stop();
    process.exit(0);
}