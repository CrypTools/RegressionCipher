/***************************

Use: "attack".encrypt() // Please keep the length of your String in a variable, you'll need it for decryption
=> "Wy0xLjc4MjM2NDU0OTY3NTIyNjNlLTM0LC0 ... YyNzg2LDk3LjAwMDAwMDAwMDAwMDExXQ==" // String is much longer in fact

**************************/

function polynomial() {
	const args = [...arguments].reverse()
	let buffer = "";
	for (let i = 0; i < args.length; i++) {
		buffer += `${args[i]} * x**${i} ${i == args.length -1 ? '': '+ '}`
	}
	return {
		type: "polynomial",
		v: "x",
		f: buffer,
		values: [...arguments],
		core: x => {
			let regex = new RegExp("x")
			let newStr = buffer.replace(regex, `(${x})`)
			return eval(newStr)
		}
	}
}
function gaussElimination(input, order) {
    const matrix = input;
    const n = input.length - 1;
    const coefficients = [order];

    for (let i = 0; i < n; i++) {
        let maxrow = i;
        for (let j = i + 1; j < n; j++) {
            if (Math.abs(matrix[i][j]) > Math.abs(matrix[i][maxrow])) {
                maxrow = j;
            }
        }

        for (let k = i; k < n + 1; k++) {
            const tmp = matrix[k][i];
            matrix[k][i] = matrix[k][maxrow];
            matrix[k][maxrow] = tmp;
        }

        for (let j = i + 1; j < n; j++) {
            for (let k = n; k >= i; k--) {
                matrix[k][j] -= (matrix[k][i] * matrix[i][j]) / matrix[i][i];
            }
        }
    }

    for (let j = n - 1; j >= 0; j--) {
        let total = 0;
        for (let k = j + 1; k < n; k++) {
            total += matrix[k][j] * coefficients[k];
        }

        coefficients[j] = (matrix[n][j] - total) / matrix[j][j];
    }

    return coefficients;
}
function polyreg(data, deg) {
    const x = Object.keys(data)
    for (let i in x) {
        x[i] = parseFloat(x[i])
    }
    const y = Object.values(data)
    for (let i in y) {
        y[i] = parseFloat(y[i])
    }
    const lhs = [];
    const rhs = [];
    let a = 0;
    let b = 0;
    let c;
    let k;

    var i;
    let j;
    let l;
    const len = x.length;

    let results;
    let equation;
    let string;

    if (typeof deg === 'undefined') {
        k = 3;
    } else {
        k = deg + 1;
    }

    for (i = 0; i < k; i++) {
        for (l = 0; l < len; l++) {
            if (y[l] !== null) {
                a += x[l] ** i * y[l];
            }
        }

        lhs.push(a);
        a = 0;

        c = [];
        for (j = 0; j < k; j++) {
            for (l = 0; l < len; l++) {
                if (y[l] !== null) {
                    b += x[l] ** (i + j);
                }
            }
            c.push(b);
            b = 0;
        }
        rhs.push(c);
    }
    rhs.push(lhs);
    equation = gaussElimination(rhs, k);

    return polynomial(...equation.reverse())
}
String.prototype.toB64 = function() {
	let s = this // creates a mutable value
    // the result/encoded string, the padding string, and the pad count
    const base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let r = "";
    let p = "";
    let c = s.length % 3;

    // add a right zero pad to make this string a multiple of 3 characters
    if (c > 0) {
        for (; c < 3; c++) {
            p += "=";
            s += "\0";
        }
    }
    // increment over the length of the string, three characters at a time
    for (c = 0; c < s.length; c += 3) {
        // we add newlines after every 76 output characters, according to the MIME specs
        if (c > 0 && (c / 3 * 4) % 76 == 0) {
            r += "\r\n";
        }
        // these three 8-bit (ASCII) characters become one 24-bit number
        let n = (s.charCodeAt(c) << 16) + (s.charCodeAt(c + 1) << 8) + s.charCodeAt(c + 2);
        // this 24-bit number gets separated into four 6-bit numbers
        n = [(n >>> 18) & 63, (n >>> 12) & 63, (n >>> 6) & 63, n & 63];
        // those four 6-bit numbers are used as indices into the base64 character list
        r += base64chars[n[0]] + base64chars[n[1]] + base64chars[n[2]] + base64chars[n[3]];
    }
    // add the actual padding string, after removing the zero pad
    return r.substring(0, r.length - p.length) + p;
}


String.prototype.encrypt = function(deg = 50) { // a 50 degree polynomial should be enough for most words
    let obj = {}
    for (let i = 0; i < this.length; i++) {
        obj[i] = this.charCodeAt(i)
    }
    const reg = polyreg(obj, deg)

    const values = reg.values
    return JSON.stringify(values).toB64()
}
