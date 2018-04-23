// 变量：x
// 函数：(lambda (x) e)
// 绑定：(let ([x e1]) e2)
// 调用：(e1 e2)
// 算术：(• e2 e2)

let getRegToken = (reg, step) => {
    if (!reg) {
        return null;
    } else if (reg[step] == "(" || reg[step] == "[") {
        return reg[step];
    } else if (reg[step] == ",") {
        return "," + extractWord(reg, step + 1);
    } else {
        let token;
        reg.substr(step).replace(/([^\(\[,]+).*/, (a, b) => {
            token = b;
        });
        if (!!token) {
            return token;
        }
    }
    return null;
}

let extractNormalWord = (exp, step) => {
    let word;
    if (!exp) return null;
    exp.substr(step).replace(/(([a-zA-Z]|\d|_|\+|\-|\*|\/)+).*/, (a, b) => {
        word = b;
    });
    return word ? word : null;
}

let extractWord = (exp, step) => {
    let word;
    if (!exp) return null;
    exp.substr(step).replace(/([a-zA-Z]([a-zA-Z]|\d|_)*).*/, (a, b) => {
        word = b;
    });
    return word ? word : null;
}

let extractBracket = (exp, step) => {
    if (!!exp && (exp[step] == "(" || exp[step] == "[")) {
        let stack = 1;
        let leftBracket = exp[step];
        let rightBracket = ")";
        if (exp[step] == "[") {
            rightBracket = "]";
        }
        for (let i = step + 1; i < exp.length; i++) {
            if (exp[i] == rightBracket) {
                stack--;
            } else if (exp[i] == leftBracket) {
                stack++;
            }
            if (stack == 0) {
                return exp.substr(step + 1, i - step - 1);
            }
        }
    }
    return null;
}

let isBracketValid = (exp) => {
    let stack = [];
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] == "(" || exp[i] == "[") {
            stack.push(exp[i]);
        } else if (exp[i] == ")" || exp[i] == "]") {
            if (exp[i] == ")" && stack[stack.length-1] == "(") {
                stack.pop();
            } else if (exp[i] == "]" && stack[stack.length-1] == "[") {
                stack.pop();
            } else {
                return false;
            }
        }
    }
    if (stack.length == 0) {
        return true;
    }
}

let doMatch = (exp, reg) => {
    if (exp === null || reg === null) return null;
    let stepExp = 0;
    let stepReg = 0;
    let res = {};
    while (stepExp < exp.length && stepReg < reg.length) {
        let token = getRegToken(reg, stepReg);
        if (token == null) return null;
        if (token == "(" || token == "[") {
            if (exp.substr(stepExp, 1) == token) {
                let exp1 = extractBracket(exp, stepExp);
                let reg1 = extractBracket(reg, stepReg);
                let res1 = doMatch(exp1, reg1);
                if (res1 == null) return null;
                for (let key in res1) {
                    res[key] = res1[key];
                }
                stepExp += exp1.length + 2;
                stepReg += reg1.length + 2;
            } else {
                return null;
            }
        } else if (token[0] == ",") {
            let word;
            if (exp.substr(stepExp, 1) == "(" || exp.substr(stepExp, 1) == "[") {
                let content = extractBracket(exp, stepExp);
                if (content === null) {
                    return null;
                }
                word = "(" + content + ")";
            } else {
                word = extractNormalWord(exp, stepExp);
                if (!word) return null;
            }
            res[token.substr(1)] = word;
            stepExp += word.length;
            stepReg += token.length;
        } else if (exp.substr(stepExp).indexOf(token) === 0) {
            stepExp += token.length;
            stepReg += token.length;
        } else {
            return null;
        }
    }
    if (stepExp < exp.length || stepReg < reg.length) return null;
    return res;
}

let match = (exp, reg) => {
    if (isBracketValid(reg)) {
        return doMatch(exp, reg);
    }
    return null;
}

let matchSymbol = (exp) => {
    let res = {};
    let word = extractWord(exp, 0);
    if (!!word && word == exp) {
        res.value = word;
    } else {
        res = null;
    }
    return res;
}

let matchNumber = (exp) => {
    let res = {};
    let num = parseFloat(exp);
    if (!!num) {
        res.value = num;
    } else {
        res = null;
    }
    return res;
}

let extEnv = (env, key, value) => {
    let res = {};
    for (let key0 in env) {
        res[key0] = env[key0];
    }
    res[key] = value
    return res;
}

let lookup = (env, key) => {
    return env[key];
}

let Closure = function(exp, env) {
    this.exp = exp;
    this.env = env;
}

let interp = (exp, env) => {
    let r;
    if (r = matchSymbol(exp)) {
        let v = lookup(env, exp);
        if (v !== undefined) {
            return v;
        } else {
            throw ("symbol undefined: " + exp);
        }
    } else if (r = matchNumber(exp)) {
        return r.value;
    } else if (r = match(exp, "(lambda (,x) ,e)")) {
        return new Closure(exp, env);
    } else if (r = match(exp, "(let ([,x ,e1]) ,e2)")) {
        let env1 = extEnv(env, r.x, interp(r.e1, env));
        return interp(r.e2, env1);
    } else if (r = match(exp, "(,e1 ,e2)")) {
        let v1 = interp(r.e1, env);
        let v2 = interp(r.e2, env);
        if (v1 instanceof Closure) {
            let r1 = match(v1.exp, "(lambda (,x) ,e)");
            let env1 = extEnv(v1.env, r1.x, v2);
            return interp(r1.e, env1);
        } else {
            throw ("exp error");
        }
    } else if (r = match(exp, "(,op ,e1 ,e2)")) {
        let v1 = interp(r.e1, env);
        let v2 = interp(r.e2, env);
        if (r.op == "+") {
            return v1 + v2;
        } else if (r.op == "-") {
            return v1 - v2;
        } else if (r.op == "*") {
            return v1 * v2;
        } else if (r.op == "/") {
            return v1 / v2;
        }
    }
}

let r2 = (exp) => {
    exp = exp.replace(/\s+/gi, " ").trim();
    return interp(exp, {})
}
