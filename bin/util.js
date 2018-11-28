let templates = require("../templates");
let fs  = require('fs');
let join = require('path').join;

function getTemplate (name) {
    for (let key in templates.list) {
        const temp = templates.list[key];
        if (temp.name === name) {
            return temp
        }
    }
}

function copyDirSync(resource, targetPath) {
    fs.mkdir(targetPath, function (error) {
        console.log(error)
    });
    let files = fs.readdirSync(resource);
    files.forEach((val, index) => {
        let fPath = join(resource, val);
        let stats = fs.statSync(fPath);
        let tPath = join(targetPath, val);
        if (stats.isFile()) {
            console.log(`\n\t正在构建文件: ${fPath}`)
            fs.writeFileSync(tPath, fs.readFileSync(fPath));
        } else {
            fs.mkdir(tPath, function (error) {
                console.log(error)
            });
            copyDirSync(fPath, tPath);
        }
    })
}

module.exports = {
    getTemplate,
    copyDirSync
}