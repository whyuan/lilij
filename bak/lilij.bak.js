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
    let tokens = exp.replace(/'\(\)/gi, "(quote ())")
        .replace(/'\(/gi, "(quote ")
        .replace(/'(\w+)/gi, ($0, $1)=>"(quote "+$1+")")
        .replace(/\s+/gi, ",")
        .replace(/\(/gi, ",(,")
        .replace(/\)/gi, ",),")
        .replace(/,+/gi, ",")
        .split(",");
    let res = [];
    for (let i in tokens) {
        if (tokens[i]) {
            res.push(tokens[i]);
        }
    }
    return res;
};

let isAtomToken = (token) => {
    return token && token !== "(" && token !== ")";
};

let parse = (exp) => {
    let tokens = parseToTokens(exp);
    if (tokens.length > 0) {
        let step = 0;
        let f = () => {
            if (tokens[step] === "(") {
                let children = [];
                step += 1;
                while (tokens[step] !== ")") {
                    children.push(f());
                }
                step += 1;
                return children;
            } else if (isAtomToken(tokens[step])) {
                let s = tokens[step];
                step += 1;
                return s;
            }
        };
        return f();
    } else {
        return [];
    }
};

let atom = (exp) => {
    return (typeof exp === "string") ? "t" : [];
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

let car = (exp) => {
    if (exp === undefined) {
        console.log("bbbb");
    }
    return exp[0];
};

let cdr = (exp) => {
    if (exp === undefined) {
        console.error("bbbbbbbbbbbbbbbbb");
    }
    return exp.slice(1);
};

let caar = (exp) => {
    return car(car(exp));
};

let cadr = (exp) => {
    return car(cdr(exp));
};

let caddr = (exp) => {
    return car(cdr(cdr(exp)));
};

let caddar = (exp) => {
    return car(cdr(cdr(car(exp))));
};

let cadddr = (exp) => {
    return car(cdr(cdr(cdr(exp))));
};

let cadar = (exp) => {
    return car(cdr(car(exp)));
};

let assoc = (exp, env) => {
    return env[exp];
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

// let pair = (l0, l1) => {
//     let res = {};
//     for (let i = 0; i < l0.length; i++) {
//         if (l1[i] !== undefined) {
//             res[l0[i]] = l1[i];
//         } else {
//             res[l0[i]] = l0[i];
//         }
//     }
//     return res;
// };

let pair = (e0, e1) => {
    let res = {};
    res[e0] = e1;
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
    // for (let key in res) {
    //     if (res.hasOwnProperty(key)) {
    //         if (eq(car(res[key]), "closure") === "t" && caddr(res[key]) === env0) {
    //             res[key] = closure(cadr(res[key]), res);
    //         }
    //     }
    // }
    return res;
};

let closure = (exp, env) => {
    return ["closure", exp, env];
};

// let interp = (exp, env) => {
//     if (atom(exp) === "t") {
//         return assoc(exp, env);
//     } else if (atom(car(exp)) === "t") {
//         if (eq(car(exp), "quote") === "t") {
//             return cadr(exp);
//         } else if (eq(car(exp), "atom") === "t") {
//             return atom(interp(cadr(exp), env));
//         } else if (eq(car(exp), "eq") === "t") {
//             return eq(interp(cadr(exp), env), interp(caddr(exp), env));
//         } else if (eq(car(exp), "car") === "t") {
//             return car(interp(cadr(exp), env));
//         } else if (eq(car(exp), "cdr") === "t") {
//             return cdr(interp(cadr(exp), env));
//         } else if (eq(car(exp), "cons") === "t") {
//             return cons(interp(cadr(exp), env), interp(caddr(exp), env));
//         } else if (eq(car(exp), "cond") === "t") {
//             return evcon(cdr(exp), env);
//         } else {
//             return interp(cons(assoc(car(exp), env), cdr(exp)), env);
//         }
//     } else if (eq(caar(exp), "label") === "t") {
//         return interp(cons(caddar(exp), cdr(exp)), append(env, pair(cons(cadar(exp), []), cons(car(exp), []))));
//     } else if (eq(caar(exp), "lambda") === "t") {
//         return interp(caddar(exp), append(env, pair(cadar(exp), evlis(cdr(exp), env))));
//     } else {
//         console.error("aaaa");
//     }
// };


let interp = (exp, env) => {
    if (atom(exp) === "t") {
        return assoc(exp, env);
    } else if (eq(car(exp), "quote") === "t") {
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
    } else if (eq(car(exp), "lambda") === "t") {
        // (lambda (p1 ... pn) e)
        return closure(exp, env);
    } else if (eq(car(exp), "label") === "t") {
        // (label f (lambda (p1 ... pn) e))
        return closure(caddr(exp), append(env, pair(cadr(exp), closure(exp, env))));
    } else {
        let v1 = interp(car(exp), env);
        let v2 = interp(cadr(exp), env);
        if (eq(car(v1), "closure") === "t") {
            if (eq(car(cadr(v1)), "lambda") === "t") {
                return interp(caddr(cadr(v1)), append(caddr(v1), pair(car(cadr(cadr(v1))), v2)));
            } else {
                return interp(caddr(caddr(cadr(v1))), append(append(caddr(v1),
                    pair(cadr(cadr(v1)), v1)),
                    pair(car(cadr(caddr(cadr(v1)))), v2)));
            }
        } else {
            console.error("error");
        }
    }
};

let lilij = (exp) => {
    let exp1 = parse(exp);
    return interp(exp1, {})
};

// let println = (exp) => {
//     let res = "";
//     let f = (exp) => {
//         if (typeof exp === "string") {
//             res += exp;
//         } else {
//             for (let i in exp) {
//                 res "(" + f(exp[i]) + ")";
//             }
//
//         }
//     };
//     f(exp)
// };

console.log(lilij("(eq 'abc 'abc)"));
console.log(lilij("(atom 'abc)"));
console.log(lilij("(atom '((cons a (b))))"));
console.log(lilij("(cons 'a (cons 'b '()))"));
console.log(lilij("(car (cons 'a (cons 'b '())))"));
console.log(lilij("((lambda (x y) (eq x y)) 'a 'b)"));
console.log(lilij("((lambda (x y) (eq x y)) 'a 'a)"));
console.log(lilij("((lambda (x y) (eq x y)) '() '())"));
console.log(lilij("((lambda (x y) (eq x y)) '() '())"));
console.log(lilij(`
(((label sum (lambda (m) (lambda (n) (
  cond
  ((eq m '()) n)
  ('t ((sum (cdr m)) (cons (car m) n)))
)))) (cons '1 (cons '1 (cons '1 '())))) (cons '1 (cons '1 '())))
`));







