const http = require('node:http');
const path = require("path");
const fs = require("fs");


// Create a local server to receive data from
const server = http.createServer((req, res) => {

    let filePath = path.join(
        __dirname,
        "public",
        req.url === "/" ? "index.html" : req.url,
    
      );
      console.log(filePath);


      fs.readFile(filePath, (err, content) => {
        if (err) {
          if (err.code == "ENOENT") {
            // Page not found
            fs.readFile(
              path.join(__dirname, "public", "404.html"),
              (err, content) => {
                res.end(content, "utf8");
              }
            );
          } else {
            //  Some server error
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);
          }
        } else {
          // Success
          res.end(content, "utf8");
        }
      });
    });
    
 
  


server.listen(8000);