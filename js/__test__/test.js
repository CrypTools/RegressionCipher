// Test made using EyeJS - https://eye.js.org

const path = require('path').normalize(__testDir + "/../")

const {
    encrypt,
    decrypt
} = require(path + "lib.js")
eye.test("Encryption + Decryption", "node",
    $ => $(decrypt(encrypt("CrypTools"), 9)).Equal("CrypTools")
)
