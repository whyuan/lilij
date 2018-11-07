// 使用lij.js，调用lil.scm，得到lilij解释器，再用lilij调用test_lilij.scm中的案例，并打印结果

let fs = require('fs');
let lij = require('./lij.js').lij;

let lilij_data = fs.readFileSync('lilij.scm', 'utf-8');
let data = fs.readFileSync('test_lilij_cases.scm', 'utf-8');

let tests = data.split(/;#test/gi);
for (let i in tests) {
    let test_lijlij = tests[i].replace(/;.*\n/g, "").replace(/\s*\n/gi, '');
    if (!!test_lijlij) {
        try {
            console.log('>> ' + test_lijlij);
            console.log(lij(lilij_data.replace(";#exp", test_lijlij)));
        } catch (e) {
            console.error(e);
        }
    }
}
