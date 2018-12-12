#!/usr/bin/env node
const list = [
    {
        'name': 'vue-weixin-vux',
        'desc': '构建基于vue-vux-ui开发的微信前端项目',
        'path': 'github:vdapeng/vue-weixin-template#master',
        'languages': 'vue'
    },
    {
        'name': 'vue-weixin-mint',
        'desc': '构建基于vue-mint-ui开发的微信前端项目',
        'path': 'github:vdapeng/vue-weixin-template#mint-ui',
        'languages': 'vue'
    }
]

const names = ['vue-weixin-vux', 'vue-weixin-mint']

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