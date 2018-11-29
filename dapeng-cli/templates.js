#!/usr/bin/env node
const list = [
    {
        'name': 'vue-weixin',
        'desc': '构建基于vue开发的微信前端项目',
        'path': 'github:vdapeng/vue-weixin-template#master',
        'languages': 'vue'
    }
]

const names = ['vue-weixin']

function getTemplate (name) {
    for (let key in this.list) {
        const temp = this.list[key];
        if (temp.name === name) {
            return temp
        }
    }
}

module.exports = {
    list,
    names,
    getTemplate
}