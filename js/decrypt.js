/***************************

Use: "Wy0xLjc4MjM2NDU0OTY3NTIyNjNlLTM0LC0 ... YyNzg2LDk3LjAwMDAwMDAwMDAwMDExXQ==".regdecrypt(6) // String is much longer in fact
=>  "attack"

**************************/

const t = require("theorem.js") // We use TheoremJS (https://theorem.js.org) for all the math
const b64 = require('@cryptoolsorg/base64');

String.prototype.regdecrypt = function(length) {
    let v = b64.decrypt(this)
    let f = t.polynomial(...JSON.parse(v))
    let arr = []
    for (let i = 0; i < length; i++) {
        arr.push(Math.round(f.core(i)))
    }
    return String.fromCharCode(...arr)
}

module.exports = (text, l) => text.regdecrypt(l)
