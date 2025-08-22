// Vulnerable Authentication System
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.expectedUsername = "hackerrank";
        this.expectedPassword = "secretpassword123"; // Hidden password
    }
    
    // Original authentication method
    authenticate() {
        return this.username === this.expectedUsername && 
               this.password === this.expectedPassword;
    }
}

// Function to verify user credentials
function verifyUser(username, password) {
    const user = new User(username, password);
    
    if (user.authenticate()) {
        console.log("Passed");
        return true;
    } else {
        console.log("Failed");
        return false;
    }
}

// The vulnerable function that exploits the authentication system
function vulnerableJavascript() {
    // Exploit: Override the User prototype's authenticate method
    // This makes ALL User instances always return true for authentication
    User.prototype.authenticate = function() {
        return true; // Always return true, bypassing credential checks
    };
    
    // Alternative exploit methods (commented out):
    
    // Method 2: Override console.log to always print "Passed"
    // const originalLog = console.log;
    // console.log = function(message) {
    //     if (message === "Failed") {
    //         originalLog("Passed");
    //     } else {
    //         originalLog(message);
    //     }
    // };
    
    // Method 3: Modify the User constructor to set correct credentials
    // const originalConstructor = User;
    // User = function(username, password) {
    //     this.username = "hackerrank";
    //     this.password = "secretpassword123";
    //     this.expectedUsername = "hackerrank";
    //     this.expectedPassword = "secretpassword123";
    // };
    // User.prototype = originalConstructor.prototype;
}

// Test function to demonstrate the exploit
function testExploit() {
    console.log("=== Before exploit ===");
    verifyUser("Hackerrank", "xyzabc"); // Should fail
    verifyUser("Alex", "abc@321"); // Should fail
    
    console.log("\n=== Executing exploit ===");
    vulnerableJavascript(); // Execute the exploit
    
    console.log("\n=== After exploit ===");
    verifyUser("Hackerrank", "xyzabc"); // Should now pass
    verifyUser("Alex", "abc@321"); // Should now pass
    verifyUser("anyone", "anything"); // Should now pass
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { User, verifyUser, vulnerableJavascript, testExploit };
}