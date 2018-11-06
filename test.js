let fs = require('fs');
let lilij = require('./lilij.js').lilij;

let data = fs.readFileSync('test.scm', 'utf-8');
let tests = data.split(/;#test/gi);
for (let i in tests) {
    let test = tests[i].replace(/\s*\n/gi, '');
    if (!!test) {
        try {
            console.log('>> ' + test);
            console.log(lilij(test));
        } catch (e) {
            console.error(e);
        }
    }
}
