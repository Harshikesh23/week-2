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
    // Exploit: Override the isAdmin property on User prototype
    // This makes ALL User instances return true for isAdmin
    Object.defineProperty(User.prototype, 'isAdmin', {
        get: function() {
            return true; // Always return true, bypassing authentication
        },
        configurable: true,
        enumerable: true
    });
}

function main() {
    // Execute the exploit before processing user input
    vulnerableJavascript();
    
    // Read username and password from input
    const username = readLine().trim();
    const password = readLine().trim();
    
    // Create user instance (now exploited)
    const user = new User(username, password);
    
    // Check authentication (will always pass due to exploit)
    if (user.isAdmin) {
        console.log("Passed");
    } else {
        console.log("Failed");
    }
}