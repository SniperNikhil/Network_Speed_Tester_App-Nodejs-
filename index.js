const express = require("express");
const { exec } = require('node:child_process');
const http = require("http")
const path = require("path")
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const port = 4001;

var public = path.join(__dirname, "public")
app.use(express.static(public))
app.set("view engine", "hbs");

const io = new Server(server)


app.get("/", (req, res) => {

    res.render("index"); // Render your index.hbs file
});


io.on('connection', (socket) => {
    socket.on("network", () => {
        
        var command = path.join(__dirname, 'node_modules', '.bin', 'fast --upload --json');
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            const data = JSON.parse(stdout);
            // console.log(`stdout: ${data.downloadSpeed}`);
            // console.log(`stdout: ${data.uploadSpeed}`);
            socket.emit("speed",data.downloadSpeed,data.uploadSpeed)
        });
    })
})


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});