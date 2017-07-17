const http = require('http');
const path = require('path');
const fs = require('fs');
const urls = require('url');

const hostname = '127.0.0.1';
const port = 3000;



const server = http.createServer((req, res) => {

    const url = req.url

    const types = {
        "css": "text/css",
        "gif": "image/gif",
        "html": "text/html",
        "ico": "image/x-icon",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "js": "text/javascript",
        "json": "application/json",
        "pdf": "application/pdf",
        "png": "image/png",
        "svg": "image/svg+xml",
        "swf": "application/x-shockwave-flash",
        "tiff": "image/tiff",
        "txt": "text/plain",
        "wav": "audio/x-wav",
        "wma": "audio/x-ms-wma",
        "wmv": "video/x-ms-wmv",
        "xml": "text/xml"
    };

    // 静态文件
    if (url.indexOf('.html') >= 0 || url.indexOf('.css') >= 0 || url.indexOf('.js') >= 0) {


        var realPath = "build" + urls.parse(req.url).pathname;
        fs.readFile(realPath, "binary", function (err, file) {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });

                res.end(err);
            } else {
                const ext = realPath.slice(realPath.lastIndexOf('.') + 1,  realPath.length)
                res.writeHead(200, {
                    'Content-Type': types[ext]
                });

                res.write(file, "binary");

                res.end();
            }
        });
    } else {

        http.get('http://suggestion.baidu.com' + url, function(resB, f, g) {
            // Continuously update stream with data
            var body = '';
            resB.on('data', function(d) {
                body += d;
            });
            resB.on('end', function(a, b, c) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end(body);
            });
        });
    }


});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});