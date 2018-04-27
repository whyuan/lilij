// step
// 1.解析为s表达式 @@@@@@@@@@@@@@@
// 2.使用表达式来运算 @@@@@@@@@@@@
// 字母序列 或 表

// 原始操作符
// (quote x) '
// (atom x)
// (eq x y)
// (car x)
// (cdr x)
// (cons x y)
// (cond (p1 e1) (p2 e2) ... (pn en))
// 函数
// ((lambda (p1 ... pn) e) a1 ... an)
// (label f (lambda (p1 ... pn) e))

let parseToTokens = (exp) => {
    exp = exp.replace(/\s+/gi, " ").trim();
    let p = 0;
    let tokens = [];
    while (p < exp.length) {
        if (exp[p] === "(" || exp[p] === ")") {
            tokens.push(exp[p]);
            p += 1;
        } else if (/\w/.test(exp[p])) {
            let token = "";
            exp.substr(p).replace(/(\w(\w|\d|_)*).*$/, (a, b) => {
                token = b
            });
            tokens.push(token);
            p += token.length;
        } else {
            p += 1;
        }
    }
    return tokens;
};

let parse = (exp) => {
    let tokens = parseToTokens(exp);
    let stack = [[]];
    try {
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] === "(") {
                stack.push([]);
            } else if (tokens[i] === ")") {
                let top = stack.pop();
                stack[stack.length - 1].push(top);
            } else {
                stack[stack.length - 1].push(tokens[i]);
            }
        }
        return stack[0][0];
    } catch(e) {
        console.error("exp is not valid.");
    }
};

let quote = (x) => {
    return x;
};

let atom = (x) => {
    if (typeof x === "string" || (x instanceof Array && x.length === 0)) {
        return "t";
    } else {
        return [];
    }
};

let eq = (x, y) => {
    if (typeof x === "string" && typeof y === "string" && x === y) {
        return "t";
    } else if (x instanceof Array && y instanceof Array) {
        if (x.length === 0 && y.length === 0) {
            return "t";
        } else if (x.length !== y.length) {
            return [];
        } else {
            for (let i = 0; i < x.length; i++) {
                if (eq(x[i], y[i]) !== "t") {
                    return [];
                }
            }
            return "t";
        }
    } else {
        return [];
    }
};

let car = (x) => {
    return x[0];
};

let cdr = (x) => {
    return x.slice(1);
};

let cons = (x, list) => {
    let list1 = list.slice(0);
    list1.splice(0, 0, x);
    return list1;
};

let evcon = (pes, env) => {
    for (let i = 0; i < pes.length; i++) {
        if (interp(pes[i][0], env) === "t") {
            return interp(pes[i][1], env);
        }
    }
};

let evlis = (exps, env) => {
    let res = [];
    for (let i = 0; i < exps.length; i++) {
        res.push(interp(exps[i], env));
    }
    return res;
};

let evbegin = (exps, env) => {
    let exps = cdr(exp);
    let res = [];
    for (let i = 0; i < exps.length; i++) {
        res = interp(exps, env);
    }
    return res;
};

let assoc = (exp, env) => {
    if (env[exp] !== undefined) {
        return env[exp];
    } else {
        throw "error";
    }
};

let cadr = (exp) => {
    return exp[1];
};

let caar = (exp) => {
    return exp[0][0];
};

let cadar = (exp) => {
    return exp[0][1];
};

let caddr = (exp) => {
    return exp[2];
};

let caddar = (exp) => {
    return exp[0][2]
};

let pair = (l0, l1) => {
    let res = {};
    for (let i = 0; i < l0.length; i++) {
        res[l0[i]] = l1[i];
    }
    return res;
};

let append = (env0, env1) => {
    let res = {};
    for (let key in env0) {
        if (env0.hasOwnProperty(key)) {
            res[key] = env0[key];
        }
    }
    for (let key in env1) {
        if (env1.hasOwnProperty(key)) {
            res[key] = env1[key];
        }
    }
    return res;
};

let interp = (exp, env) => {
    if (atom(exp) === "t") {
        return assoc(exp, env);
    } else if (atom(car(exp)) === "t") {
        if (eq(car(exp), "quote") === "t") {
            return cadr(exp);
        } else if (eq(car(exp), "atom") === "t") {
            return atom(interp(cadr(exp), env));
        } else if (eq(car(exp), "eq") === "t") {
            return eq(interp(cadr(exp), env), interp(caddr(exp), env));
        } else if (eq(car(exp), "car") === "t") {
            return car(interp(cadr(exp), env));
        } else if (eq(car(exp), "cdr") === "t") {
            return cdr(interp(cadr(exp), env));
        } else if (eq(car(exp), "cons") === "t") {
            return cons(interp(cadr(exp), env), interp(caddr(exp), env));
        } else if (eq(car(exp), "cond") === "t") {
            return evcon(cdr(exp), env);
        } else if (eq(car(exp), "begin") === "t") {
            return evbegin(cdr(exp), env);
        } else if (eq(car(exp), "lambda") === "t") {
            return exp;
        } else {
            return interp(cons(assoc(car(exp), env), cdr(exp)), env);
        }
    } else if (eq(caar(exp), "lambda") === "t") {
        // ((lambda (p1 ... pn) e) a1 ... an)
        return interp(caddar(exp), append(pair(cadar(exp), evlis(cdr(exp), env)), env));
    } else {
        throw "error";
    }
};

let lilij = (exp) => {
    let exp1 = parse(exp);
    return interp(exp1, {})
};

console.log(lilij("(eq (quote abc) (quote abc))"));
console.log(lilij("(atom (quote abc))"));
console.log(lilij("(atom (quote (cons a (b))))"));
console.log(lilij("(cons (quote a) (cons (quote b) (quote ())))"));
console.log(lilij("(car (cons (quote a) (cons (quote b) (quote ()))))"));
console.log(lilij("((lambda (x y) (eq x y)) (quote a) (quote b))"));
console.log(lilij("((lambda (x y) (eq x y)) (quote a) (quote a))"));
console.log(lilij("((lambda (x y) (eq x y)) (quote ()) (quote ()))"));

