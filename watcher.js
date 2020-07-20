const exec = require('util').promisify(require('child_process').exec);
const path = require('path');
const fs = require('fs');

const compileCMD = `nodemon --exec tsc`;
const StartCompiledServerCMD = `nodemon --config ${path.join(__dirname, 'nodemon_server.json')} index.js`;

watcher();

async function watcher() {
    try {
        exec(compileCMD).catch(err => {throw err;});
        // if (!await buildCreated()) {
            // }
        fs.mkdirSync(path.join(__dirname, 'bin', 'debug'), {recursive: true});
        exec(StartCompiledServerCMD, {
            cwd: path.join(__dirname, 'bin', 'debug')
        }).catch(err => {throw err;});
        console.log(`***********WATCHER***********\r\n`);
        console.log(`Watcher have been started.\r\n`);
        console.log(`***********WATCHER***********\r\n`);
    }
    catch(err) {
        console.log(`Watcher have encountered an error, and will now shut down.`);
        throw err;
    }
}