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
        // .replace(/'\(/gi, "(quote ")
        .replace(/'(\w+)/gi, ($0, $1)=>"(quote "+$1+")")
        .replace(/;.*/g, "")
        .replace(/\s+/gi, ",")
        .replace(/\[/gi, ",(,")
        .replace(/]/gi, ",),")
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
            return [];
            // for (let i = 0; i < x.length; i++) {
            //     if (eq(x[i], y[i]) !== "t") {
            //         return [];
            //     }
            // }
            // return "t";
        }
    } else {
        return [];
    }
};

let car = (exp) => {
    return exp[0];
};

let cdr = (exp) => {
    return exp.slice(1);
};

let cadr = (exp) => {
    return car(cdr(exp));
};

let cddr = (exp) => {
    return cdr(cdr(exp));
};

let caddr = (exp) => {
    return car(cdr(cdr(exp)));
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
    return res;
};

let closure = (exp, env) => {
    return ["closure", exp, env];
};

let callnext = (a, params) => {
    // a为closure或普通table
    if (params.length > 0) {
        if (eq(car(a), "closure") === "t") {
            return interp(cons(cadr(a), params), caddr(a));
        } else {
            return a;
        }
    } else {
        return a;
    }
};

let evlis = (params, env) => {
    let res = [];
    for (let i = 0; i < params.length; i++) {
        res.push(interp(params[i], env));
    }
    return res;
};

let pairs = (keys, values) => {
    let res = {};
    for (let i in keys) {
        res[keys[i]] = values[i];
    }
    return res;
};

let getparamsleft = (keys, values) => {
    return values.slice(keys.length);
};

let quotes = (values) => {
    let res = [];
    for (let i in values) {
        res.push(cons("quote", cons(values[i], [])));
    }
    return res;
};

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
        // 支持0或多参数版本
        // 需要根据v1的参数列表来处理计算长度
        // 没有处理好参数列表比实际参数多的情况
        let params = evlis(cdr(exp), env);
        let lambda = [];
        let env_ext = caddr(v1);
        if (eq(car(v1), "closure") === "t") {
            if (eq(car(cadr(v1)), "lambda") === "t") {
                lambda = cadr(v1);
            } else {
                lambda = caddr(cadr(v1));
                env_ext = append(env_ext, pair(cadr(cadr(v1)), v1));
            }
        } else {
            throw "error";
        }
        return callnext(interp(caddr(lambda), append(env_ext, pairs(cadr(lambda), params))), quotes(getparamsleft(cadr(lambda), params)));
    }
};

let lilij = (exp) => {
    let exp1 = parse(exp);
    let res = interp(exp1, {});
    if (!!res) {
        return JSON.stringify(res).replace(/\"/gi, "").replace(/\[/gi, "(").replace(/\]/gi, ")").replace(/,/gi, " ");
    } else {
        return "[error]"
    }
};

module.exports = {
    lilij
};
