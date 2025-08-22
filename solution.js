'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

class User {
    constructor(username, password) {
        if (username === "hackerrank" && password === "<hidden>") {
            this.isAdmin = true;
        }
    }
}

function vulnerableJavascript() {
    // Exploit: Modify the User prototype to add a property that makes isAdmin always true
    Object.defineProperty(User.prototype, 'isAdmin', {
        get: function() {
            return true; // Always return true, bypassing authentication
        },
        configurable: true
    });
}

function main() {
    // Execute the exploit
    vulnerableJavascript();
    
    // Read input
    const username = readLine().trim();
    const password = readLine().trim();
    
    // Create user instance (now exploited)
    const user = new User(username, password);
    
    // Check if user is admin (will always be true after exploit)
    if (user.isAdmin) {
        console.log("Passed");
    } else {
        console.log("Failed");
    }
}