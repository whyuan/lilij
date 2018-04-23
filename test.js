let assert = (expr, res) => {
	if (r2(expr) == res) {
		console.log(expr + " == " + res + " pass.\n");
	} else {
		console.log(expr + " == " + res + " fail, expect " + res + " but " + r2(expr) + ".");
	}
}

assert("(+ 1 2)", 3);
assert("(* 2 3)", 6);
assert("(* 2 (+ 3 4))", 14);
assert("(* (+ 1 2) (+ 3 4))", 21);
assert("((lambda (x) (* 2 x)) 3)", 6);
assert(`
	(let ([x 2])
		(let ([f (lambda (y) (* x y))])
			(let ([x 4])
				(f 3))))`, 6);
assert("((lambda (x) (+ (let ([x 3]) x) x)) 2)", 5);
