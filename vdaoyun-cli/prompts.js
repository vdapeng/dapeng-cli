#!/usr/bin/env node
let templates = require('./templates')

module.exports = {
    name: '',
    prompts: [
        {
            type: 'list',
            name: 'tempName',
            message: '请选择模板类型:',
            choices: templates.names
        },
        {
            type: 'input',
            name: 'version',
            message: '请输入项目版本:',
            default: require('./package').version
        },
        {
            type: 'input',
            name: 'description',
            message: '请输入项目描述:'
        },
        {
            type: "confirm",
            message: "是否立即构建？",
            name: "isBuild",
            default: 'Yes'
        }
    ],
    exists: [
        {
            type: 'list',
            name: 'operation',
            message: '该文件夹已存在，请选择以下操作:',
            choices: ['取消构建', '覆盖原有项目构建', '删除原有项目']
        }
    ]
}