var fs = require('fs');
var Builder = require('systemjs-builder');

function copyFile(inPath, outPath){
    if(!fs.existsSync(outPath.substring(0, outPath.lastIndexOf("/")))){
        fs.mkdirSync("build/foo/");
    }
    fs.createReadStream(inPath).pipe(fs.createWriteStream(outPath));
    console.log("Copied " + inPath + " to " + outPath);
}

copyFile("node_modules/zone.js/dist/zone.js", "build/node_modules/zone.js/dist/zone.js");
copyFile("node_modules/reflect-metadata/Reflect.js", "build/node_modules/reflect-metadata/Reflect.js");
copyFile("node_modules/systemjs/dist/system.src.js", "build/node_modules/systemjs/dist/system.src.js");

var builder = new Builder('./');

builder.loadConfig('systemjs.config.js')
    .then(function() {
        builder.buildStatic('app/main.js', 'build/bundle.js')
            .then(function () {
                console.log(new Date());
                console.log('Build complete');
            })
            .catch(function (err) {
                console.error(err);
            });
    })
    .catch(function (err) {
        console.error(err);
    });