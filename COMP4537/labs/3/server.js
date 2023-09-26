
const fs = require('fs');
const http = require('http')
const util = require('./modules/utils');
url = require('url')
PORT = process.env.PORT || 8080

http.createServer((req, res) => {
    const link = url.parse(req.url, true)
    const query = link.query;
    const pathname = link.pathname;
    if (query.text && pathname == '/writeFile/') {
        const text = query.text;
        fs.appendFile('file.txt', text, (err) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/html'})
                res.end('Error writing file')
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.end('File written successfully to file.txt')
            }
          });
    } else if (pathname.startsWith('/readFile') ) {
        let filePath = pathname.split('/')[2];
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.end("File Doesn't exist")
            }
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(data)
        })
    } else {
        const name = query.name;
        const message = `Hello ${name || "Nobody"} the current server date/time is ${util.myServerDateTime()}`

        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(`<p style='color:blue;'> ${message} </p>`)
        res.end()
    }
}).listen(PORT)
