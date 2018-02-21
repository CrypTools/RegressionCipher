/***************************

Use: "attack".regencrypt() // Please keep the length of your String in a variable, you'll need it for decryption
=> "Wy0xLjc4MjM2NDU0OTY3NTIyNjNlLTM0LC0 ... YyNzg2LDk3LjAwMDAwMDAwMDAwMDExXQ==" // String is much longer in fact

**************************/

const t = require("theorem.js") // We use TheoremJS (https://theorem.js.org) for all the math
const b64 = require('@cryptoolsorg/base64');

String.prototype.regencrypt = function(deg = 50) { // a 50 degree polynomial should be enough for most words
    let obj = {}
    for (let i = 0; i < this.length; i++) {
        obj[i] = this.charCodeAt(i)
    }
    const reg = t.regression(obj, deg)

    const values = reg.values
    return b64.encrypt(JSON.stringify(values))
}

module.exports = (text, deg=50) => text.regencrypt(deg)
