(defun evcon. (c a)
  (cond ((eval. (caar c) a)
   (eval. (cadar c) a))
  ((quote t) (evcon. (cdr c) a))))

(defun evlis. (m a)
  (cond ((null. m) (quote ()))
   ((quote t) (cons (eval.  (car m) a)
    (evlis. (cdr m) a)))))

(defun eval. (e a)
  (cond
   ((atom e) (assoc. e a))
   ((atom (car e))
    (cond
     ((eq (car e) (quote quote)) (cadr e))
     ((eq (car e) (quote atom))  (atom   (eval. (cadr e) a)))
     ((eq (car e) (quote eq))    (eq     (eval. (cadr e) a)
       (eval. (caddr e) a)))
     ((eq (car e) (quote car))   (car    (eval. (cadr e) a)))
     ((eq (car e) (quote cdr))   (cdr    (eval. (cadr e) a)))
     ((eq (car e) (quote cons))  (cons   (eval. (cadr e) a)
       (eval. (caddr e) a)))
     ((eq (car e) (quote cond))  (evcon. (cdr e) a))
     ((quote t) (eval. (cons (assoc. (car e) a)
       (cdr e))
     a))))
   ((eq (caar e) (quote label))
    (eval. (cons (caddar e) (cdr e))
     (cons (list (cadar e) (car e)) a)))
   ((eq (caar e) (quote lambda))
    (eval. (caddar e)
     (append. (pair. (cadar e) (evlis. (cdr  e) a))
      a)))))

