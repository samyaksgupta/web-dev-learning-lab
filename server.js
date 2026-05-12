const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Middleware to parse JSON
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Endpoint to receive logs from the browser
app.post('/log', (req, res) => {
    const { message, protocol, timestamp } = req.body;
    
    // ANSI Color codes for the terminal
    const colors = {
        HTTP: '\x1b[36m', // Cyan
        DNS: '\x1b[35m',  // Magenta
        TCP: '\x1b[34m',  // Blue
        AJAX: '\x1b[32m', // Green
        SYSTEM: '\x1b[33m', // Yellow
        ERROR: '\x1b[31m',  // Red
        RESET: '\x1b[0m'
    };

    const color = colors[protocol.split('/')[0]] || colors.SYSTEM;
    
    console.log(`[${timestamp}] ${color}[${protocol}]${colors.RESET} ${message}`);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log('\x1b[1m\x1b[32m%s\x1b[0m', `WebDev Lab Server running at http://localhost:${PORT}`);
    console.log('\x1b[33m%s\x1b[0m', 'Interaction logs will appear below in real-time:');
    console.log('------------------------------------------------------------');
});
