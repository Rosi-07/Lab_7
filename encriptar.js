const fs = require('fs');
const crypto = require('crypto');

function generateIntegrityHash(filename) {
    const fileBuffer = fs.readFileSync(filename);
    const hash = crypto.createHash('sha384').update(fileBuffer).digest('base64');
    return `sha384-${hash}`;
}

console.log("Hash de integridad para socket.io.js:", generateIntegrityHash('socket.io.js'));
console.log("Hash de integridad para jquery-1.11.1.js:", generateIntegrityHash('jquery-1.11.1.js'));