/**
 * Core Logic for WebDev Learning Lab
 */

// --- Terminal Utility ---
function logAction(message, protocol = "SYSTEM") {
    const terminal = document.getElementById('terminal');
    const timestamp = new Date().toLocaleTimeString();
    
    // 1. Update In-Browser Terminal
    const entry = document.createElement('div');
    entry.innerHTML = `
        <span class="timestamp">[${timestamp}]</span> 
        <span class="protocol">[${protocol}]</span> 
        ${message}
    `;
    terminal.appendChild(entry);
    terminal.scrollTop = terminal.scrollHeight;
    
    // 2. Send to Physical Terminal (Node.js Server)
    fetch('/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, protocol, timestamp })
    }).catch(() => {
        console.warn('Backend server not running. Logs only showing in browser.');
    });

    // 3. Browser Console
    console.log(`[${protocol}] ${message}`);
}

function clearTerminal() {
    document.getElementById('terminal').innerHTML = '<div>> Terminal Cleared.</div>';
}

// --- WWW & Protocols ---
function simulateDNS() {
    const domain = document.getElementById('dns-input').value || "example.com";
    logAction(`Initiating DNS Lookup for: ${domain}`, 'DNS/UDP');
    
    setTimeout(() => {
        const mockIP = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.1.1`;
        logAction(`DNS Resolved: ${domain} -> ${mockIP}`, 'DNS/UDP');
        logAction(`Establishing TCP Handshake with ${mockIP}:80`, 'TCP/IP');
        logAction(`HTTP GET / HTTP/1.1 request sent`, 'HTTP');
    }, 1000);
}

function logHostingInfo() {
    const type = document.getElementById('hosting-type').value;
    if (!type) return;
    
    const info = {
        shared: "Multiple sites on one server, cost-effective (FTP/SFTP used for upload).",
        vps: "Virtual Private Server, isolated resources (SSH/Root access).",
        dedicated: "Full physical server for one user (High performance, HTTP/HTTPS).",
        cloud: "Scalable network of servers (AWS/Azure/GCP, Load Balancing)."
    };
    
    logAction(`User selected ${type} hosting. Characteristics: ${info[type]}`, 'WEB_HOSTING');
}

// --- JS Basics & DOM ---
function showJSAlert() {
    logAction('Displaying Alert Box', 'JS_OUTPUT');
    alert('This is a JavaScript Alert Box (Output System)');
}

function showJSPrompt() {
    logAction('Displaying Prompt Input Box', 'JS_INPUT');
    const name = prompt('What is your name?');
    if (name) {
        logAction(`User entered: ${name}`, 'JS_PROCESS');
        document.getElementById('val-text').value = name;
    }
}

function manipulateCSS() {
    logAction('Manipulating CSS via JavaScript', 'DOM_STYLE');
    const sections = document.querySelectorAll('section');
    sections.forEach(s => {
        s.style.borderColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        s.style.borderWidth = '3px';
    });
}

function validateForm(e) {
    e.preventDefault();
    logAction('Form Submission Intercepted', 'DOM_EVENT');
    
    const text = document.getElementById('val-text').value;
    const email = document.getElementById('val-pattern').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Length Validator
    if (text.length <= 3) {
        logAction('Validation Error: Text length must be > 3', 'FORM_VALIDATION');
        alert('Text too short!');
        return;
    }

    // Pattern Validator
    if (email && !emailPattern.test(email)) {
        logAction('Validation Error: Invalid Email Pattern', 'FORM_VALIDATION');
        alert('Invalid Email!');
        return;
    }

    logAction(`Form Validated Successfully. Data: {text: "${text}", email: "${email}"}`, 'HTTP_POST_SIM');
    logAction('Simulating XHR Post request...', 'AJAX');
}

// --- Advanced JS: OOP Banking System ---
class BankAccount {
    #balance; // Private field (Encapsulation)

    constructor(owner, initialBalance = 100) {
        this.owner = owner;
        this.#balance = initialBalance;
        logAction(`OOP: Object 'BankAccount' instantiated for ${owner}`, 'CLASS_CONSTRUCTOR');
    }

    deposit(amount) {
        this.#balance += amount;
        logAction(`Encapsulation: Balance modified via method. New total: $${this.#balance}`, 'OOP_METHOD');
        this.updateViz();
    }

    withdraw(amount) {
        if (amount <= this.#balance) {
            this.#balance -= amount;
            logAction(`Encapsulation: $${amount} withdrawn. Remaining: $${this.#balance}`, 'OOP_METHOD');
        } else {
            logAction(`Error: Insufficient funds.`, 'ERROR_HANDLING');
        }
        this.updateViz();
    }

    getBalance() {
        return this.#balance;
    }

    updateViz() {
        const viz = document.getElementById('object-viz');
        viz.innerHTML = `
            <strong>Instance:</strong> ${this.constructor.name}<br>
            <strong>Owner:</strong> ${this.owner}<br>
            <strong>Balance:</strong> $${this.#balance} (Private)<br>
            <span class="text-primary small">// Property #balance is hidden from outside scope</span>
        `;
    }
}

class SavingsAccount extends BankAccount {
    constructor(owner, balance) {
        super(owner, balance);
        this.interestRate = 0.05;
        logAction(`Inheritance: 'SavingsAccount' inherited properties from 'BankAccount'`, 'OOP_INHERITANCE');
    }

    applyInterest() {
        const interest = this.getBalance() * this.interestRate;
        this.deposit(interest);
        logAction(`Polymorphism/Inheritance: Applied 5% interest ($${interest})`, 'OOP_ADVANCED');
    }

    updateViz() {
        super.updateViz();
        const viz = document.getElementById('object-viz');
        viz.innerHTML += `<br><strong>Interest Rate:</strong> 5%`;
    }
}

let activeAccount = null;

function createAccount() {
    const name = document.getElementById('acc-name').value || "Guest";
    activeAccount = new BankAccount(name);
    activeAccount.updateViz();
    document.getElementById('acc-controls').style.display = 'block';
}

function accAction(type) {
    if (!activeAccount) return;
    if (type === 'deposit') activeAccount.deposit(50);
    if (type === 'withdraw') activeAccount.withdraw(20);
}

function upgradeToSavings() {
    if (!activeAccount) return;
    const currentBalance = activeAccount.getBalance();
    const owner = activeAccount.owner;
    activeAccount = new SavingsAccount(owner, currentBalance);
    activeAccount.updateViz();
}

// --- ES6 Features ---
function demoES6() {
    logAction('Executing ES6 Demonstration', 'ES6');
    const output = document.getElementById('es6-output');
    
    // Arrow function & Template literals
    const greet = (u) => `User: ${u}`;
    
    // Destructuring
    const settings = { theme: 'dark', zoom: 1.2 };
    const { theme } = settings;
    
    // Spread operator
    const base = [1, 2];
    const combined = [...base, 3, 4];

    output.innerHTML = `
        Arrow: ${greet('Samyak')}<br>
        Destructured Theme: ${theme}<br>
        Spread Array: [${combined}]
    `;
    logAction('ES6 features applied to DOM', 'ES6_COMPLETE');
}

// --- BOM Functions ---
function demoBOM() {
    logAction('Refreshing Browser Object Model (BOM)', 'BOM');
    document.getElementById('bom-platform').innerText = navigator.platform;
    document.getElementById('bom-res').innerText = `${screen.width}x${screen.height}`;
    document.getElementById('bom-history').innerText = `${window.history.length} pages`;
    
    logAction(`Accessing 'window.screen' and 'window.navigator'`, 'BOM_ACCESS');
}

// --- AJAX / XML / JSON ---
function fetchJSON() {
    logAction('Fetching JSON data...', 'AJAX/HTTP_GET');
    
    // Simulating AJAX fetch from local file
    fetch('data.json')
        .then(response => {
            logAction(`Response Status: ${response.status}`, 'HTTP_RESPONSE');
            return response.json();
        })
        .then(data => {
            logAction('JSON Data Parsed successfully', 'JSON');
            const display = document.getElementById('data-display');
            display.textContent = JSON.stringify(data, null, 2);
            logAction(`Found ${data.syllabus_items.length} items in JSON`, 'DATA_PROCESS');
        })
        .catch(err => {
            logAction(`Fetch failed (Note: Need local server for AJAX): ${err.message}`, 'AJAX_ERROR');
            // Fallback for demo if no server
            const mockJSON = { "status": "mock", "message": "Run on local server to see real fetch" };
            document.getElementById('data-display').textContent = JSON.stringify(mockJSON, null, 2);
        });
}

function fetchXML() {
    logAction('Fetching XML data...', 'AJAX/XML');
    
    fetch('data.xml')
        .then(response => response.text())
        .then(str => {
            logAction('XML received. Applying XSLT transformation...', 'XSLT');
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(str, "text/xml");
            
            // For demo, we'll just display the raw XML string if XSLT isn't easy to show in one click
            document.getElementById('data-display').textContent = str;
            logAction('XML displayed in raw format.', 'XHTML_CONCEPT');
        })
        .catch(err => {
            logAction(`XML Fetch error: ${err.message}`, 'ERROR');
        });
}

// --- Client-Server Interaction ---
function simulateRequest(method) {
    const packet = document.getElementById('packet');
    const status = document.getElementById('comm-status');
    const client = document.getElementById('client-node');
    const server = document.getElementById('server-node');

    logAction(`Client initiating HTTP ${method} request`, 'HTTP');
    status.innerText = `Creating ${method} Request...`;
    packet.style.display = 'block';
    packet.style.left = '20%';
    client.classList.add('border-primary');

    // 1. Request phase
    setTimeout(() => {
        status.innerText = `Sending ${method} Packet...`;
        packet.style.transition = 'left 1.5s linear';
        packet.style.left = '75%';
        logAction(`Packet traveling over TCP/IP...`, 'TCP');
    }, 500);

    // 2. Server Processing phase
    setTimeout(() => {
        status.innerText = `Server Processing...`;
        server.classList.add('border-warning');
        logAction(`Server received ${method} request`, 'HTTP_SERVER');
        logAction(`Parsing Headers: User-Agent, Accept, Content-Type`, 'PROTOCOL');
        logAction(`Routing to /api/data handler...`, 'SYSTEM');
        logAction(`Querying Database / File System...`, 'SERVER_SIDE');
        logAction(`Generating HTTP 200 OK Response`, 'HTTP_RESPONSE');
    }, 2000);

    // 3. Response phase
    setTimeout(() => {
        status.innerText = `Sending Response...`;
        packet.style.backgroundColor = '#198754'; // Green for response
        packet.style.left = '20%';
        logAction(`Response traveling back to client`, 'TCP');
    }, 3500);

    // 4. Client Render phase
    setTimeout(() => {
        status.innerText = `Success: 200 OK`;
        client.classList.remove('border-primary');
        server.classList.remove('border-warning');
        packet.style.display = 'none';
        logAction(`Client received response. Rendering data in DOM.`, 'JS_DOM');
    }, 5000);
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    logAction('DOM Content Fully Loaded', 'DOM_EVENT');
    logAction('Initializing Bootstrap Components...', 'BOOTSTRAP');
    logAction('Protocol Stack Initialized: HTTP/1.1, TCP, UDP, DNS, FTP, SMTP', 'NETWORK_STACK');
    logAction('Ready for user interaction.', 'SYSTEM');
});

// Adding a few more specific protocol logs
window.onresize = () => {
    logAction(`Window Resized: ${window.innerWidth}x${window.innerHeight}`, 'BOM_WINDOW');
};

window.onscroll = () => {
    // Throttled log
    if (!window.scrollLogged) {
        logAction('Page Scrolled', 'UI_EVENT');
        window.scrollLogged = true;
        setTimeout(() => window.scrollLogged = false, 2000);
    }
};
