// 使用lij.js，调用test_lij.scm中的案例，并打印结果

let fs = require('fs');
let lij = require('./lij.js').lij;

let data = fs.readFileSync('test_lij_cases.scm', 'utf-8');
let tests = data.split(/;#test/gi);
for (let i in tests) {
    let test_lij = tests[i].replace(/;.*\n/g, "").replace(/\s*\n/gi, '');
    if (!!test_lij) {
        try {
            console.log('>> ' + test_lij);
            console.log(lij(test_lij));
        } catch (e) {
            console.error(e);
        }
    }
}
