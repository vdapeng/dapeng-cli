#!/usr/bin/env node
let fs  = require('fs');
let join = require('path').join;
const handlebars = require('handlebars');
const path = require('path');

const exts = ['.png', '.jpg', '.mp3', '.mp4', '.jpeg', '.gif']

function copyDirSyncHandlebar(resource, targetPath, meta) {
    if (!fs.existsSync(targetPath))  {
        fs.mkdirSync(targetPath);
    }
    let files = fs.readdirSync(resource);
    files.forEach((val, index) => {
        let fPath = join(resource, val);
        let stats = fs.statSync(fPath);
        let ext = path.extname(val);
        let tPath = join(targetPath, val);
        if (stats.isFile()) {
            console.log('    ', `正在构建文件: ${tPath}`)
            if (exts.includes(ext)) {
                fs.writeFileSync(tPath, fs.readFileSync(fPath));
            } else {
                const content = fs.readFileSync(fPath).toString();
                const result = handlebars.compile(content)(meta);
                fs.writeFileSync(tPath, result);
            }
        } else {
            fs.mkdirSync(tPath);
            copyDirSyncHandlebar(fPath, tPath, meta);
        }
    })
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
            console.log(`\t正在构建文件: ${tPath} ${val}`);
            fs.writeFileSync(tPath, fs.readFileSync(fPath));
        } else {
            fs.mkdir(tPath, function (error) {
                console.log(error)
            });
            copyDirSync(fPath, tPath);
        }
    })
}

function removeFiles (path) {
    if (fs.existsSync(path)) {
        let files = fs.readdirSync(path);
        files.forEach((val, index) => {
            let fPath = join(path, val);
            let stats = fs.statSync(fPath);
            if (stats.isFile()) {
                fs.unlinkSync(fPath);
            } else {
                removeFiles(fPath);
            }
        });
        fs.rmdirSync(path);
    }
}

function renameFiles (from, to) {
    fs.renameSync(from, to);
}

module.exports = {
    copyDirSync,
    copyDirSyncHandlebar,
    removeFiles,
    renameFiles
}