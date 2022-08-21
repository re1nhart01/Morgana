const { PeerServer } = require('peer')
const path = require("path");
const {workerData} = require('worker_threads')
const fs = require("fs");
const key = fs.readFileSync(path.join(__dirname, '..', 'https', 'server.key'), {encoding: "utf8"})
const cert = fs.readFileSync(path.join(__dirname, '..', 'https', 'server.cert'), {encoding: "utf8"})

//ssl: {cert: cert, key: key }

PeerServer({ port: workerData.RTC_PORT, path: '/', });
console.log(require('path').join(__dirname, ".." ,'env', '.env'))
console.log('Peer server is running on port:',  workerData.RTC_PORT)
