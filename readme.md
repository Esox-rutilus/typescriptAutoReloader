# Typescript Server Autoreloader

## NOTES
- This script will only work, if a server is started from the compilation.

## How to start a new project

- Simply copy the contents of this folder to your new project folder, and run ``` npm start ```.

## How to use in an existing project

- Copy the following files to your project: 
    - watcher.js
    - nodemon.json
    - nodemon_server.json
- __tsconfig__:  Set outDir to ``` "./bin/debug" ```
- __package.json__: Setup start script as ``` node **PATH TO watcher.js** ``` 