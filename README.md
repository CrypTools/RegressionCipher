# RegressionCipher

A cipher that uses regression to encrypt a word

## How it works?

### Encoding

First, let's take a small string (this cipher doesn't handle long string):

```javascript
"Hello World!"
```

Then, we take its Unicode Scalars representation in an array:

```javascript
{
    "0": 72,
    "1": 101,
    "2": 108,
    "3": 108,
    "4": 111,
    "5": 32,
    "6": 87,
    "7": 111,
    "8": 114,
    "9": 108,
    "10": 100,
    "11": 33
}
```

We place these points on a graph, and we're trying to find a polynomial function that passes through these points. This is called a polynomial regression. By default, we're looking for a 50 degree polynomial, this mean that we're looking for a function with `x^50` in it.

This is the most difficult part of this cipher. On the `js` implementation, we use [TheoremJS](https://theorem.js.org) to help us finding this curve.

> That's what the graph looks like: ![Rendered by Descartes](assets/graph.png) _This is an absolute mess!_

When we have our function, we take the polynomial's constants and we put them in an array:

```javascript
[7.460811086912491e-46,-7.962405118584728e-45,1.9278177172115392e-45,-3.5498651021822254e-42,1.5186448672981877e-41,-4.121622223200062e-41,4.04820982223833e-39,-1.8738877919982897e-38,-4.086439268485582e-38,-2.178663346321919e-37,-1.2163569091919228e-35,4.403761801345783e-34,-1.892292543888421e-33,-1.9247541585132566e-32,8.550561303064075e-32,-1.663472057615308e-30,-3.399209092513209e-29,1.1955863899190084e-27,4.967073699309138e-27,7.525767895574489e-26,-1.4721968061815467e-24,-2.2247371855035983e-24,-1.26356074868432e-22,5.868551264524077e-22,2.022664462484692e-20,9.632814297363559e-20,-2.1413071158603019e-19,-1.1255807521972845e-17,-2.9799892953240315e-16,6.508087352915873e-16,-2.5785604873749457e-14,4.057695624368721e-13,-3.493535338048475e-12,3.764475288666697e-11,-2.6778776484082267e-10,3.0675833766998695e-9,1.8468211834686325e-8,-1.777489976431793e-7,0.00000316330304168273,-0.000055624507062443935,-0.00017749393967649563,0.0005029266193315753,0.048850204878434784,-0.024854249421857127,-3.7587677945914724,21.32517859935154,-35.06355640424047,-20.192777609490225,87.04041721662499,-20.3736200267882,71.99981834159912]
```

And we return the base64 representation of this array:

```javascript
WzcuNDYwODExMDg2OTEyNDkxZS00NiwtNy45NjI0MDUxMTg1ODQ3MjhlLTQ1LDEuOTI3ODE3NzE3
MjExNTM5MmUtNDUsLTMuNTQ5ODY1MTAyMTgyMjI1NGUtNDIsMS41MTg2NDQ4NjcyOTgxODc3ZS00
MSwtNC4xMjE2MjIyMjMyMDAwNjJlLTQxLDQuMDQ4MjA5ODIyMjM4MzNlLTM5LC0xLjg3Mzg4Nzc5
MTk5ODI4OTdlLTM4LC00LjA4NjQzOTI2ODQ4NTU4MmUtMzgsLTIuMTc4NjYzMzQ2MzIxOTE5ZS0z
NywtMS4yMTYzNTY5MDkxOTE5MjI4ZS0zNSw0LjQwMzc2MTgwMTM0NTc4M2UtMzQsLTEuODkyMjky
NTQzODg4NDIxZS0zMywtMS45MjQ3NTQxNTg1MTMyNTY2ZS0zMiw4LjU1MDU2MTMwMzA2NDA3NWUt
MzIsLTEuNjYzNDcyMDU3NjE1MzA4ZS0zMCwtMy4zOTkyMDkwOTI1MTMyMDllLTI5LDEuMTk1NTg2
Mzg5OTE5MDA4NGUtMjcsNC45NjcwNzM2OTkzMDkxMzhlLTI3LDcuNTI1NzY3ODk1NTc0NDg5ZS0y
NiwtMS40NzIxOTY4MDYxODE1NDY3ZS0yNCwtMi4yMjQ3MzcxODU1MDM1OTgzZS0yNCwtMS4yNjM1
NjA3NDg2ODQzMmUtMjIsNS44Njg1NTEyNjQ1MjQwNzdlLTIyLDIuMDIyNjY0NDYyNDg0NjkyZS0y
MCw5LjYzMjgxNDI5NzM2MzU1OWUtMjAsLTIuMTQxMzA3MTE1ODYwMzAxOWUtMTksLTEuMTI1NTgw
NzUyMTk3Mjg0NWUtMTcsLTIuOTc5OTg5Mjk1MzI0MDMxNWUtMTYsNi41MDgwODczNTI5MTU4NzNl
LTE2LC0yLjU3ODU2MDQ4NzM3NDk0NTdlLTE0LDQuMDU3Njk1NjI0MzY4NzIxZS0xMywtMy40OTM1
MzUzMzgwNDg0NzVlLTEyLDMuNzY0NDc1Mjg4NjY2Njk3ZS0xMSwtMi42Nzc4Nzc2NDg0MDgyMjY3
ZS0xMCwzLjA2NzU4MzM3NjY5OTg2OTVlLTksMS44NDY4MjExODM0Njg2MzI1ZS04LC0xLjc3NzQ4
OTk3NjQzMTc5M2UtNywwLjAwMDAwMzE2MzMwMzA0MTY4MjczLC0wLjAwMDA1NTYyNDUwNzA2MjQ0
MzkzNSwtMC4wMDAxNzc0OTM5Mzk2NzY0OTU2MywwLjAwMDUwMjkyNjYxOTMzMTU3NTMsMC4wNDg4
NTAyMDQ4Nzg0MzQ3ODQsLTAuMDI0ODU0MjQ5NDIxODU3MTI3LC0zLjc1ODc2Nzc5NDU5MTQ3MjQs
MjEuMzI1MTc4NTk5MzUxNTQsLTM1LjA2MzU1NjQwNDI0MDQ3LC0yMC4xOTI3Nzc2MDk0OTAyMjUs
ODcuMDQwNDE3MjE2NjI0OTksLTIwLjM3MzYyMDAyNjc4ODIsNzEuOTk5ODE4MzQxNTk5MTJd
```

### Decoding

We take the text above, and we decode it using `base64`. We parse this array, and we create a polynomial from this array:

```javascript
const polynomial = t.polynomial(...constants) // t is referring to TheoremJS, and constants to the array above
```

## Implementations

Language   | Encrypt                     | Decrypt
---------- | --------------------------- | ---------------------------
Javascript | [encrypt.js](js/encrypt.js) | [decrypt.js](js/decrypt.js)

## Running the tests

Tests are automatically handled by [Travis CI](https://travis-ci.org/CrypTools/RegressionCipher/).

## Contributing

Please read [CONTRIBUTING.md](https://github.com/CrypTools/cryptools.github.io/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/CrypTools/RegressionCipher/tags).

## Authors

- **Arthur Guiot** - _Initial work & conception_ - [@arguiot](https://github.com/arguiot)

See also the list of [contributors](https://github.com/CrypTools/RegressionCipher/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the

<license> file for details</license>
