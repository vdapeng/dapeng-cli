const co = require('co')
const promt = require('co-prompt')
const chalk = require('chalk')
const templates = require('../templates')

module.exports = function () {
    for (let key in templates.list) {
        let temp = templates.list[key]
        console.log(
            ' ' + chalk.green('★') +
            ' ' + chalk.green(temp.name) +
            '_' + temp.desc
        )
    }
    if(!templates.list||templates.list.length==0){
        console.log(chalk.yellow('当前无可用模板'))
    }
}