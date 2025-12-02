const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_FILE_PATH = path.join(__dirname, 'api', 'dashboard', 'data.json');

const server = http.createServer((req, res) => {
    // Set CORS headers to allow requests from the frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.url === '/api/dashboard' && req.method === 'GET') {
        fs.readFile(DATA_FILE_PATH, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading data file:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data); // Serve the raw JSON data
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api/dashboard`);
});
