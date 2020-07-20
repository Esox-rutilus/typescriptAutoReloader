const exec = require('util').promisify(require('child_process').exec);
const path = require('path');
const fs = require('fs');

const compileCMD = `nodemon --exec tsc`;
const StartCompiledServerCMD = `nodemon --config ${path.join(__dirname, 'nodemon_server.json')} index.js`;

async function watcher() {
    try {
        exec(compileCMD);
        await buildCreated();
        exec(StartCompiledServerCMD, {
            cwd: path.join(__dirname, 'bin', 'debug')
        })    
        console.log(`***********WATCHER***********\r\n`);
        console.log(`Watcher have been started.\r\n`);
        console.log(`***********WATCHER***********\r\n`);
    }
    catch(err) {
        console.log(`Watcher have encountered an error, and will now shut down.`);
        throw err;
    }
}
async function buildCreated(attempts = 100) {
    return new Promise((resolve, reject) => {
        let testFile = path.join(__dirname, 'bin', 'debug', 'index.js');
        try {
            if (attempts > 0) {
                attempts--;
                fs.readFileSync(testFile);
                return resolve();
            }
            else {
                let err = new Error(`No compilation could be found at path ${testFile}`);
                err.code = 1;
                return reject(err);
            }
        }
        catch(err) {
            if(err.code === 'ENOENT') {
                
                setTimeout(async () => {
                    resolve(await buildCreated(attempts));
                }, 100);
            }
            else {
                return reject(err);
            }
        }
    })
}
module.exports = watcher;