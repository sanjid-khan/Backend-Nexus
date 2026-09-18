
// 1. Message

let message = "I sent 1000 taka";

// 2. Create a hash

let hash = SHA256(message);

// 3. Sign the hash using the private key

let digitalSignature = sign(hash, privateKey);

// 4. Send: message + signature

// ------------------------------

// 5. Receiver side:

let calculatedHash = SHA256(receivedMessage);

// Verify the signature using the public key
// and retrieve the hash


let receivedHash = verifySignature(digitalSignature, publicKey);


if (receivedHash === calculatedHash) {
    console.log("✅ Authentic message, not modified");
} else {
    console.log("❌ Tampered or forged message!");
}

