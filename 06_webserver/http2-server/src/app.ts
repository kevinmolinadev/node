import fs from "fs";
import http2 from "http2";

const server = http2.createSecureServer({
    cert: fs.readFileSync("keys/server.crt"),
    key: fs.readFileSync("keys/server.key")
}, (req, res) => {
    console.log(req.url);
    /* const obj = {
        name: "kevin",
        lastName: "molina lazarte",
        age: 20
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(obj)); */

    if (req.url === "/") {
        const html = fs.readFileSync("public/index.html", "utf-8");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(html)
        return;
    }
    if (req.url?.endsWith(".css")) {
        res.writeHead(200, { "Content-Type": "text/css" });
    } else if (req.url?.endsWith(".js")) {
        res.writeHead(200, { "Content-Type": "application/javascript" })
    }
    const content = fs.readFileSync(`./public${req.url}`, "utf-8");
    res.end(content);
});

server.listen(8080, () => {
    console.log("Server running is port 8080");
});
