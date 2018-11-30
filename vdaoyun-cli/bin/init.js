#!/usr/bin/env node
let co = require('co');
// let prompt = require('co-prompt');
let chalk = require('chalk');
let download = require('download-git-repo');
let ora = require('ora');
let fs  = require('fs');
let util  = require('./util');
let join = require('path').join;
let inquirer = require('inquirer');
let templates = require('../templates')
let prompts = require('../prompts')


module.exports = function(name) {
    co(generator(name));
}

let generator = function *(name) {
    console.log(chalk.green('★'), chalk.green('开始构建，请根据以下提示操作：'));
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        required: true,
        message: '请输入项目名称:',
        default: name
    }]).then(answers_ => {
        name = answers_.name ? answers_.name : name;
        inquirer.prompt(prompts.prompts).then(answers => {
            if (answers.isBuild) {
                answers.name = name;
                const template = templates.getTemplate(answers.tempName);
                downloadTemplates(template.path, name, answers);
            }
        })
    })
}

function downloadTemplates(templatePath, name, meta) {
    const targetPath = join(process.cwd(), name);
    if (fs.existsSync(targetPath)) {
        inquirer.prompt(prompts.exists).then(answers => {
            if (answers.operation === '取消构建') {
                console.log(chalk.red('★'), chalk.red('取消构建'));
                process.exit(0);
            } else if (answers.operation === '删除原有项目') {
                util.removeFiles(targetPath);
            }
            build(templatePath, targetPath, meta);
        })
    } else {
        build(templatePath, targetPath, meta);
    }
}

function build(templatePath, targetPath, meta) {
    const downloadPath = __dirname+'/download';
    let spanner = ora("正在项目模板，请稍等......\n");
    spanner.start();
    if (fs.existsSync(downloadPath)) {
        //刪除原文件
        util.removeFiles(downloadPath);
    }
    download(templatePath, downloadPath, function(err) {
        if(err) {
            spanner.stop();
            console.log('    ','----------------------------------------');
            console.log('    ',chalk('x构建失败'), err);
            process.exit(0);
        }
        console.log(chalk.green('★'), chalk.green('模板下载完成，开始构建'));
        startBuildProject(spanner, targetPath, meta)
    })
}

function startBuildProject(spanner, targetPath, meta) {
    util.copyDirSyncHandlebar(__dirname + '/download', targetPath, meta);
    console.log(chalk.green('★'), chalk.green('项目构建成功'));
    console.log();
    spanner.stop();
    process.exit(0);
}