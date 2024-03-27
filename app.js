const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer();

server.on('request', (req, res) => {
    if (req.url === '/') {
        fs.readFile('index.html', (err, content) => {
            res.end(content, 'utf8');
            return;
        })
    }

    if (req.url === '/fileUpload') {
        const fileName = req.headers['file-name'];
        
        req.on('data', (chunk) => {
            fs.appendFileSync("files/" + fileName, chunk);
            // console.log("chunk size" + chunk.length);
        });

        res.end("uploaded");
    }
});

server.listen(5050);