(label eval. (lambda (exp env) [
((lambda (caar cadr cadar caddr closure pair) [
((lambda (evcon assoc) [
  cond
    ((atom exp) (assoc exp env))
    ((eq (car exp) 'quote) (cadr exp))
    ((eq (car exp) 'atom) (atom (eval. (cadr exp) env)))
    ((eq (car exp) 'eq) (eq (eval. (cadr exp) env) (eval. (caddr exp) env)))
    ((eq (car exp) 'car) (car (eval. (cadr exp) env)))
    ((eq (car exp) 'cdr) (cdr (eval. (cadr exp) env)))
    ((eq (car exp) 'cons) (cons (eval. (cadr exp) env) (eval. (caddr exp) env)))
    ((eq (car exp) 'cond) (evcon (cadr exp) env))
    ((eq (car exp) 'lambda) (closure caddr(exp) env))
    ((eq (car exp) 'label) (closure caddr(exp) (cons (pair (cadr exp) (closure exp env)) env)))
    ('t (((lambda (v1 v2) [
      cond
        ((eq ((car v1)) 'closure) 
          (eval. (caddr (cadr v1)) 
            (cons (pair (car (cadr (cadr exp))) v2) (caddr v1))))
        ('t 
          (eval. (caddr (caddr (cadr v1))) 
            (cons (pair (car (cadr (caddr (cadr v1)))) v2) 
              (cons (pair (cadr (cadr v1)) v1) (caddr v1)))))
    ]) (eval. (car exp) env)) (eval. (cadr exp) env)))
]) 
(label evcon (lambda (list env) [
  cond 
  (((eval. (caar list)) env) ((eval. (cadar list)) env))
  ('t ((evcon list) env))
]))
(label assoc (lambda (key env) [
  cond
  ((eq key (caar env)) cadr(env))
  ('t (assoc key cdr(env)))
]))
) 
]) 
(lambda (x) [car (car x)]) 
(lambda (x) [car (cdr x)]) 
(lambda (x) [car (cdr (car x))]) 
(lambda (x) [car (cdr (cdr x))])
(lambda (exp env) [cons 'closure (cons exp (cons env '()))])
(lambda (k v) [cons k (cons v '())])
)
]))

; } else if (eq(car(exp), "label") === "t") {
; // (label f (lambda (p1 ... pn) e))
; return closure(caddr(exp), append(env, pair(cadr(exp), closure(exp, env))));
; } else {
; let v1 = interp(car(exp), env);
; let v2 = interp(cadr(exp), env);
; if (eq(car(v1), "closure") === "t") {
; if (eq(car(cadr(v1)), "lambda") === "t") {
; return interp(caddr(cadr(v1)), append(caddr(v1), pair(car(cadr(cadr(v1))), v2)));
; } else {
; return interp(caddr(caddr(cadr(v1))), append(append(caddr(v1),
;                                                     pair(cadr(cadr(v1)), v1)),
;                                              pair(car(cadr(caddr(cadr(v1)))), v2)));
; }
; } else {
; console.error("error");
; }
; }



; Yf=f(Yf)
; Yfg=f(g(Yfg))
; Yfgh=f(g(h(Yfgh)))
; F = fG = f(gF) = Yfg = lambda f. lambda g. f(g(Yfg))
; 实现 单参数 双参数 单函数 双函数 三函数 版本的组合子

(begin
  ((lambda (Y A B C) 
    ((lambda (cadr caar cadar caddr caddar pair null)
      ((lambda (eval evcon evlis assoc append)
        ((lambda (eval evcon evlis) 
          (
; 子程序
            ))
        (C eval evcon evlis)
        (B evcon eval)
        (B evlis eval))) 
      (lambda (eval) (lambda (evcon) (lambda (evlis) (lambda (e a)
        (cond
          ((atom e) (assoc e a))
          ((atom (car e))
            (cond
              ((eq (car e) (quote quote)) (cadr e))
              ((eq (car e) (quote atom)) (atom (eval (cadr e) a)))
              ((eq (car e) (quote eq)) (eq (eval (cadr e) a) (eval (caddr e) a)))
              ((eq (car e) (quote car)) (car (eval (cadr e) a)))
              ((eq (car e) (quote cdr)) (cdr (eval (cadr e) a)))
              ((eq (car e) (quote cons)) (cons (eval (cadr e) a) (eval (caddr e) a)))
              ((eq (car e) (quote cond)) (evcon (cdr e) a))
              ((eq (car e) (quote label)) (eval))
              ()
              ))
          ()
          ())))))
      (lambda (evcon) (lambda (eval) (lambda (c a) 
        (cond ((eval (caar c) a)
          (eval (cadar c) a))
        ((quote t) (evcon (cdr c) a))))))
      (lambda (evlis) (lambda (eval) (lambda (m a) 
        (cond ((null m) (quote ()))
          ((quote t) (cons (eval (car m) a)
            (evlis (cdr m) a)))))))
      (A (lambda (assoc) (lambda (e a) 
        (cond ((eq e (caar a)) (cadar a))
          ((quote t) (assoc e (cdr a)))))))
      (A (lambda (append) (lambda (a b) 
        (cond ((null a) b)
          ((quote t) (append ((cdr a) (cons (car a) b)))))))))) 
    (Y (lambda (cadr) (lambda (a) 
      (car (cdr a)))))
    (Y (lambda (caar) (lambda (a) 
      (car (car a)))))
    (Y (lambda (cadar) (lambda (a) 
      (car (cdr (car a))))))
    (Y (lambda (caddr) (lambda (a) 
      (car (cdr (cdr a))))))
    (Y (lambda (caddar) (lambda (a) 
      (car (cdr (cdr (car a)))))))
    (A (lambda (pair) (lambda (a b) 
      (cons (cons (car a) (cons (car b) (quote ()))) (pair ((cdr a) (cdr b)))))))
    (Y (lambda (null) (lambda (a) 
      ((eq a (quote ())))))))) 
  (lambda (f) 
    ((lambda (x) (f (lambda (y) (x (x) (y)))))
      (lambda (x) (f (lambda (y) (x (x) (y)))))))
  (lambda (f) 
    ((lambda (x) (f (lambda (y z) (x (x) (y z)))))
      (lambda (x) (f (lambda (y z) (x (x) (y z)))))))
  (lambda (f) 
    (lambda (g)
      ((lambda (x) (f (g (lambda (y z) (x (x) (y z)))))) 
        (lambda (x) (f (g (lambda (y z) (x (x) (y z))))))))) 
  (lambda (f) 
    (lambda (g)
      (lambda (h) 
        ((lambda (x) (f (g (h (lambda (y z) (x (x) (y z))))))) 
          (lambda (x) (f (g (h (lambda (y z) (x (x) (y z)))))))))))))

